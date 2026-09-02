/** Client helpers for campaign forms → Google Apps Script → Sheets. */

export type FormKind =
  | 'commit'
  | 'talk'
  | 'volunteer'
  | 'business'
  | 'interview'
  | 'subscribe'
  | 'donateIntent';

export type FormPayload = {
  kind: FormKind;
  locale?: string;
  [key: string]: string | undefined;
};

export function formsEndpoint(): string | undefined {
  const url = import.meta.env.PUBLIC_FORMS_ENDPOINT as string | undefined;
  return url && url.length > 0 ? url : undefined;
}

export async function submitForm(
  payload: FormPayload,
): Promise<{ ok: boolean; message?: string }> {
  const endpoint = formsEndpoint();
  if (!endpoint) {
    return { ok: false, message: 'unavailable' };
  }

  // Honeypot
  if (payload.website) {
    return { ok: true };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      return { ok: false, message: 'error' };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: 'error' };
  }
}
