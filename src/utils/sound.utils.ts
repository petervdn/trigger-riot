export async function loadSound(fileName: string, audioContext: AudioContext) {
  const buffer = await fetch(fileName).then((result) => result.arrayBuffer());

  return await audioContext.decodeAudioData(buffer);
}
