import { SidebarModeSelect } from "@/src/components/sidebar-mode-select/SidebarModeSelect";
import { useMiscStore } from "@/src/data/miscStore";
import { RandomContent } from "@/src/components/sidebar/content/RandomContent";
import { AboutContent } from "@/src/components/sidebar/content/AboutContent";
import { SoundsContent } from "@/src/components/sidebar/content/SoundsContent";
import { HelpContent } from "@/src/components/sidebar/content/HelpContent";
import { SettingsContent } from "@/src/components/sidebar/content/SettingsContent";

export function Sidebar() {
  const sidebarMode = useMiscStore((state) => state.sidebarMode);

  return (
    <>
      <SidebarModeSelect />

      {sidebarMode === "random" && <RandomContent />}
      {sidebarMode === "about" && <AboutContent />}
      {sidebarMode === "sounds" && <SoundsContent />}
      {sidebarMode === "help" && <HelpContent />}
      {sidebarMode === "settings" && <SettingsContent />}
    </>
  );
}
