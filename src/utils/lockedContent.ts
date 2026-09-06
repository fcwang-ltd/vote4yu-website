/**
 * Build-time encryption for the unlisted page.
 *
 * The site builds to static files on GitHub Pages, which cannot check a
 * password before serving a file. So the content is encrypted during the
 * build and only the ciphertext is deployed; the browser decrypts it after
 * the reader supplies the passphrase.
 *
 * What this does protect: someone who fetches the deployed page without the
 * passphrase gets bytes they cannot read.
 *
 * What it does not protect against: an attacker holding the ciphertext can
 * guess passphrases offline as fast as their hardware allows, so the
 * passphrase has to be long and random. There is also no way to revoke access
 * for one person — changing who can read means changing the passphrase and
 * rebuilding.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** OWASP's 2023 floor for PBKDF2-HMAC-SHA256. */
export const PBKDF2_ITERATIONS = 600_000;

export type LockedPayload = {
  ciphertext: string;
  salt: string;
  iv: string;
  iterations: number;
};

const b64 = (buf: ArrayBuffer | Uint8Array) =>
  Buffer.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf)).toString('base64');

/**
 * Encrypts the file at `relPath` with `passphrase`.
 * Returns null when either the file or the passphrase is absent, so a build
 * without the secrets still succeeds and simply ships no content.
 */
export async function lockContent(
  relPath: string,
  /* Falls back to the environment so `pnpm dev` can read a local .env while CI
     supplies the same name as an Actions secret. Astro exposes non-PUBLIC vars
     to server-side code only, so this never reaches the browser. */
  passphrase: string | undefined = import.meta.env?.PRIVATE_PAGE_PASSPHRASE ??
    process.env.PRIVATE_PAGE_PASSPHRASE
): Promise<LockedPayload | null> {
  if (!passphrase) return null;

  const file = resolve(process.cwd(), relPath);
  if (!existsSync(file)) return null;

  const plaintext = readFileSync(file, 'utf8');
  const enc = new TextEncoder();

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));

  return {
    ciphertext: b64(ciphertext),
    salt: b64(salt),
    iv: b64(iv),
    iterations: PBKDF2_ITERATIONS,
  };
}
