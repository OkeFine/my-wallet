export const shortenAddress = (address: string, count: number = 6) => {
  return `(${address.slice(0, count)}...${address.slice(
    address.length - count,
    address.length
  )})`;
};
