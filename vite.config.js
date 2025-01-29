import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/scripts/main.js'),
                styles: resolve(__dirname, 'src/css/styles.css'),
            },
            output: {
                dir: 'dist',
                entryFileNames: 'scripts/[name].js',
                assetFileNames: ({ name }) => {
                    if (name && name.endsWith('.css')) return 'css/[name].[ext]';
                    return 'assets/[name].[ext]';
                },
            },
        },
    },
    plugins: [
        createHtmlPlugin({
            minify: true
        }),
        viteStaticCopy({
            targets: [
                { src: 'src/index.html', dest: '' },
                { src: 'src/manifest.json', dest: '' },
                { src: 'src/icons/*', dest: 'icons' },
            ]
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        },
    }
});
