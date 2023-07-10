import { useMatrixStore } from "@/src/data/matrixStore";
import { editableMatrixItemProperties } from "@/src/types/matrix.types";
import { TabButtons } from "@/src/components/tab-buttons/TabButtons";

export function EditModeSelect() {
  const setEditMode = useMatrixStore((state) => state.setEditMode);
  const editMode = useMatrixStore((state) => state.editMode);

  return (
    <TabButtons
      options={editableMatrixItemProperties}
      value={editMode}
      onChange={(value) => {
        setEditMode(value as any); // todo: can we fix this?
      }}
    />
  );
}
