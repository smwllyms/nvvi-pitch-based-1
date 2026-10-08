const WEIGHT = 1.0;

function round(num, places) {
  let pow10 = Math.pow(10, places);
  return Math.round(num * pow10) / pow10;
}

interface SessionParameters {
  initialPitch: number;
  weight?: number;
}
export class Session {
  initialPitch: number;
  lastPitch: number;
  deltaPitch: number;
  deltaPitchHz: number;
  currentOffsetHz: number = 0;
  currentOffset: number = 0;
  weight: number;

  constructor(parameters: SessionParameters) {
    // The initiale pitch (in Hz, all in Hz)
    this.initialPitch = parameters.initialPitch;
    // The current pitch offset
    this.currentOffsetHz = 0;
    this.currentOffset = 0;
    // The last pitch before current
    this.lastPitch = parameters.initialPitch;
    // The difference between the current pitch and the last pitch
    this.deltaPitchHz = 0;
    this.deltaPitch = 0;

    this.weight = parameters.weight || WEIGHT;
  }

  update(newPitch, weight) {
    this.currentOffsetHz = round(newPitch - this.initialPitch, 2);
    this.deltaPitchHz = round(newPitch - this.lastPitch, 2);

    if (weight === undefined) {
      weight = 1.0;
    }

    this.currentOffset = round(weight * 12 * Math.log2(newPitch / this.initialPitch), 2);
    this.deltaPitch = round(weight * 12 * Math.log2(newPitch / this.lastPitch), 2);

    this.lastPitch = newPitch;
  }

}
