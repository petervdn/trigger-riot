import styled from "styled-components";
import { MATRIX_ITEM_MARGIN } from "@/src/data/consts";

export const StyledMatrixRow = styled.div`
  display: flex;
  gap: ${() => MATRIX_ITEM_MARGIN}px;
  margin-bottom: ${() => MATRIX_ITEM_MARGIN}px;
`;
