<template>
    <transition enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut">
        <svg width="100%"
            height="5"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <rect v-for="i in 5"
                :key="i"
                width="15%"
                height="4"
                stroke-width="4"
                :x="x(i)"
                :stroke="i <= scoreValue ? 'green' : 'orangered'"/>
        </svg>
    </transition>
</template>

<script>
const commonPasswords = [
    'admin',
    'administrator',
    'password',
    'qwerty',
    'welcome',
    'letmein',
    'parola',
];

const sequential = /(0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde|cdef|defg|qwer|asdf|zxcv)/iu;
const repeated = /(.)\1{2,}/u;
const clamp = value => Math.min(Math.max(value, 0), 5);

const score = password => {
    const normalized = password.toLowerCase();
    const longEnough = password.length >= 8;
    const variety = [
        /[a-z]/u,
        /[A-Z]/u,
        /\d/u,
        /[^A-Za-z0-9]/u,
    ].filter(pattern => pattern.test(password)).length;

    const value = [
        longEnough,
        password.length >= 12,
        password.length >= 16,
        longEnough && variety >= 3,
        longEnough && variety >= 4,
    ].filter(Boolean).length;

    const penalty = [
        commonPasswords.includes(normalized),
        sequential.test(password),
        repeated.test(password),
    ].filter(Boolean).length;

    return clamp(value - penalty);
};

export default {
    name: 'PasswordStrength',

    props: {
        password: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        scoreValue: 0,
    }),

    watch: {
        password: {
            immediate: true,
            handler(password) {
                this.scoreValue = password ? score(password) : 0;
            },
        },
    },

    methods: {
        x(i) {
            const x = 2.5 + (i - 1) * 15 + (i - 1) * 5;
            return `${x}%`;
        },
    },
};
</script>
