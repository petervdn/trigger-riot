import { MatrixItemsGroupIdentifier } from "@/src/types/matrix.types";
import { useSampleStore } from "@/src/data/sampleStore";
import { matrixItemsGroupIdentifierToString } from "@/src/data/sampleStore.utils";
import Select from "react-select";
import { SelectOption } from "@/src/types/misc.types";
import { useMemo } from "react";

type Props = {
  groupIdentifier: MatrixItemsGroupIdentifier;
};

export function SampleSelect({ groupIdentifier }: Props) {
  const samplesByGroup = useSampleStore((state) => state.samplesByGroup);
  const allSamples = useSampleStore((state) => state.samples);
  const setSampleForGroup = useSampleStore((state) => state.setSampleForGroup);
  // const { sample, allSamples, setSampleForGroup } = useSampleStore(
  //   (state) => ({
  //     sample: state.samplesByGroup[idString],
  //     allSamples: state.samples,
  //     setSampleForGroup: state.setSampleForGroup,
  //   }),
  //   shallow
  // );
  const groupStringId = useMemo(
    () => matrixItemsGroupIdentifierToString(groupIdentifier),
    [groupIdentifier]
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
  console.log(samplesByGroup);

  return (
    <>
      <Select
        options={selectOptions}
        value={selectOptions.find(
          ({ value }) => value === (sample ? sample.filename : "")
        )}
        instanceId={groupStringId}
        onChange={onSampleChange}
      />
    </>
  );
}
