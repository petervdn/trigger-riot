import { usePlayStore } from "@/src/data/playStore";
import { PlayButton } from "@/src/components/play-button/PlayButton";
import { shallow } from "zustand/shallow";

export function Transport() {
  const { isPlaying, start, stop } = usePlayStore(
    ({ isPlaying, start, stop }) => ({
      isPlaying,
      start,
      stop,
    }),
    shallow
  );

  function onPlayButtonClick() {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }

  return (
    <div style={{ display: "flex", marginTop: 12, marginLeft: 10 }}>
      <PlayButton size={55} isPlaying={isPlaying} onClick={onPlayButtonClick} />
    </div>
  );
}
