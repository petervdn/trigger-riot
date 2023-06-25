import { useInterval } from "usehooks-ts";
import { useState } from "react";
import { soundManager } from "@/src/sound/SoundManager";

export function usePlayTime() {
  const [playTime, setPlayTime] = useState(0);

  useInterval(() => {
    setPlayTime(soundManager.getCurrentTime());
  }, 0);

  return playTime;
}
