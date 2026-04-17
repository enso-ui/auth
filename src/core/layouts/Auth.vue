<script>
import { loadGuestState } from '@enso-ui/ui/src/modules/loadState';

export default {
    name: 'Auth',

    data: () => ({
        ready: false,
    }),

    async created() {
        await loadGuestState();
        this.ready = true;
    },

    render() {
        return this.$slots.default({
            guestState: this.ready,
        });
    },
};
</script>
