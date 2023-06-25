import { Dial } from "@/src/components/dial/Dial";
import { useMatrixStore } from "@/src/data/matrixStore";
import { MatrixItem } from "@/src/types/matrix.types";

type Props = {
  matrixItem: MatrixItem;
};
const DIAL_SIZE = 130;
const DIAL_BUTTON_SIZE = 100;

export function MatrixInputItem({ matrixItem }: Props) {
  const { setValue, editMode } = useMatrixStore();

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
}
