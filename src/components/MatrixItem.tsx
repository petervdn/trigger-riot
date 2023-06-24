import { Dial } from "@/src/components/dial/Dial";
import { MatrixItem, useMatrixStore } from "@/src/data/store";

type Props = {
  matrixItem: MatrixItem;
  index: number;
};
const DIAL_SIZE = 150;
const DIAL_BUTTON_SIZE = 120;

export function MatrixItem({ matrixItem, index }: Props) {
  const { matrix, setValue, setEditMode, editMode } = useMatrixStore();

  const matrixItemValue = matrixItem[editMode];

  if (matrixItemValue.type === "number") {
    return (
      <Dial
        min={matrixItemValue.value.min}
        max={matrixItemValue.value.max}
        value={matrixItemValue.value.value}
        onChange={(value) => setValue(editMode, index, value)}
        size={DIAL_SIZE}
        buttonSize={DIAL_BUTTON_SIZE}
        integer={matrixItemValue.value.isInteger}
      />
    );
  }
}
