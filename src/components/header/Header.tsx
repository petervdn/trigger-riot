"use client";

import { StyledHeader } from "@/src/components/header/Header.styles";
import { CONTENT_WIDTH } from "@/src/data/consts";
import { EditModeSelect } from "@/src/components/edit-mode-select/EditModeSelect";
import { MainWaveView } from "@/src/components/main-wave-view/MainWaveView";

export function Header() {
  return (
    <>
      <StyledHeader>
        <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
          <h1>Trigger riot</h1>
          <MainWaveView />
        </div>
      </StyledHeader>
      <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
        <EditModeSelect />
      </div>
    </>
  );
}
