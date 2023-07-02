"use client";

import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/app/(split)/layout.styles";
import { PropsWithChildren } from "react";
import { MATRIX_WIDTH, SIDEBAR_WIDTH } from "@/src/data/consts";
import { Transport } from "@/src/components/transport/Transport";
import { Matrix } from "@/src/components/matrix/Matrix";

export default function SplitLayout({ children }: PropsWithChildren) {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper style={{ width: MATRIX_WIDTH }}>
        <Matrix />
      </StyledMainWrapper>
      <StyledSideBarWrapper style={{ width: SIDEBAR_WIDTH }}>
        <Transport />
        {children}
      </StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
