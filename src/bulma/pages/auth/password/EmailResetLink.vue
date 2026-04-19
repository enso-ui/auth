<template>
    <auth-form action="Send a reset password link"
        endpoint="password.email"
        icon="user"
        :payload="payload"
        @success="status = $event.status"
        @submitting="status = null">
        <email class="mb-3"
            v-model="payload.email"/>
        <template #footer>
            <p class="has-text-success has-text-weight-bold has-text-centered is-size-7 mt-1"
                v-if="status">
                {{ status }}
            </p>
        </template>
    </auth-form>
</template>

<script>
import AuthForm from '../components/AuthForm.vue';
import Email from '../components/fields/Email.vue';

export default {
    name: 'EmailResetLink',

    components: { AuthForm, Email },

    data: () => ({
        payload: {
            email: '',
        },
        status: null,
    }),
};
</script>
