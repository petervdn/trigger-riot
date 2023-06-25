import { RowOrColumn } from "@/src/types/misc.types";
import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useGroupedItems } from "@/src/utils/hooks/useGroupedItems";
import { useMatrixStore } from "@/src/data/matrixStore";

type Props = {
  groupIdentifier: MatrixItemsGroupIdentifier;
};

export function MatrixGroupControls({ groupIdentifier }: Props) {
  const items = useGroupedItems(groupIdentifier);
  const { setSelectedItemPositions, selectedItemPositions } = useMatrixStore();

  const onSelectClick = () => {
    setSelectedItemPositions(items.map(({ position }) => ({ ...position })));
  };

  return (
    <>
      <p>{`${groupIdentifier.type}-${groupIdentifier.index}`}</p>
      <button onClick={onSelectClick}>select</button>
    </>
  );
}
