import { MouseEventHandler } from "react";
import styled from "styled-components";
import backIcon from "../assets/back-icon.svg";

const NavContainer = styled.div`
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 12px #f7f9fc;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 18px 20px;
  margin-bottom: 24px;
`;

const BackBtn = styled.button`
  background: none;
  position: absolute;
  left: 20px;
  top: 16px;
`;

export default function NavBar({
  onClickBack,
  title,
}: {
  onClickBack: MouseEventHandler<HTMLButtonElement>;
  title: string;
}) {
  return (
    <NavContainer>
      <BackBtn onClick={onClickBack}>
        <img src={backIcon} alt="Go Back" />
      </BackBtn>
      {title}
    </NavContainer>
  );
}
