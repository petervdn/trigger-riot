import { useInterval } from "usehooks-ts";
import { usePlayTime } from "@/src/utils/hooks/usePlayTime";
import { useIsPlaying } from "@/src/utils/hooks/useIsPlaying";
import { soundManager } from "@/src/sound/SoundManager";
import { usePlayStore } from "@/src/data/playStore";

export function Transport() {
  const { bpm } = usePlayStore();
  const playTime = usePlayTime();
  const isPlaying = useIsPlaying();

  return (
    <>
      <h2>{playTime.toFixed(1)}</h2>
      <h3>
        {bpm}
        <small>bpm</small>
      </h3>
      <div>
        <button
          onClick={() => {
            if (isPlaying) {
              soundManager.stop();
            } else {
              soundManager.start();
            }
          }}
        >
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </>
  );
}
