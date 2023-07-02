"use client";

import { StyledHeader } from "@/src/components/header/Header.styles";
import { CONTENT_WIDTH, MATRIX_WIDTH } from "@/src/data/consts";
import { EditModeSelect } from "@/src/components/edit-mode-select/EditModeSelect";
import { MainWaveView } from "@/src/components/main-wave-view/MainWaveView";
import { Transport } from "@/src/components/transport/Transport";

export function Header() {
  return (
    <>
      <StyledHeader>
        <h1 style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>Trigger riot</h1>
        <div
          style={{ width: CONTENT_WIDTH, margin: "0 auto", display: "flex" }}
        >
          <div style={{ backgroundColor: undefined, width: MATRIX_WIDTH }}>
            <MainWaveView />
          </div>
          <Transport />
        </div>
      </StyledHeader>
      <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
        <EditModeSelect />
      </div>
    </>
  );
}
