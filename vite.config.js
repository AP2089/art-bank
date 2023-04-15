import { defineConfig } from 'vite';
import path from 'path';
import glob from 'glob';
import { fileURLToPath } from 'node:url';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import liveReload from 'vite-plugin-live-reload';
import vitePluginHtmlBeautify from './plugins/vite-plugin-html-beautify';

export default defineConfig(({ command }) => {
  const config = {
    root: path.resolve(__dirname, 'src'),
    build: {
      emptyOutDir: true,
      outDir: path.resolve(__dirname, 'dist'),
      polyfillModulePreload: false,
      rollupOptions: {
        input: Object.fromEntries(
          glob.sync('src/*.html').map(file => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url))
          ])
        ),
        output: {
          assetFileNames: file => {
            if (file.name === 'index.css') {
              return `assets/main.[ext]`; 
            }

            return `assets/[name].[ext]`;
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'node_modules')
      },
      extensions: ['.js', '.json', '.scss', '.html']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/_config.scss";
            @import "@/styles/_mixins.scss";
          `
        }
      }
    },
    plugins: [
      ViteEjsPlugin(),
      liveReload('./components/**/*.{html,scss,json}', {
        alwaysReload: true
      })
    ]
  }

  if (command === 'build') {
    config.base = '/art-bank/';

    config.plugins = [
      ViteEjsPlugin(),
      vitePluginHtmlBeautify()
    ]
  }

  return config;
});