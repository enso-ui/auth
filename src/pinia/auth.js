import axios from 'axios';
import { defineStore } from 'pinia';

const getRouter = () => import('@enso-ui/ui/src/core/services/router');

export const auth = defineStore('auth', {
    state: () => ({
        isAuth: localStorage.getItem('isAuth') === 'true',
        intendedRoute: null,
        intendedPath: null,
    }),

    actions: {
        login() {
            this.isAuth = true;
            localStorage.setItem('isAuth', true);
        },
        setIntendedRoute(value) {
            this.intendedRoute = value;
        },
        setIntendedPath(value) {
            this.intendedPath = value;
        },
        logoutState() {
            this.isAuth = false;
            localStorage.setItem('isAuth', false);
            localStorage.removeItem('authorization');
        },
        async logout() {
            try {
                await axios.post('/api/logout');
            } catch (error) {
                if (error.response?.status !== 401) {
                    throw error;
                }
            }

            this.logoutState();
            const { default: router } = await getRouter();
            router.push({ name: 'login' });
        },
    },
});
