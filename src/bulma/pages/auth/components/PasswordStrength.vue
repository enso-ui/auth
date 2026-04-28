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
                :stroke="i <= score ? 'green' : 'orangered'"/>
        </svg>
    </transition>
</template>

<script>
import passwordScore from '../../../../utils/passwordScore';

export default {
    name: 'PasswordStrength',

    props: {
        password: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        score: 0,
    }),

    watch: {
        password: {
            immediate: true,
            handler(password) {
                this.score = passwordScore(password);
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
