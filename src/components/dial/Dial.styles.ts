import styled from "styled-components";

export const StyledDialWrapper = styled.div<{ width: number }>`
  width: ${(p) => p.width}px;
`;

export const StyledRelativePositioner = styled.div<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  position: relative;
`;

export const StyledKnobWrapper = styled.div<{ leftTopOffset: number }>`
  position: absolute;
  left: ${(p) => p.leftTopOffset}px;
  top: ${(p) => p.leftTopOffset}px;
`;

export const StyledKnobLabel = styled.p`
  margin: -8px 0 0 0;
  text-align: center;
  color: #bbb;
`;
