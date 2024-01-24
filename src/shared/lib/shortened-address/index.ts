// EQCISAJu…W_JqYM3t
export const shortenedAddress = (address: string) =>
  address.slice(0, 8) +
  "..." +
  address.slice(address.length - 5, address.length);
