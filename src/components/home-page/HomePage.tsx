"use client";

import { MATRIX_WIDTH, SIDEBAR_WIDTH } from "@/src/data/consts";
import { Matrix } from "@/src/components/matrix/Matrix";
import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/src/components/home-page/HomePage.styles";

export function HomePage() {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper style={{ width: MATRIX_WIDTH }}>
        <Matrix />
      </StyledMainWrapper>
      <StyledSideBarWrapper style={{ width: SIDEBAR_WIDTH }}>
        <h3>Settings</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut,
        </p>
        <h3>Settings</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
