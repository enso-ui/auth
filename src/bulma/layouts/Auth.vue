<template>
    <section class="auth-layout hero is-fullheight">
        <div class="hero-body">
            <div class="container">
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
@import '../styles/auth';
</style>
