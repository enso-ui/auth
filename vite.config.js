import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@enso-ui/auth': fileURLToPath(new URL('./', import.meta.url)),
            '/images/logo.svg': fileURLToPath(new URL('./tests/stubs/logo.svg', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
    },
});
