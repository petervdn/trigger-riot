export default class AnimationFrame {
  public isRunning: boolean = false;
  private callbacks: ((timeInMs: number) => void)[] = [];

  constructor(callback?: (time: number) => void) {
    if (callback) {
      this.addCallback(callback);
    }
  }
  addCallback(callback: (time: number) => void): void {
    this.callbacks.push(callback);
  }

  public start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.update(performance.now());
  }

  public stop() {
    this.isRunning = false;
  }
  update = (timeInMs: number) => {
    if (this.isRunning) {
      for (let i = 0; i < this.callbacks.length; i += 1) {
        this.callbacks[i](timeInMs);
      }
      requestAnimationFrame(timeInMs => this.update(timeInMs));
    }
  };
}
