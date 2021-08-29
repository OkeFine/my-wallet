import { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import bgMain from "../assets/bg-main.svg";
import userIcon from "../assets/user-icon.svg";
import copyIcon from "../assets/copy-icon.svg";
import logo from "../assets/logo-transparent.svg";
import depositIcon from "../assets/deposit-icon.svg";
import sendIcon from "../assets/send-icon.svg";
import swapIcon from "../assets/swap-icon.svg";
import { Container, Asset } from "../components";
import {
  format,
  convertCurrency,
  assetSupport,
  mainCurrency,
  localCurrency,
} from "../utils/currencyHelpers";
import { shortenAddress } from "../utils/walletHelpers";
import { StoreContext } from "../StoreContext";

const PatternBg = styled.div`
  width: 100%;
  height: 345px;
  margin-top: 24px;
  background-image: url("${bgMain}");
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;
const WalletStatus = styled.button`
  width: 126px;
  height: 32px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
`;

const StatusIcon = styled.span`
  display: block;
  width: 8px;
  height: 8px;
  background: #1273ea;
  border-radius: 4px;
  margin: 0 12px 0 6px;
`;

const UserBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  padding: 0;
`;

const AccountPanel = styled.div`
  padding: 20px;
  background: linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);
  box-shadow: 0px 12px 20px -4px #c5cee0;
  border-radius: 16px;
  color: #ffffff;
  position: relative;
  margin-top: 20px;
  margin-bottom: 28px;
`;

const WalletAddress = styled.div`
  width: 100%;
  padding-bottom: 14px;
  margin-bottom: 12px;
  border-bottom: 1px solid #68b8f8;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WalletInfo = styled.div`
  display: flex;
`;

const Address = styled.div`
  color: #8dc9f9;
  margin-left: 8px;
`;

const CopyBtn = styled.button`
  background: none;
`;

const TotalAmount = styled.div`
  padding-right: 50px;
  & h1 {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    margin: 0;
  }
  & h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #8dc9f9;
    margin: 0;
  }
`;
const TransparentLogo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 25px;
`;

const ActionBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ButtonBlock = styled.button`
  background: none;
  font-weight: 600;
  margin: 0 12px;
  &:disabled {
    opacity: 0.5;
  }
`;

const BtnIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  aign-items: center;
  justify-content: center;
  background: #f7f9fc;
  border-radius: 8px;
  margin-bottom: 4px;
  img {
    width: 24px;
    height: auto;
  }
`;

const AssetLabel = styled.h4`
  margin: 0 0 12px 12px;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const AssetItem = styled.div`
  margin-bottom: 4px;
  background: #f7f9fc;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export default function Main() {
  const [state] = useContext(StoreContext);
  const { wallet, assets } = state.user;
  const history = useHistory();
  return (
    <Container>
      <PatternBg />
      <HeaderInfo>
        <WalletStatus>
          <StatusIcon />
          Ronin Wallet
        </WalletStatus>
        <UserBtn>
          <img src={userIcon} alt="Your Profile" />
        </UserBtn>
      </HeaderInfo>
      <AccountPanel>
        <WalletAddress>
          <WalletInfo>
            <span>My Wallet</span>
            <Address>{shortenAddress(wallet)}</Address>
          </WalletInfo>
          <CopyBtn>
            <img src={copyIcon} alt="Copy Address" />
          </CopyBtn>
        </WalletAddress>
        <TotalAmount>
          <h1>
            {format(assets[mainCurrency])} {mainCurrency}
          </h1>
          <h3>
            {format(convertCurrency(mainCurrency, assets[mainCurrency]))}{" "}
            {localCurrency}
          </h3>
        </TotalAmount>
        <TransparentLogo>
          <img src={logo} alt="Ronin Wallet" />
        </TransparentLogo>
      </AccountPanel>
      <ActionBar>
        <ButtonBlock disabled>
          <BtnIcon>
            <img src={depositIcon} alt="Deposit" />
          </BtnIcon>
          <span>Deposit</span>
        </ButtonBlock>
        <ButtonBlock onClick={() => history.push("/send")}>
          <BtnIcon>
            <img src={sendIcon} alt="Send" />
          </BtnIcon>
          <span>Send</span>
        </ButtonBlock>
        <ButtonBlock disabled>
          <BtnIcon>
            <img src={swapIcon} alt="Swap" />
          </BtnIcon>
          <span>Swap</span>
        </ButtonBlock>
      </ActionBar>
      <div>
        <AssetLabel>Assets</AssetLabel>
        {assetSupport
          .filter((assetId) => assetId !== mainCurrency)
          .map((assetId: any) => {
            if (!assets[assetId]) {
              return null;
            }
            return (
              <AssetItem key={assetId}>
                <Asset
                  amount={assets[assetId]}
                  currency={assetId}
                  convert={convertCurrency(assetId, assets[assetId])}
                  convertCurrency={localCurrency}
                />
              </AssetItem>
            );
          })}
      </div>
    </Container>
  );
}
