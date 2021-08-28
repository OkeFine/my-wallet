import { ReactNode } from "react";
import styled from "styled-components";

const SContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
`;

export default function Container({ children }: { children: ReactNode }) {
  return <SContainer>{children}</SContainer>;
}
