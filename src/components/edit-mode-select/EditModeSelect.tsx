import { useMatrixStore } from "@/src/data/matrixStore";
import { editableMatrixItemProperties } from "@/src/types/matrix.types";
import {
  StyledButton,
  StyledWrapper,
} from "@/src/components/edit-mode-select/EditModeSelect.styles";

export function EditModeSelect() {
  const setEditMode = useMatrixStore((state) => state.setEditMode);
  const editMode = useMatrixStore((state) => state.editMode);

  return (
    <StyledWrapper>
      {editableMatrixItemProperties.map((property) => (
        <StyledButton
          isActive={editMode === property}
          key={property}
          onClick={() => setEditMode(property)}
        >
          {property}
        </StyledButton>
      ))}
    </StyledWrapper>
  );
}
