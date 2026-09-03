/** City of Markham contribution rebate: 75% of eligible gifts $50+, capped at $150. */

export const REBATE_RATE = 0.75;
export const REBATE_MIN = 50;
export const REBATE_CAP = 150;
export const CANDIDATE_MAX = 1200;

/** Preset amounts for donate UI (whole-dollar rebates where eligible). */
export const DONATE_PRESETS = [25, 80, 100, 200, 500, 1200] as const;

/** Amount that maximises the City rebate for eligible Markham residents. */
export const DONATE_RECOMMENDED = 200;

export type RebateInfo = {
  amount: number;
  rebate: number;
  eligible: boolean;
  capped: boolean;
};

export function rebateFor(amount: number): RebateInfo {
  const n = Math.max(0, Math.floor(Number(amount) || 0));
  if (n < REBATE_MIN) {
    return { amount: n, rebate: 0, eligible: false, capped: false };
  }
  const raw = Math.floor(n * REBATE_RATE);
  const rebate = Math.min(REBATE_CAP, raw);
  return {
    amount: n,
    rebate,
    eligible: true,
    capped: raw > REBATE_CAP,
  };
}

export function rebateLabel(info: RebateInfo, locale: 'en' | 'zh-HK' = 'en'): string {
  if (!info.eligible) {
    return locale === 'zh-HK' ? '少於 $50 無市府回贈' : 'No City rebate under $50';
  }
  if (info.capped) {
    return locale === 'zh-HK'
      ? `回贈最高 $${info.rebate}`
      : `Up to $${info.rebate} rebate (capped)`;
  }
  return locale === 'zh-HK' ? `回贈 $${info.rebate}` : `$${info.rebate} rebate`;
}
