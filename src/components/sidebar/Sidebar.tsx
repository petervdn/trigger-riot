import { SidebarModeSelect } from "@/src/components/sidebar-mode-select/SidebarModeSelect";
import { Settings } from "@/src/components/settings/Settings";
import { useMiscStore } from "@/src/data/miscStore";
import { GroupContent } from "@/src/components/sidebar/content/GroupContent";
import { AboutContent } from "@/src/components/sidebar/content/AboutContent";
import { SoundContent } from "@/src/components/sidebar/content/SoundContent";
import { ShareContent } from "@/src/components/sidebar/content/ShareContent";
import { SettingsContent } from "@/src/components/sidebar/content/SettingsContent";

export function Sidebar() {
  const sidebarMode = useMiscStore((state) => state.sidebarMode);

  return (
    <>
      <SidebarModeSelect />

      {sidebarMode === "group" && <GroupContent />}
      {sidebarMode === "about" && <AboutContent />}
      {sidebarMode === "sound" && <SoundContent />}
      {sidebarMode === "share" && <ShareContent />}
      {sidebarMode === "settings" && <SettingsContent />}
    </>
  );
}
