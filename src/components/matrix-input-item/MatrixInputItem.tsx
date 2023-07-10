import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { Dial } from "@/src/components/dial/Dial";
import { useElementWidth } from "@/src/utils/hooks/useElementWidth";
import { useMatrixItemForPosition } from "@/src/utils/hooks/useMatrixItemForPosition";
import { shallow } from "zustand/shallow";

type Props = {
  position: Position;
};

export function MatrixInputItem({ position }: Props) {
  const { elementRef, width } = useElementWidth();
  const { setValue, editMode } = useMatrixStore(
    (state) => ({ editMode: state.editMode, setValue: state.setValue }),
    shallow
  );

  const matrixItem = useMatrixItemForPosition(position);
  const matrixItemValue = matrixItem[editMode];

  if (matrixItemValue.type === "number") {
    return (
      <div ref={elementRef}>
        {width && (
          <Dial
            min={matrixItemValue.min}
            max={matrixItemValue.max}
            value={matrixItemValue.value}
            onChange={(value) => setValue(editMode, matrixItem.index, value)}
            size={width}
            buttonSize={width - 30}
            integer={matrixItemValue.isInteger}
            getLabel={matrixItemValue.getLabel}
          />
        )}
      </div>
    );
  }
}
