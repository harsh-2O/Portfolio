import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const has = (id: string, pkg: string) => id.includes(`/node_modules/${pkg}/`);

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.webp'],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: {
      polyfill: false,
      resolveDependencies: (_filename, deps) =>
        deps.filter(
          (dep) =>
            dep.includes('vendor-react') ||
            dep.includes('vendor-motion') ||
            dep.includes('vendor-lenis') ||
            /\/index-[^/]+\.js$/.test(dep),
        ),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (has(id, 'framer-motion') || has(id, 'motion-dom') || has(id, 'motion-utils')) {
              return 'vendor-motion';
            }
            if (has(id, 'three') || id.includes('/node_modules/@react-three/')) return 'vendor-three';
            if (has(id, 'lenis')) return 'vendor-lenis';
            // Keep React + Emotion (and their CJS helpers) in one chunk — splitting them
            // creates a circular chunk dependency and a blank page in production.
            if (
              id.includes('/node_modules/@emotion/') ||
              has(id, 'react') ||
              has(id, 'react-dom') ||
              has(id, 'scheduler') ||
              has(id, 'stylis') ||
              has(id, 'hoist-non-react-statics') ||
              id.includes('/node_modules/@babel/runtime/')
            ) {
              return 'vendor-react';
            }
            if (has(id, 'react-intersection-observer')) return 'vendor-observe';
          }
          if (id.includes('commonjsHelpers')) return 'vendor-react';
          if (id.includes('/src/data/blog')) return 'content-blog';
          // Application modules are deliberately left to Rollup. Naming them here
          // merged shared code into a feature chunk, which turned a lazy import
          // into a static one and pulled ~240 KB of WebGL onto every first paint.
        },
      },
    },
  },
});
