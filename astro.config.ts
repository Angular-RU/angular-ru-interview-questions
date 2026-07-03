import {defineConfig, passthroughImageService} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import {unified} from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import {rehypeUnwrapDetailsTable} from './src/plugins/rehype-unwrap-details-table';
import rehypeRaw from 'rehype-raw';

// https://astro.build/config
export default defineConfig({
    site: 'https://angular-ru.github.io',
    base: '/demos',
    vite: {
        plugins: [tailwindcss()],
    },
    image: {
        service: passthroughImageService(),
    },
    integrations: [react()],
    markdown: {
        processor: unified({
            rehypePlugins: [rehypeRaw, rehypeUnwrapDetailsTable],
        }),
    },
});
