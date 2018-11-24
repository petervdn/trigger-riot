import { ISample } from 'sample-manager';

interface IScheduledSample {
  buffer: AudioBufferSourceNode;
  gain: GainNode;
  sample: ISample;
  layerId: string;
  time: number;
}

export class SamplePlayer {
  private latestScheduledTimeByLayer: { [layerId: string]: number } = {};
  private scheduledSamples: IScheduledSample[] = [];

  constructor(private context: AudioContext) {}

  public playSampleAtTime(sample: ISample, layerId: string, time: number, volume = 1): void {
    // console.log('playSampleAtTime', sample.name, time);
    if (
      sample.audioBuffer !== undefined &&
      (this.latestScheduledTimeByLayer[layerId] === undefined ||
        time > this.latestScheduledTimeByLayer[layerId])
    ) {
      // create and init all nodes
      const buffer = this.context.createBufferSource();
      const gain = this.context.createGain();

      buffer.buffer = sample.audioBuffer;
      gain.gain.value = volume;

      buffer.connect(gain);
      gain.connect(this.context.destination);

      // set starttime
      buffer.start(time);

      // store latest time for this layer
      this.latestScheduledTimeByLayer[layerId] = time;

      // add to list
      const scheduledSample = { buffer, gain, sample, layerId, time };
      this.scheduledSamples.push(scheduledSample);

      // when sample ends, remove from list
      buffer.onended = () => {
        const index = this.scheduledSamples.indexOf(scheduledSample);
        if (index > -1) {
          this.scheduledSamples.splice(index, 1);
        }
      };
    }
  }

  public stopAll(): void {
    this.latestScheduledTimeByLayer = {};
    this.scheduledSamples.forEach(sample => sample.buffer.stop());
    this.scheduledSamples = [];
  }
}
