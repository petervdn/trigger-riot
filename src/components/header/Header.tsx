"use client";

import { StyledHeader } from "@/src/components/header/Header.styles";
import { WaveView } from "@/src/components/wave-view/WaveView";
import { CONTENT_WIDTH, MATRIX_WIDTH } from "@/src/data/consts";
import { EditModeSelect } from "@/src/components/edit-mode-select/EditModeSelect";

export function Header() {
  return (
    <>
      <StyledHeader>
        <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
          <h1>Trigger riot</h1>
          <WaveView width={MATRIX_WIDTH} height={80} />
        </div>
      </StyledHeader>
      <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
        <EditModeSelect />
      </div>
    </>
  );
}
