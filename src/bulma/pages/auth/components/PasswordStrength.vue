<template>
    <transition enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut">
        <svg v-if="password"
            width="100%"
            height="5"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <rect v-for="i in 5"
                :key="i"
                width="15%"
                height="4"
                stroke-width="4"
                :x="x(i)"
                :stroke="i <= scoreValue + 1 ? 'green' : 'orangered'"/>
        </svg>
    </transition>
</template>

<script>
let zxcvbnPromise;

const getZxcvbn = async () => {
    if (!zxcvbnPromise) {
        zxcvbnPromise = import('zxcvbn')
            .then(({ default: zxcvbn }) => zxcvbn);
    }

    return zxcvbnPromise;
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
            async handler(password) {
                if (!password) {
                    this.scoreValue = 0;
                    return;
                }

                const zxcvbn = await getZxcvbn();
                this.scoreValue = zxcvbn(password).score;
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
