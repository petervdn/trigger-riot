import { Dial } from "@/src/components/dial/Dial";
import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { shallow } from "zustand/shallow";
import { MATRIX_BUTTON_WIDTH } from "@/src/data/consts";

type Props = {
  position: Position;
};

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
      <div style={{ width: "100%" }}>
        <Dial
          min={matrixItemValue.min}
          max={matrixItemValue.max}
          value={matrixItemValue.value}
          onChange={(value) => setValue(editMode, matrixItem.index, value)}
          size={MATRIX_BUTTON_WIDTH}
          buttonSize={MATRIX_BUTTON_WIDTH - 30}
          integer={matrixItemValue.isInteger}
          getLabel={matrixItemValue.getLabel}
        />
      </div>
    );
  }
  // if (matrixItemValue.type === "string") {
  //   return (
  //     <div style={{ width: DIAL_SIZE }}>
  //       <OptionsDial
  //         options={matrixItemValue.options}
  //         value={matrixItemValue.value}
  //         onChange={(value) => setValue(editMode, matrixItem.index, value)}
  //         size={DIAL_SIZE}
  //         buttonSize={DIAL_BUTTON_SIZE}
  //       />
  //     </div>
  //   );
  // }
}
