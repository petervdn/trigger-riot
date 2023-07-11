"use client";

import { MATRIX_WIDTH, SIDEBAR_WIDTH } from "@/src/data/consts";
import { Matrix } from "@/src/components/matrix/Matrix";
import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/src/components/home-page/HomePage.styles";
import { EditModeSelect } from "@/src/components/edit-mode-select/EditModeSelect";
import { Sidebar } from "@/src/components/sidebar/Sidebar";

export function HomePage() {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper style={{ width: MATRIX_WIDTH }}>
        <EditModeSelect />
        <Matrix />
      </StyledMainWrapper>
      <StyledSideBarWrapper style={{ width: SIDEBAR_WIDTH }}>
        <Sidebar />
      </StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
