import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useSampleStore } from "@/src/data/sampleStore";
import { matrixItemsGroupIdentifierToString } from "@/src/data/sampleStore.utils";
import Select from "react-select";
import { SelectOption } from "@/src/types/misc.types";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";

type Props = {
  groupIdentifier: MatrixItemsGroupIdentifier;
};

export function SampleSelect({ groupIdentifier }: Props) {
  const groupStringId = useMemo(
    () => matrixItemsGroupIdentifierToString(groupIdentifier),
    [groupIdentifier]
  );
  const { samplesByGroup, allSamples, setSampleForGroup } = useSampleStore(
    (state) => ({
      samplesByGroup: state.samplesByGroup,
      allSamples: state.samples,
      setSampleForGroup: state.setSampleForGroup,
    }),
    shallow
  );

  const sample = useMemo(() => {
    return samplesByGroup[groupStringId];
  }, [groupStringId, samplesByGroup]);

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
        value={selectOptions.find(
          ({ value }) => value === (sample ? sample.filename : "")
        )}
        instanceId={`sample-select-${groupStringId}`}
        onChange={onSampleChange}
      />
    </>
  );
}
