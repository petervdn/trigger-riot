"use client";

import { MainView } from "@/src/components/main-view/MainView";
import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/app/(split)/layout.styles";
import { PropsWithChildren } from "react";

export default function SplitLayout({ children }: PropsWithChildren) {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper>
        <MainView />
      </StyledMainWrapper>
      <StyledSideBarWrapper>{children}</StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
