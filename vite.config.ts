import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [dts()],
  build: {
    ssr: true,
    rollupOptions: {
      plugins: [nodePolyfills()],
      output: {
        exports: 'named',
        globals: {
          axios: 'axios',
          'axios-cache-adapter': 'axiosCacheAdapter',
          events: 'events',
          'form-data': 'formData',
          'whatwg-url': 'whatwgUrl',
        },
      },
    },
  },
});
