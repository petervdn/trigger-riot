import styled from "styled-components";
import { BORDER_RADIUS, PRIMARY_COLOR } from "@/src/data/consts";

export const StyledTabsWrapper = styled.div`
  margin: 10px 0;
`;

export const StyledTabsButton = styled.div<{ isActive?: boolean }>`
  background-color: ${(p) => (p.isActive ? PRIMARY_COLOR : "white")};
  border-radius: ${() => BORDER_RADIUS}px;
  border-width: 0;
  color: ${(p) => (p.isActive ? "white" : "#333333")};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;
