export default class AnimationFrame {
  public isRunning: boolean = false;
  private callback: (timeInMs: number) => void;

  constructor(callback: (time: number) => void) {
    this.callback = callback;
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
      this.callback(timeInMs);
      requestAnimationFrame(timeInMs => this.update(timeInMs));
    }
  };
}
