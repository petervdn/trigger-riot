import styled from "styled-components";

export const StyledSplitWrapper = styled.div`
  display: flex;
`;

export const StyledSideBarWrapper = styled.div<{ width: number }>`
  width: ${(p) => p.width}px;
  flex-grow: 0;
  background-color: #ddd;
  padding: 10px;
`;

export const StyledMainWrapper = styled.div`
  flex-grow: 1;
`;
