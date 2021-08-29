import { useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useMutation } from "react-query";
import { transfer } from "../utils/services";
import {
  NavBar,
  TextField,
  Container,
  AssetSelector,
  Button,
  Modal,
} from "../components";
import { shortenAddress } from "../utils/walletHelpers";
import { StoreContext } from "../StoreContext";
import { mainCurrency, TCurrencyId } from "../utils/currencyHelpers";

const MyWallet = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #8f9bb3;
  label {
    font-weight: 600;
    margin-right: 8px;
  }
`;

const FixedButons = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  .marignButtons {
    width: 12%;
  }
`;

const Alert = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  h2 {
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    margin: 24px 0;
    text-align: center;
  }
  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 24px 0;
  }
`;

export default function Send() {
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [selected, setSelected] = useState<TCurrencyId>(mainCurrency);
  const [amountField, setAmountField] = useState<number | "">(0);
  const [to, setTo] = useState("");
  const [error, setError] = useState<any>(null);
  const [state, dispatch] = useContext(StoreContext);
  const { wallet, assets } = state.user;
  const history = useHistory();

  const { mutate, isLoading } = useMutation(transfer, {
    onSuccess: (data) => {
      dispatch({ type: "DEDUCTION", payload: data });
      setDisplaySuccess(true);
    },
    onError: (err) => {
      setError(err);
    },
  });

  const backToMainView = () => {
    history.push("/");
  };

  const sendAsset = () => {
    mutate({ assetId: selected, amount: amountField, to });
  };

  const validForm = () => !!to && amountField > 0;

  return (
    <>
      <NavBar title="Send Assets" onClickBack={backToMainView} />
      <Container>
        <TextField inputProps={{ disabled: true, type: "text" }} label="From">
          <MyWallet>
            <label>My Wallet</label>
            <span>{shortenAddress(wallet)}</span>
          </MyWallet>
        </TextField>
        <TextField
          inputProps={{
            type: "text",
            value: to,
            onChange: (e: React.FormEvent<HTMLInputElement>) =>
              setTo((e.target as HTMLInputElement).value),
          }}
          label="To"
        />
        <AssetSelector
          onChange={(selected) => setSelected(selected)}
          defaultSelect={selected}
          assets={assets}
        />
        <TextField
          inputProps={{
            value: amountField,
            type: "number",
            min: 1,
            max: assets[selected],
            onChange: (e: React.FormEvent<HTMLInputElement>) => {
              const { value } = e.target as HTMLInputElement;
              setAmountField(value !== "" ? Number(value) : value);
            },
          }}
          label="Amount"
          rightLabel={`Available: ${assets[selected]} ${selected}`}
          fillBtnText="Max"
          onClickFillBtn={() => setAmountField(assets[selected])}
        />
      </Container>
      <FixedButons>
        <Button onClick={backToMainView} secondary>
          Cancel
        </Button>
        <div className="marignButtons" />
        <Button disabled={!validForm()} onClick={sendAsset}>
          Send
        </Button>
      </FixedButons>
      {!displaySuccess ? null : (
        <Modal>
          <Alert>
            <h2>Successfully sent</h2>
            <p>
              Your <b>{selected}</b> has been sent! <br />
              Thank you for using our service
            </p>
            <Button onClick={() => setDisplaySuccess(false)}>OK</Button>
          </Alert>
        </Modal>
      )}
      {!error ? null : (
        <Modal>
          <Alert>
            <h2 style={{ color: "red" }}>Error</h2>
            <p>{error.response.data.message}</p>
            <Button onClick={() => setError(null)}>OK</Button>
          </Alert>
        </Modal>
      )}
    </>
  );
}
