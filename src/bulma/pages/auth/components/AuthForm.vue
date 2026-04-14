<template>
    <div class="login"
        :class="$attrs.class">
        <div class="box p-3">
            <div class="logo mb-3 is-flex is-justify-content-center">
                <figure class="image is-48x48  is-clickable is-flex"
                    @click="$router.push({ name: 'login' }).catch(routerErrorHandler)">
                    <img src="/images/logo.svg"
                        :alt="meta.appName">
                </figure>
            </div>
            <form class="mb-2">
                <slot/>
                <submit v-bind="$attrs"/>
                <slot name="footer"/>
            </form>
        </div>
    </div>
</template>

<script>
import Errors from '@enso-ui/laravel-validation';
import { app } from '@enso-ui/ui/src/pinia/app';
import Submit from './Submit.vue';

export default {
    name: 'AuthForm',

    components: { Submit },

    inject: ['routerErrorHandler'],

    provide() {
        return {
            state: this.state,
            errors: this.errors,
        };
    },

    inheritAttrs: false,

    data: () => ({
        errors: new Errors(),
        state: {
            successful: false,
        },
    }),

    computed: {
        meta() {
            return app().meta;
        },
    },
};
</script>

<style lang="scss">
@import '../../../styles/components/auth-form';
</style>
