// @ts-check
import {defineConfig, passthroughImageService} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
// @ts-ignore
export default defineConfig({
    vite: {
        // @ts-ignore
        plugins: [tailwindcss()],
    },

    image: {
        service: passthroughImageService(),
    },

    integrations: [react()],
});
