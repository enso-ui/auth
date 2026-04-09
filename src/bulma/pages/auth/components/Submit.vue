<template>
    <button class="button is-dark is-fullwidth"
        :class="{ 'is-loading': loading }"
        type="submit"
        @click.prevent="submit">
        <span class="icon is-small">
            <fa :icon="resolvedIcon"/>
        </span>
        <span>{{ i18n(action) }}</span>
    </button>
</template>

<script>
import { app } from '@enso-ui/ui/src/pinia/app';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'Submit',

    components: { Fa },

    inject: ['errors', 'http', 'i18n', 'route', 'state', 'toastr'],

    props: {
        action: {
            type: String,
            required: true,
        },
        icon: {
            type: [String, Object],
            required: true,
        },
        endpoint: {
            type: String,
            required: true,
        },
        payload: {
            type: Object,
            required: true,
        },
    },

    emits: ['submitting', 'success'],

    data: () => ({
        loading: false,
    }),

    computed: {
        resolvedIcon() {
            if (typeof this.icon !== 'string') {
                return this.icon;
            }

            return {
                lock: faLock,
                user: faUser,
            }[this.icon] ?? this.icon;
        },
        isWebview() {
            return app().isWebview;
        },
        config() {
            return this.isWebview
                ? { headers: { isWebview: true } }
                : {};
        },
    },

    methods: {
        submit() {
            this.loading = true;
            this.state.successful = false;
            this.$emit('submitting');

            this.http.post(this.route(this.endpoint), this.payload, this.config)
                .then(({ data }) => {
                    this.state.successful = true;
                    this.$emit('success', data);
                }).catch(error => {
                    const { status, data } = error.response;

                    switch (status) {
                    case 422:
                        this.errors.set(data.errors);
                        break;
                    case 429:
                        this.toastr.error(data.message);
                        break;
                    default:
                        throw error;
                    }
                }).finally(() => (this.loading = false));
        },
    },
};
</script>
