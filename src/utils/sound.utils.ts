import { audioContext } from "@/src/sound/audioContext";

export async function loadSound(fileName: string) {
  const buffer = await fetch(fileName).then((result) => result.arrayBuffer());

  return await audioContext.decodeAudioData(buffer);
}
