import { TabButtons } from "@/src/components/tab-buttons/TabButtons";
import { useMiscStore } from "@/src/data/miscStore";

export function SidebarModeSelect() {
  const { sidebarMode, setSidebarMode, sidebarModes } = useMiscStore(
    (state) => ({
      sidebarMode: state.sidebarMode,
      sidebarModes: state.sidebarModes,
      setSidebarMode: state.setSidebarMode,
    })
  );

  return (
    <TabButtons
      inactiveBgColor={"#EEE"}
      activeBgColor={"#AAA"}
      options={sidebarModes}
      value={sidebarMode}
      onChange={(value) => setSidebarMode(value as any)}
      fillSpace={true}
    />
  );
}
