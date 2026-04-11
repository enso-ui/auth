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
    .login {
        max-width: 400px;
        margin: auto;

        .box {
            border-radius: 1.25rem;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 0 24px 70px rgba(7, 22, 39, 0.22);
            backdrop-filter: blur(14px);
        }

        form {
            margin-bottom: 0;
        }

        .control .input,
        .control.has-icons-left .input,
        .control.has-icons-right .input {
            background-color: #f7fbff;
            border-color: #c6d3e1;
            color: #0f172a;

            &::placeholder {
                color: #64748b;
            }
        }

        .control .icon {
            color: #64748b;
        }

        .control .icon.is-left {
            color: #475569 !important;
        }

        .checkbox,
        .help,
        .label {
            color: #1e293b;
        }

        .auth-footer-link {
            color: #334155;
            font-weight: 600;
            text-decoration: none;
            text-shadow: none;

            &:hover {
                color: #0f172a;
            }
        }

        .is-spaced {
            margin-right: 1.6em;
        }
    }

    [data-theme='dark'] {
        .login {
            .box {
                border-color: rgba(107, 114, 128, 0.3);
                background: rgba(18, 24, 35, 0.9);
                box-shadow: 0 28px 80px rgba(1, 6, 16, 0.38);
            }

            .control .input,
            .control.has-icons-left .input,
            .control.has-icons-right .input {
                background-color: rgba(10, 14, 22, 0.9);
                border-color: #4b5563;
                color: #f3f6fb;

                &::placeholder {
                    color: #94a3b8;
                }
            }

            .control .icon {
                color: #94a3b8;
            }

            .control .icon.is-left {
                color: #cbd5e1 !important;
            }

            .checkbox,
            .help,
            .label {
                color: #e5ebf3;
            }

            .auth-footer-link {
                color: #d7deea;

                &:hover {
                    color: #f3f6fb;
                }
            }
        }
    }

    @media (prefers-color-scheme: dark) {
        html:not([data-theme]) {
            .login {
                .box {
                    border-color: rgba(107, 114, 128, 0.3);
                    background: rgba(18, 24, 35, 0.9);
                    box-shadow: 0 28px 80px rgba(1, 6, 16, 0.38);
                }

                .control .input,
                .control.has-icons-left .input,
                .control.has-icons-right .input {
                    background-color: rgba(10, 14, 22, 0.9);
                    border-color: #4b5563;
                    color: #f3f6fb;

                    &::placeholder {
                        color: #94a3b8;
                    }
                }

                .control .icon {
                    color: #94a3b8;
                }

                .control .icon.is-left {
                    color: #cbd5e1 !important;
                }

                .checkbox,
                .help,
                .label {
                    color: #e5ebf3;
                }

                .auth-footer-link {
                    color: #d7deea;

                    &:hover {
                        color: #f3f6fb;
                    }
                }
            }
        }
    }
</style>
