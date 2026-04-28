import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';
import AuthLayout from '../src/core/layouts/Auth.vue';
import Login from '../src/bulma/pages/auth/Login.vue';
import { auth } from '../src/pinia/auth';
import { app } from '@enso-ui/ui/src/pinia/app';
import { layout } from '@enso-ui/ui/src/pinia/layout';
import passwordScore from '../src/utils/passwordScore';

vi.mock('axios', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ data: {} })),
    },
}));

vi.mock('@enso-ui/ui/src/core/services/router', () => ({
    default: {
        push: vi.fn(),
    },
}));

vi.mock('@enso-ui/ui/src/modules/loadState', () => ({
    loadGuestState: vi.fn(() => Promise.resolve()),
}));

describe('auth package', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
        app().$patch({ meta: { showQuote: true } });
        layout().$patch({ home: false });
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it('marks the user as authenticated on login', () => {
        const store = auth();

        store.login();

        expect(store.isAuth).toBe(true);
        expect(localStorage.getItem('isAuth')).toBe('true');
    });

    it('logs out and redirects to login even when the api already expired', async () => {
        const store = auth();
        axios.post.mockRejectedValue({ response: { status: 401 } });
        localStorage.setItem('authorization', 'token');

        await store.logout();

        const { default: router } = await import('@enso-ui/ui/src/core/services/router');

        expect(store.isAuth).toBe(false);
        expect(localStorage.getItem('isAuth')).toBe('false');
        expect(localStorage.getItem('authorization')).toBeNull();
        expect(router.push).toHaveBeenCalledWith({ name: 'login' });
    });

    it('loads guest state before exposing the auth layout slot', async () => {
        const { loadGuestState } = await import('@enso-ui/ui/src/modules/loadState');
        const slot = vi.fn(() => null);
        const vm = {
            ready: false,
            $slots: { default: slot },
        };

        await AuthLayout.created.call(vm);
        AuthLayout.render.call(vm);

        expect(loadGuestState).toHaveBeenCalled();
        expect(slot).toHaveBeenCalledWith({ guestState: true });
    });

    it('initializes login by syncing quote visibility and entering home', () => {
        vi.spyOn(globalThis, 'setTimeout').mockImplementation(callback => {
            callback();
            return 1;
        });

        const vm = {};

        Login.methods.init.call(vm);

        expect(app().showQuote).toBe(true);
        expect(auth().isAuth).toBe(true);
        expect(layout().home).toBe(true);
    });

    it('scores password strength from zero to five', () => {
        expect(passwordScore()).toBe(0);
        expect(passwordScore('password')).toBe(0);
        expect(passwordScore('LongEnough1!')).toBe(4);
        expect(passwordScore('VeryLongPassword1!')).toBe(5);
    });
});
