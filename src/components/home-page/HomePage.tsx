"use client";

import {
  MATRIX_WIDTH,
  MAX_BPM,
  MIN_BPM,
  SIDEBAR_WIDTH,
} from "@/src/data/consts";
import { Matrix } from "@/src/components/matrix/Matrix";
import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/src/components/home-page/HomePage.styles";
import { ValueSlider } from "@/src/components/value-slider/ValueSlider";
import { Settings } from "@/src/components/settings/Settings";

export function HomePage() {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper style={{ width: MATRIX_WIDTH }}>
        <Matrix />
      </StyledMainWrapper>
      <StyledSideBarWrapper style={{ width: SIDEBAR_WIDTH }}>
        <Settings />
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
