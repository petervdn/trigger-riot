import styled from "styled-components";
import { BORDER_RADIUS, PRIMARY_COLOR } from "@/src/data/consts";

export const StyledTabsWrapper = styled.div<{ fillSpace?: boolean }>`
  margin: 10px 0;
  display: flex;
  justify-content: ${({ fillSpace }) =>
    fillSpace ? "space-between" : undefined};
`;

export const StyledTabsButton = styled.div<{
  isActive?: boolean;
  activeBgColor: string;
  inactiveBgColor: string;
}>`
  background-color: ${(p) =>
    p.isActive ? p.activeBgColor : p.inactiveBgColor};
  border-radius: ${() => BORDER_RADIUS}px;
  border-width: 0;
  color: ${({ isActive }) => (isActive ? "white" : "#333333")};
  cursor: pointer;
  //display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 8px 10px;
  text-align: center;
  // transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;
