import usdIcon from "../assets/usd-icon.svg";
import eurIcon from "../assets/eur-icon.svg";
import yenIcon from "../assets/yen-icon.svg";

export type TCurrencyId = "USD" | "EUR" | "YEN" | "VND";

const CURRENCIES = {
  USD: { id: "USD", icon: usdIcon },
  EUR: { id: "EUR", icon: eurIcon },
  YEN: { id: "YEN", icon: yenIcon },
  VND: { id: "VND", icon: yenIcon },
};

export const format = (number: number) =>
  new Intl.NumberFormat().format(number);

export default CURRENCIES;
