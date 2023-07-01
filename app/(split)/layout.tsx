"use client";

import { MainView } from "@/src/components/main-view/MainView";
import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/app/(split)/layout.styles";
import { PropsWithChildren } from "react";
import { MATRIX_WIDTH, SIDEBAR_WIDTH } from "@/src/data/consts";
import { Transport } from "@/src/components/transport/Transport";

export default function SplitLayout({ children }: PropsWithChildren) {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper style={{ width: MATRIX_WIDTH }}>
        <MainView />
      </StyledMainWrapper>
      <StyledSideBarWrapper width={SIDEBAR_WIDTH}>
        <Transport />
        {children}
      </StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
