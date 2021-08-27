import { useState, FormEvent } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Container, TextField, Button } from "../components";
import bgUnlock from "../assets/bg-unlock.svg";
import logo from "../assets/logo.svg";

const LogoArea = styled.div`
  width: 100%;
  height: 204px;
  margin-top: 50px;
  background-image: url("${bgUnlock}");
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormArea = styled.form`
  text-align: center;
`;

const AppName = styled.h1`
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  line-height: 16px;
  color: #151a30;
`;

const Slogan = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #151a30;
  margin: 24px 0;
`;

export default function Unlock() {
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handleUnlock = (e: any) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Container>
      <LogoArea>
        <img src={logo} alt="Ronin Wallet" />
      </LogoArea>
      <FormArea name="unlock" onSubmit={handleUnlock}>
        <AppName>Ronin Wallet</AppName>
        <Slogan>Your Digital Passport</Slogan>
        <TextField
          inputProps={{
            name: "password",
            type: "password",
            onChange: (e: FormEvent<HTMLInputElement>) => {
              setPass((e.target as HTMLInputElement).value);
            },
          }}
          label="Enter Password"
        />
        <Button width="88px">Unlock</Button>
      </FormArea>
    </Container>
  );
}
