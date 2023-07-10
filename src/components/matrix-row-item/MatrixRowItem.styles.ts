import styled from "styled-components";
import { BORDER_RADIUS } from "@/src/data/consts";

export const StyledMatrixRowItem = styled.div<{ isSelected?: boolean }>`
  background-color: ${(p) => (p.isSelected ? "#DDD" : "#f3f3f3")};
  border-radius: ${() => BORDER_RADIUS}px;
`;
