<template>
    <section class="hero is-fullheight auth-shell">
        <div class="hero-body auth-shell-body">
            <div class="container auth-shell-container">
                <core-auth v-slot="{ guestState }">
                    <router-view v-if="guestState"
                        :key="$route.path"/>
                </core-auth>
            </div>
        </div>
    </section>
</template>

<script>
import CoreAuth from '../../core/layouts/Auth.vue';

export default {
    name: 'Auth',

    components: { CoreAuth },
};
</script>

<style lang="scss">
@import '../styles/layouts/auth';
</style>
