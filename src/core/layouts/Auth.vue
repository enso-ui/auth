<script>
import { loadGuestState } from '@enso-ui/ui/src/pinia/loadState';

export default {
    name: 'Auth',

    data: () => ({
        ready: false,
    }),

    async created() {
        await this.loadGuestState();
        this.ready = true;
    },

    methods: {
        loadGuestState() {
            return loadGuestState();
        },
    },

    render() {
        return this.$slots.default({
            guestState: this.ready,
        });
    },
};
</script>
