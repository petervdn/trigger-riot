import { Dial } from "@/src/components/dial/Dial";
import { useMatrixStore } from "@/src/data/store";
import { MatrixItem } from "@/src/types/matrix.types";

type Props = {
  matrixItem: MatrixItem;
};
const DIAL_SIZE = 130;
const DIAL_BUTTON_SIZE = 100;

export function MatrixItem({ matrixItem }: Props) {
  const { matrix, setValue, setEditMode, editMode } = useMatrixStore();

  const matrixItemValue = matrixItem[editMode];

  if (matrixItemValue.type === "number") {
    return (
      <Dial
        min={matrixItemValue.value.min}
        max={matrixItemValue.value.max}
        value={matrixItemValue.value.value}
        onChange={(value) => setValue(editMode, matrixItem.index, value)}
        size={DIAL_SIZE}
        buttonSize={DIAL_BUTTON_SIZE}
        integer={matrixItemValue.value.isInteger}
      />
    );
  }
}
