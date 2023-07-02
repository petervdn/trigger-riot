import { useMatrixStore } from "@/src/data/matrixStore";
import { Position } from "@/src/types/misc.types";
import { shallow } from "zustand/shallow";
import { useRef, useState } from "react";
import { useResizeObserver } from "@mediamonks/react-hooks";
import { Dial } from "@/src/components/dial/Dial";

type Props = {
  position: Position;
};

export function MatrixInputItem({ position }: Props) {
  const [width, setWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver(containerRef, () => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  });
  const editMode = useMatrixStore((state) => state.editMode);
  const setValue = useMatrixStore((state) => state.setValue);
  const matrixItem = useMatrixStore(
    (state) => state.getItemForPosition(position),
    shallow
  );

  const matrixItemValue = matrixItem[editMode];

  if (matrixItemValue.type === "number") {
    return (
      <div ref={containerRef}>
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
