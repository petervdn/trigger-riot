import {
  StyledTabsButton,
  StyledTabsWrapper,
} from "@/src/components/tab-buttons/TabButtons.styles";

type Props = {
  options: Array<string>;
  value: string;
  onChange?: (value: string) => void;
};

export function TabButtons({ value, options, onChange }: Props) {
  return (
    <StyledTabsWrapper>
      {options.map((option) => (
        <StyledTabsButton
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
