interface ImportMetaEnv { readonly BASE_URL: string; readonly DEV: boolean; readonly PROD: boolean }
interface ImportMeta { readonly env: ImportMetaEnv }
// The components import their co-located stylesheets; esbuild collects them
// into dist/index.css.
declare module '*.css';
