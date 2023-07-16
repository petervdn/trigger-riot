export async function loadSound(audioContext: AudioContext, fileName: string) {
  const buffer = await fetch(fileName).then((result) => result.arrayBuffer());

  return await audioContext.decodeAudioData(buffer);
}
