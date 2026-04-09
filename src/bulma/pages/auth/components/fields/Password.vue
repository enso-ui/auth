<template>
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input :value="modelValue"
                class="input"
                :type="meta.content"
                :class="{ 'is-danger': errors.has('password'), 'is-success': successful }"
                :placeholder="i18n('Password')"
                :autocomplete="autocomplete"
                @input="$emit('update:modelValue', $event.target.value); errors.clear('password')">
            <span class="icon is-small is-left">
                <fa :icon="faLock"/>
            </span>
            <reveal-password :meta="meta"
                :class="[
                    'has-text-dark',
                    { 'is-spaced': successful || errors.has('password') }
                ]"
                v-if="modelValue && !successful"/>
            <span v-if="successful"
                class="icon is-small is-right has-text-success">
                <fa :icon="faCheck"/>
            </span>
            <span v-if="errors.has('password')"
                class="icon is-small is-right has-text-danger">
                <fa :icon="faExclamationTriangle"/>
            </span>
            <slot name="password-strength"
                :password="modelValue"
                :has-password="modelValue.length > 0"/>
        </div>
        <p class="has-text-danger is-size-7"
            v-if="errors.has('password')">
            {{ errors.get('password') }}
        </p>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faCheck, faExclamationTriangle, faLock } from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';
import RevealPassword from '@enso-ui/forms/src/bulma/parts/RevealPassword.vue';

export default {
    name: 'Password',

    directives: { focus },

    components: { Fa, RevealPassword },

    inject: ['errors', 'i18n', 'state'],

    props: {
        autocomplete: {
            type: String,
            default: 'current-password',
        },
        modelValue: {
            type: String,
            required: true,
        },
    },

    emits: ['update:modelValue'],

    data: () => ({
        faCheck,
        faExclamationTriangle,
        faLock,
        meta: {
            content: 'password',
        },
    }),

    computed: {
        successful() {
            return this.state.successful;
        },
    },
};
</script>
