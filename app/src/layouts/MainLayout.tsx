import { ReactNode } from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const LayoutContainer = styled.div`
  box-shadow: 1px 1px 7px #ddd;
  position: relative;
  width: 100%;
  height: 100%;
`;
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper>
      <LayoutContainer>{children}</LayoutContainer>
    </LayoutWrapper>
  );
}
