export const formatIban = (iban: string): string => {
  const normalizedIban = iban.replace(/\s/g, '').toUpperCase();
  return normalizedIban.match(/.{1,4}/g)?.join(' ') ?? '';
};
