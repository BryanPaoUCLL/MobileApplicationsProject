export function formatCurrency(
  amountMinor: number,
  currency: string,
  language: string,
  minorUnit = 2,
): string {
  const locale = language.startsWith('nl') ? 'nl-BE' : 'en-GB';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amountMinor / 10 ** minorUnit);
}
