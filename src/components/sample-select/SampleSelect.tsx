import { MatrixItemGroupIdentifier } from "@/src/types/matrix.types";
import { useSampleStore } from "@/src/data/sampleStore";

import Select from "react-select";
import { SelectOption } from "@/src/types/misc.types";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { matrixItemGroupIdentifierToString } from "@/src/utils/matrixItemGroup.utils";
import { useSampleForGroup } from "@/src/utils/hooks/useSampleForGroup";

type Props = {
  groupIdentifier: MatrixItemGroupIdentifier;
};

export function SampleSelect({ groupIdentifier }: Props) {
  const groupStringId = useMemo(
    () => matrixItemGroupIdentifierToString(groupIdentifier),
    [groupIdentifier]
  );
  const { allSamples, setSampleForGroup } = useSampleStore(
    (state) => ({
      samplesByGroup: state.samplesByGroup,
      allSamples: state.samples,
      setSampleForGroup: state.setSampleForGroup,
    }),
    shallow
  );

  const sample = useSampleForGroup(groupIdentifier);

  const selectOptions: Array<SelectOption> = useMemo(() => {
    const sampleOptions = allSamples.map(({ filename }) => ({
      label: filename,
      value: filename,
    }));
    return [{ label: "No sample", value: "" }, ...sampleOptions];
  }, [allSamples]);

  const onSampleChange = (value: SelectOption | null) => {
    const newSample = value
      ? allSamples.find(({ filename }) => filename === value.value)
      : undefined;
    setSampleForGroup(groupIdentifier, newSample);
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
