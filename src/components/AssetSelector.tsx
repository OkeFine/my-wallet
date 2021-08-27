import { useState } from "react";
import styled from "styled-components";
import layersIcon from "../assets/layers-icon.svg";
import CURRENCIES, { TCurrencyId } from "../utils/currencyHelpers";

const SelectfieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
  position: relative;
`;

const LabelArea = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  margin-bottom: 4px;
`;

const LeftLabel = styled.label`
  margin-left: 8px;
  color: #57627b;
`;

const SelectButton = styled.button`
  background: #ffffff;
  border: 1px solid #c5cee0;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const SelectedAsset = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: auto;
    margin-right: 8px;
  }
`;

type TProps = {
  onChange?: (selected: TCurrencyId) => void;
  availableAssets?: Array<TCurrencyId>;
  defaultSelect?: TCurrencyId;
};

export default function AssetSelector({
  onChange,
  availableAssets,
  defaultSelect = "EUR",
}: TProps) {
  const [selected, setSelected] = useState<TCurrencyId>(defaultSelect);
  return (
    <SelectfieldWrapper>
      <LabelArea>
        <LeftLabel>Asset</LeftLabel>
      </LabelArea>
      <SelectButton>
        <SelectedAsset>
          <img src={CURRENCIES[selected].icon} alt={CURRENCIES[selected].id} />
          {CURRENCIES[selected].id}
        </SelectedAsset>
        <img src={layersIcon} alt="Select Asset" />
      </SelectButton>
    </SelectfieldWrapper>
  );
}
