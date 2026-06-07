import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
            /\/index-[^/]+\.js$/.test(dep),
        ),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion';
            // Keep React + Emotion in one chunk — splitting them causes a circular
            // chunk dependency and "Cannot access before initialization" in production.
            if (
              id.includes('@emotion') ||
              id.includes('react-dom') ||
              id.includes('/react/')
            ) {
              return 'vendor-react';
            }
            if (id.includes('react-intersection-observer')) return 'vendor-observe';
          }
          if (id.includes('/src/data/blog')) return 'content-blog';
          if (id.includes('/src/components/ui/DevTerminal')) return 'feature-terminal';
          if (id.includes('/src/components/ui/ProjectModal') || id.includes('/src/components/ui/BlogModal')) {
            return 'feature-modals';
          }
          if (id.includes('/src/components/layout/BelowFold')) return 'feature-below-fold';
        },
      },
    },
  },
});
