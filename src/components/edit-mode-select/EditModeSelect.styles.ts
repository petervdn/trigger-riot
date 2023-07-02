import styled from "styled-components";
import { BORDER_RADIUS, MAIN_COLOR } from "@/src/data/consts";

export const StyledWrapper = styled.div`
  margin: 10px 0;
`;

export const StyledButton = styled.div<{ isActive?: boolean }>`
  background-color: ${(p) =>
    p.isActive ? MAIN_COLOR : "rgba(51, 51, 51, 0.0)"};
  border-radius: ${() => BORDER_RADIUS}px;
  border-width: 0;
  color: ${(p) => (p.isActive ? "white" : "#333333")};
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
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
