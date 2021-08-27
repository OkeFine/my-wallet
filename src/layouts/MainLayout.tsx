import { ReactNode } from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LayoutContainer = styled.div`
  width: 100%;
  height: 600px;
  max-width: 500px;
  box-shadow: 1px 1px 7px #ddd;
  position: relative;
`;
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper>
      <LayoutContainer>{children}</LayoutContainer>
    </LayoutWrapper>
  );
}
