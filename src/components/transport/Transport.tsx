import { useInterval } from "usehooks-ts";
import { usePlayTime } from "@/src/utils/hooks/usePlayTime";
import { useIsPlaying } from "@/src/utils/hooks/useIsPlaying";
import { soundManager } from "@/src/sound/SoundManager";
import { usePlayStore } from "@/src/data/playStore";
import { PlayButton } from "@/src/components/play-button/PlayButton";

export function Transport() {
  const { bpm } = usePlayStore();
  const playTime = usePlayTime();
  const isPlaying = useIsPlaying();

  function onPlayButtonClick() {
    if (isPlaying) {
      soundManager.stop();
    } else {
      soundManager.start();
    }
  }

  return (
    <div style={{ display: "flex", marginTop: 12, marginLeft: 10 }}>
      <PlayButton size={55} isPlaying={isPlaying} onClick={onPlayButtonClick} />
      <p>{playTime.toFixed(1)}</p>
    </div>
  );
}
