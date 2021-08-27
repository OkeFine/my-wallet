import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

const SButton = styled.button<{
  width?: string;
  secondary?: boolean;
}>`
  padding: 10px 20px;
  width: ${(props) => props.width || "100%"};
  background: ${(props) =>
    props.secondary
      ? "#F7F9FC"
      : "linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%)"};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => (props.secondary ? "#1273EA" : "#ffffff")}; ;
`;

type TProps = {
  children: ReactNode;
  width?: string;
  secondary?: boolean;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, ...rest }: TProps) {
  return <SButton {...rest}>{children}</SButton>;
}
