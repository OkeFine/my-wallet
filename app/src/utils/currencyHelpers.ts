import usdIcon from "../assets/usd-icon.svg";
import eurIcon from "../assets/eur-icon.svg";
import yenIcon from "../assets/yen-icon.svg";

export const localCurrency = "VND";
export const mainCurrency = "USD";

export type TCurrencyId = "USD" | "EUR" | "YEN" | "VND";

const CURRENCIES = {
  USD: { id: "USD", icon: usdIcon },
  EUR: { id: "EUR", icon: eurIcon },
  YEN: { id: "YEN", icon: yenIcon },
  VND: { id: "VND", icon: yenIcon },
};

export const format = (number: number) =>
  new Intl.NumberFormat().format(number);

export const assetSupport = ["USD", "EUR", "YEN", "VND"];

export const convertCurrency = (
  from: TCurrencyId,
  amount: number,
  to: TCurrencyId = localCurrency
) => {
  const rates: any = {
    USD_VND: 23000,
    YEN_VND: 207,
    EUR_VND: 27000,
  };
  const rateKey = `${from}_${to}`;
  const rate = rates[rateKey] ? rates[rateKey] : 1;
  return amount * rate;
};

export default CURRENCIES;
