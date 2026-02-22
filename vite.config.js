import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

/**
 * VITE PRODUCTION OPTIMIZATION CONFIG
 * 
 * Key optimizations:
 * 1. Code splitting - separates vendor and app code
 * 2. Lazy loading - dynamic imports for routes
 * 3. Asset optimization - minifies and compresses
 * 4. Tree shaking - removes unused code
 * 5. CSS/JS minification - reduces file sizes
 * 6. Gzip compression - reduces transfer size
 * 7. Bundle analysis - identifies optimization opportunities
 */

export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh for development
      fastRefresh: true,
      // Babel compilation for better browser support
      babel: {
        parserOpts: {
          plugins: ['jsx'],
        },
      },
    }),
    // Gzip compression for production builds
    compression({
      verbose: true,
      disable: false,
      threshold: 1024, // Only compress files > 1KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli compression (better than gzip, ~20% smaller)
    compression({
      verbose: false,
      algorithm: 'brotli',
      ext: '.br',
      disable: false,
      threshold: 1024,
    }),
    // Bundle visualization for analysis
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/bundle-analysis.html',
    }),
  ],

  build: {
    // Target modern browsers (ES2020+)
    target: 'ES2020',

    // Output directory
    outDir: 'dist',
    assetsDir: 'assets',

    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info'], // Remove specific functions
      },
      format: {
        comments: false, // Remove all comments
      },
    },

    // CSS minification
    cssMinify: true,
    cssCodeSplit: true, // Split CSS per component

    // JavaScript minification and tree-shaking
    rollupOptions: {
      output: {
        // Code splitting strategy
        manualChunks: {
          // Vendor libraries - rarely change
          vendor: [
            'react',
            'react-dom',
          ],
          // Framer Motion - large library
          'framer-motion': ['framer-motion'],
          // Bootstrap icons - icon library
          'bootstrap-icons': ['bootstrap-icons'],
          // Lucide icons
          'lucide-react': ['lucide-react'],
        },
        // Optimize chunk naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|ttf|otf|eot/.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      // Tree-shaking: remove unused exports
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },

    // Source maps in production (disable for smaller size)
    sourcemap: false,

    // Chunk size warning threshold (in KB)
    chunkSizeWarningLimit: 500,

    // Enable/disable reporting compressed size
    reportCompressedSize: true,

    // Emitting assets to dist
    copyPublicDir: true,

    // Watch mode for development
    watch: null,

    // Library mode (if needed)
    lib: false,

    // Manifest for server-side rendering
    manifest: false,

    // Inline dynamic imports
    dynamicImportInCjs: false,
  },

  // Server configuration
  server: {
    // Development server port
    port: 3000,
    // Automatically open browser
    open: false,
    // Hot module replacement
    hmr: true,
    // CORS
    cors: true,
    // Compression in dev (optional, slows down rebuilds)
    middlewareMode: false,
  },

  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle dependencies
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'bootstrap-icons',
      'lucide-react',
    ],
    // Exclude from pre-bundling (bundled with app)
    exclude: [],
    // Force re-bundle of dependencies
    force: false,
  },

  // Preview server (for production preview)
  preview: {
    port: 5000,
  },

  // Resolver configuration
  resolve: {
    // Aliases for cleaner imports
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
    },
  },

  // CSS configuration
  css: {
    postcss: './postcss.config.js',
  },
});
