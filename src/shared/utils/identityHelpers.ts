export const maskIdentityNumber = (identityNumber: string): string => {
  if (!identityNumber || identityNumber.length < 11) return identityNumber;
  return (
    identityNumber.substring(0, 3) +
    '*'.repeat(identityNumber.length - 6) +
    identityNumber.substring(identityNumber.length - 3)
  );
};
