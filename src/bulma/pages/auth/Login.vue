<template>
    <auth-form action="Login"
        icon="user"
        endpoint="login"
        :payload="payload"
        @success="init">
        <email v-model="payload.email"/>
        <password v-model="payload.password"/>
        <remember v-model="payload.remember"
            v-if="!isWebview"/>
        <template v-slot:footer>
            <router-link class="is-pulled-right"
                :to="{ name: 'password.email' }">
                {{ i18n('Forgot password') }}
            </router-link>
            <div class="is-clearfix"/>
        </template>
    </auth-form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Errors from '@enso-ui/laravel-validation';
import AuthForm from './components/AuthForm.vue';
import Email from './components/fields/Email.vue';
import Password from './components/fields/Password.vue';
import Remember from './components/fields/Remember.vue';

export default {
    name: 'Login',

    inject: ['i18n', 'route'],

    components: { AuthForm, Email, Password, Remember },

    data: () => ({
        errors: new Errors(),
        payload: {
            email: '',
            password: '',
            remember: false,
        }
    }),

    computed: {
        ...mapState(['meta']),
        ...mapGetters(['isWebview']),
    },

    methods: {
        ...mapMutations('auth', ['login']),
        ...mapMutations('layout', ['home']),
        ...mapMutations(['setShowQuote', 'setCsrfToken']),
        init(data) {
            this.setShowQuote(this.meta.showQuote);

            if (data.csrfToken) {
                this.setCsrfToken(data.csrfToken);
            }

            setTimeout(() => {
                this.login();
                this.home(true);
            }, 500);
        },
    },
};
</script>
