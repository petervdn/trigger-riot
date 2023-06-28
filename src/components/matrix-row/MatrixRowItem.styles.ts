import styled from "styled-components";
import { boolean } from "zod";

export const StyledMatrixRowItem = styled.div<{ isSelected: boolean }>`
  background-color: ${(p) => (p.isSelected ? "#EEE" : "#f8f8f8")};
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  width: 130px;
`;
