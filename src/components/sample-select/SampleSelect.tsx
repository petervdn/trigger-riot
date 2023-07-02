import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useSampleStore } from "@/src/data/sampleStore";
import { matrixItemsGroupIdentifierToString } from "@/src/data/sampleStore.utils";
import { shallow } from "zustand/shallow";
import Select from "react-select";
import { SelectOption } from "@/src/types/misc.types";
import { useMemo } from "react";

type Props = {
  groupIdentifier: MatrixItemsGroupIdentifier;
};

export function SampleSelect({ groupIdentifier }: Props) {
  const idString = matrixItemsGroupIdentifierToString(groupIdentifier);
  const { sample, allSamples, setSampleForGroup } = useSampleStore(
    (state) => ({
      sample: state.samplesByGroup[idString],
      allSamples: state.samples,
      setSampleForGroup: state.setSampleForGroup,
    }),
    shallow
  );

  const selectOptions: Array<SelectOption> = useMemo(() => {
    const sampleOptions = allSamples.map(({ filename }) => ({
      label: filename,
      value: filename,
    }));
    return [{ label: "No sample", value: "" }, ...sampleOptions];
  }, [allSamples]);

  const onSampleChange = (value: SelectOption | null) => {
    setSampleForGroup(
      groupIdentifier,
      value
        ? allSamples.find(({ filename }) => filename === value.value)
        : undefined
    );
  };

  return (
    <>
      <Select
        options={selectOptions}
        value={selectOptions.find(({ value }) => value === sample?.filename)}
        onChange={onSampleChange}
      />
    </>
  );
}
