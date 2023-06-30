import { useInterval } from "usehooks-ts";
import { useState } from "react";
import { soundManager } from "@/src/sound/SoundManager";

export function usePlayTime() {
  const [playTime, setPlayTime] = useState(0);

  useInterval(() => {
    if (playTime !== soundManager.getCurrentTime()) {
      setPlayTime(soundManager.getCurrentTime());
    }
  }, 500);

  return playTime;
}
