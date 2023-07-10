import { useInterval } from "usehooks-ts";
import { useState } from "react";
import { usePlayStore } from "@/src/data/playStore";

export function usePlayTime() {
  const [playTime, setPlayTime] = useState(0);
  const getCurrentTime = usePlayStore((state) => state.getCurrentTime);

  useInterval(() => {
    const playTime = getCurrentTime();
    if (playTime) {
      setPlayTime(playTime);
    }
  }, 0);

  return playTime;
}
