import { Dial } from "@/src/components/dial/Dial";
import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { shallow } from "zustand/shallow";
import { OptionsDial } from "@/src/components/options-dial/OptionsDial";

type Props = {
  position: Position;
};
const DIAL_SIZE = 130;
const DIAL_BUTTON_SIZE = 100;

export function MatrixInputItem({ position }: Props) {
  const editMode = useMatrixStore((state) => state.editMode);
  const setValue = useMatrixStore((state) => state.setValue);
  const matrixItem = useMatrixStore(
    (state) => state.getItemForPosition(position),
    shallow
  );

  const matrixItemValue = matrixItem[editMode];

  if (matrixItemValue.type === "number") {
    return (
      <div style={{ width: DIAL_SIZE }}>
        <Dial
          min={matrixItemValue.min}
          max={matrixItemValue.max}
          value={matrixItemValue.value}
          onChange={(value) => setValue(editMode, matrixItem.index, value)}
          size={DIAL_SIZE}
          buttonSize={DIAL_BUTTON_SIZE}
          integer={matrixItemValue.isInteger}
        />
      </div>
    );
  }
  if (matrixItemValue.type === "string") {
    return (
      <div style={{ width: DIAL_SIZE }}>
        <OptionsDial
          options={matrixItemValue.options}
          value={matrixItemValue.value}
          onChange={(value) => setValue(editMode, matrixItem.index, value)}
          size={DIAL_SIZE}
          buttonSize={DIAL_BUTTON_SIZE}
        />
      </div>
    );
  }
}
