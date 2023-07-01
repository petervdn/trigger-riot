"use client";

import { StyledHeader } from "@/src/components/header/Header.styles";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { CONTENT_WIDTH } from "@/src/data/consts";

export function Header() {
  return (
    <>
      <StyledHeader>
        <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
          <h1>Trigger riot</h1>
          <WaveView width={CONTENT_WIDTH} height={80} />
        </div>
      </StyledHeader>
    </>
  );
}
