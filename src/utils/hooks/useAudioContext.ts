import { useEffect, useState } from "react";

export function useAudioContext() {
  const [audioContext, setAudioContext] = useState<AudioContext>();

  useEffect(() => {
    setAudioContext(
      new (window.AudioContext || (window as any).webkitAudioContext)()
    );
  }, []);

  return audioContext;
}
