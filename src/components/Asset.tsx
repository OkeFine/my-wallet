import styled from "styled-components";
import CURRENCIES, { TCurrencyId, format } from "../utils/currencyHelpers";

const SAsset = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  img {
    margin-right: 16px;
  }
`;

const Amount = styled.div`
  h5 {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 4px 0;
  }
  span {
    color: #8f9bb3;
  }
`;

type TProps = {
  amount: number;
  currency: TCurrencyId;
  convert: number;
  convertCurrency: TCurrencyId;
};

export default function Asset({
  amount,
  currency,
  convert,
  convertCurrency,
}: TProps) {
  return (
    <SAsset>
      <img src={CURRENCIES[currency].icon} alt="USD" />
      <Amount>
        <h5>
          {format(amount)} {CURRENCIES[currency].id}
        </h5>
        <span>
          {format(convert)} {CURRENCIES[convertCurrency].id}
        </span>
      </Amount>
    </SAsset>
  );
}
