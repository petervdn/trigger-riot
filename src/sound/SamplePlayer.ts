import { Sample } from "@/src/data/sampleStore";

interface IScheduledSample {
  bufferSourceNode: AudioBufferSourceNode;
  gain: GainNode;
  sample: Sample;
  layerId: string;
  time: number;
}

export class SamplePlayer {
  private latestScheduledTimeByLayer: { [layerId: string]: number } = {};
  private scheduledSamples: IScheduledSample[] = [];

  constructor(private context: AudioContext) {}

  public playSampleAtTime(
    sample: Sample,
    layerId: string,
    time: number,
    volume = 1
  ): void {
    if (
      sample.audioBuffer !== undefined &&
      (this.latestScheduledTimeByLayer[layerId] === undefined ||
        time > this.latestScheduledTimeByLayer[layerId])
    ) {
      // create and init all nodes
      const bufferSourceNode = this.context.createBufferSource();
      const gain = this.context.createGain();

      bufferSourceNode.buffer = sample.audioBuffer;
      gain.gain.value = volume;

      bufferSourceNode.connect(gain);
      gain.connect(this.context.destination);

      // set start time
      bufferSourceNode.start(time);

      // store latest time for this layer
      this.latestScheduledTimeByLayer[layerId] = time;

      // add to list
      const scheduledSample = { bufferSourceNode, gain, sample, layerId, time };
      this.scheduledSamples.push(scheduledSample);

      // when sample ends, remove from list
      bufferSourceNode.onended = () => {
        const index = this.scheduledSamples.indexOf(scheduledSample);
        if (index > -1) {
          this.scheduledSamples.splice(index, 1);
        }
      };
    }
  }

  public stopAll(): void {
    this.latestScheduledTimeByLayer = {};
    this.scheduledSamples.forEach((sample) => sample.bufferSourceNode.stop());
    this.scheduledSamples = [];
  }
}
