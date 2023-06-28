import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useMatrixStore } from "@/src/data/matrixStore";
import { getPositionsForGroup } from "@/src/utils/matrixUtils";

type Props = {
  groupIdentifier: MatrixItemsGroupIdentifier;
};

export function MatrixGroupControls({ groupIdentifier }: Props) {
  const setSelectedItemPositions = useMatrixStore(
    ({ setSelectedItemPositions }) => setSelectedItemPositions
  );
  const { numberOfRows, numberOfColumns } = useMatrixStore(
    ({ numberOfColumns, numberOfRows }) => ({
      numberOfColumns,
      numberOfRows,
    })
  );

  const onSelectClick = () => {
    setSelectedItemPositions(
      getPositionsForGroup({ groupIdentifier, numberOfRows, numberOfColumns })
    );
  };

  return (
    <>
      <p>{`${groupIdentifier.type}-${groupIdentifier.index}`}</p>
      <button onClick={onSelectClick}>select</button>
    </>
  );
}
