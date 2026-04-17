<template>
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input :value="modelValue"
                v-focus
                class="input"
                type="email"
                :class="{ 'is-danger': errors.has('email'), 'is-success': state.successful }"
                :placeholder="i18n('Email')"
                autocomplete="email"
                @input="$emit('update:modelValue', $event.target.value); errors.clear('email')">
            <span class="icon is-small is-left">
                <fa :icon="faEnvelope"/>
            </span>
            <span v-if="state.successful"
                class="icon is-small is-right has-text-success">
                <fa :icon="faCheck"/>
            </span>
            <span v-if="errors.has('email')"
                class="icon is-small is-right has-text-danger">
                <fa :icon="faExclamationTriangle"/>
            </span>
        </div>
        <p class="has-text-danger is-size-7"
            v-if="errors.has('email')">
            {{ errors.get('email') }}
        </p>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faCheck, faExclamationTriangle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';

export default {
    name: 'Email',

    directives: { focus },

    components: { Fa },

    inject: ['errors', 'i18n', 'state'],

    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },

    emits: ['change', 'update:modelValue'],

    data: () => ({
        faCheck,
        faEnvelope,
        faExclamationTriangle,
    }),
};
</script>
