import styled from "styled-components";

export const StyledMatrixRowItem = styled.div<{ isSelected: boolean }>`
  background-color: ${(p) => (p.isSelected ? "#DDD" : "#f3f3f3")};
  border-radius: 6px;
`;
