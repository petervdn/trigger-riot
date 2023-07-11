import {
  StyledTabsButton,
  StyledTabsWrapper,
} from "@/src/components/tab-buttons/TabButtons.styles";

type Props = {
  options: Array<string>;
  value: string;
  activeBgColor: string;
  inactiveBgColor: string;
  onChange?: (value: string) => void;
  fillSpace?: boolean;
};

export function TabButtons({
  value,
  options,
  onChange,
  inactiveBgColor,
  activeBgColor,
  fillSpace,
}: Props) {
  return (
    <StyledTabsWrapper fillSpace={fillSpace}>
      {options.map((option) => (
        <StyledTabsButton
          activeBgColor={activeBgColor}
          inactiveBgColor={inactiveBgColor}
          isActive={option === value}
          key={option}
          onClick={() => onChange?.(option)}
        >
          {option}
        </StyledTabsButton>
      ))}
    </StyledTabsWrapper>
  );
}
