import { useMatrixStore } from "@/src/data/matrixStore";
import { editableMatrixItemProperties } from "@/src/types/matrix.types";
import { TabButtons } from "@/src/components/tab-buttons/TabButtons";
import { PRIMARY_COLOR } from "@/src/data/consts";

export function EditModeSelect() {
  const setEditMode = useMatrixStore((state) => state.setEditMode);
  const editMode = useMatrixStore((state) => state.editMode);

  return (
    <TabButtons
      inactiveBgColor={"white"}
      activeBgColor={PRIMARY_COLOR}
      options={editableMatrixItemProperties}
      value={editMode}
      onChange={(value) => {
        setEditMode(value as any); // todo: can we fix this?
      }}
    />
  );
}
