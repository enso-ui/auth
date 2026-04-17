<template>
    <auth-form action="Login"
        icon="user"
        endpoint="login"
        :payload="payload"
        @success="init">
        <email v-model="payload.email"/>
        <password v-model="payload.password"/>
        <remember v-model="payload.remember"/>
        <template #footer>
            <div class="auth-footer is-flex is-justify-content-flex-end mt-3">
                <router-link class="auth-footer-link is-flex is-align-items-center"
                    :to="{ name: 'password.email' }">
                    {{ i18n('Forgot password') }}
                </router-link>
            </div>
        </template>
    </auth-form>
</template>

<script>
import { app } from '@enso-ui/ui/src/pinia/app';
import { layout } from '@enso-ui/ui/src/pinia/layout';
import { auth } from '../../../pinia/auth';
import AuthForm from './components/AuthForm.vue';
import Email from './components/fields/Email.vue';
import Password from './components/fields/Password.vue';
import Remember from './components/fields/Remember.vue';

export default {
    name: 'Login',

    components: {
        AuthForm, Email, Password, Remember,
    },

    inject: ['i18n'],

    data: () => ({
        payload: {
            device_name: navigator.userAgent || 'browser',
            email: '',
            password: '',
            remember: false,
        },
    }),

    methods: {
        init() {
            app().setShowQuote(app().meta.showQuote);

            setTimeout(() => {
                auth().login();
                layout().setHome(true);
            }, 500);
        },
    },
};
</script>
