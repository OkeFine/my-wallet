import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import layersIcon from "../assets/layers-icon.svg";
import closeIcon from "../assets/close-icon.svg";
import CURRENCIES, {
  TCurrencyId,
  assetSupport,
  convertCurrency,
  localCurrency,
  mainCurrency,
} from "../utils/currencyHelpers";
import Asset from "./Asset";

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

const ModalWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  height: 100%;
  width: 100%;
`;

const ModalHeader = styled.div`
  padding: 22px 0 16px 0;
  border-bottom: 1px solid #c5cee0;
  position: relative;
  margin-bottom: 12px;
  h3 {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    text-align: center;
  }
  button {
    background: none;
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    height: 24px;
    width: 24px;
  }
`;

const SelectAssetBtn = styled.button`
  padding: 0;
  background: none;
  width: 100%;
  text-align: left;
  &:hover {
    background: #edf1f7;
  }
`;

type TSelectModal = {
  onClose?: () => void;
  onChange?: (assetId: TCurrencyId) => void;
  open?: boolean;
  assets?: any;
};

function SelectModal({
  onClose = () => {},
  onChange = () => {},
  open = false,
  assets,
}: TSelectModal) {
  return !open ? null : (
    <Modal>
      <ModalWrapper>
        <ModalHeader className="modal">
          <h3>Assets</h3>
          <button onClick={() => onClose()}>
            <img src={closeIcon} alt="Close" />
          </button>
        </ModalHeader>
        {assetSupport.map((assetId: any) => {
          if (!assets[assetId]) {
            return null;
          }
          return (
            <SelectAssetBtn key={assetId} onClick={() => onChange(assetId)}>
              <Asset
                amount={assets[assetId]}
                currency={assetId}
                convert={convertCurrency(assetId, assets[assetId])}
                convertCurrency={localCurrency}
              />
            </SelectAssetBtn>
          );
        })}
      </ModalWrapper>
    </Modal>
  );
}

type TProps = {
  onChange?: (assetId: TCurrencyId) => void;
  assets?: Array<{ amount: number; assetId: TCurrencyId }>;
  defaultSelect?: TCurrencyId;
};

export default function AssetSelector({
  onChange = () => {},
  assets,
  defaultSelect = mainCurrency,
}: TProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selected, setSelected] = useState<TCurrencyId>(defaultSelect);

  const handleChange = (assetId: TCurrencyId) => {
    onChange(assetId);
    setSelected(assetId);
    setIsOpenModal(false);
  };

  return (
    <SelectfieldWrapper>
      <LabelArea>
        <LeftLabel>Asset</LeftLabel>
      </LabelArea>
      <SelectButton onClick={() => setIsOpenModal(true)}>
        <SelectedAsset>
          <img src={CURRENCIES[selected].icon} alt={CURRENCIES[selected].id} />
          {CURRENCIES[selected].id}
        </SelectedAsset>
        <img src={layersIcon} alt="Select Asset" />
      </SelectButton>
      <SelectModal
        assets={assets}
        onClose={() => setIsOpenModal(false)}
        onChange={handleChange}
        open={isOpenModal}
      />
    </SelectfieldWrapper>
  );
}
