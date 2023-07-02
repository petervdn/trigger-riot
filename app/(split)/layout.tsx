"use client";

import {
  StyledMainWrapper,
  StyledSideBarWrapper,
  StyledSplitWrapper,
} from "@/app/(split)/layout.styles";
import { PropsWithChildren } from "react";
import { MATRIX_WIDTH, SIDEBAR_WIDTH } from "@/src/data/consts";
import { Matrix } from "@/src/components/matrix/Matrix";

export default function SplitLayout({ children }: PropsWithChildren) {
  return (
    <StyledSplitWrapper>
      <StyledMainWrapper style={{ width: MATRIX_WIDTH }}>
        <Matrix />
      </StyledMainWrapper>
      <StyledSideBarWrapper style={{ width: SIDEBAR_WIDTH }}>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut,
        </p>
        {children}
      </StyledSideBarWrapper>
    </StyledSplitWrapper>
  );
}
