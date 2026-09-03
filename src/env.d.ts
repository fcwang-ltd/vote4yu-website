/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_FORMS_ENDPOINT?: string;
  readonly PUBLIC_FORMS_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
