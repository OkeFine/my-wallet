import { useHistory } from "react-router";
import styled from "styled-components";
import {
  NavBar,
  TextField,
  Container,
  AssetSelector,
  Button,
} from "../components";

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

export default function Send() {
  const history = useHistory();

  const backToMainView = () => {
    history.push("/");
  };

  return (
    <>
      <NavBar title="Send Assets" onClickBack={backToMainView} />
      <Container>
        <TextField inputProps={{ disabled: true, type: "text" }} label="From">
          <MyWallet>
            <label>My Wallet</label>
            <span>(7300...3334)</span>
          </MyWallet>
        </TextField>
        <TextField inputProps={{ type: "text" }} label="To" />
        <AssetSelector />
        <TextField
          inputProps={{ type: "number" }}
          label="Amount"
          rightLabel="Available: 50 EUR"
          fillBtnText="Max"
        />
      </Container>
      <FixedButons>
        <Button onClick={backToMainView} secondary>
          Cancel
        </Button>
        <div className="marignButtons" />
        <Button>Send</Button>
      </FixedButons>
    </>
  );
}
