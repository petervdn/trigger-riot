import { useEffect, useState } from "react";
import { soundManager, SoundManagerEvent } from "@/src/sound/SoundManager";

export function useIsPlaying() {
  const [isPlaying, setIsPlaying] = useState(soundManager.getIsPlaying());
  useEffect(() => {
    const onStart = () => {
      setIsPlaying(true);
    };
    const onStop = () => {
      setIsPlaying(false);
    };
    soundManager.addEventListener(SoundManagerEvent.types.START, onStart);
    soundManager.addEventListener(SoundManagerEvent.types.STOP, onStop);

    return () => {
      soundManager.removeEventListener(SoundManagerEvent.types.START, onStart);
      soundManager.removeEventListener(SoundManagerEvent.types.STOP, onStop);
    };
  });

  return isPlaying;
}
