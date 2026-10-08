interface ReportArgs {
  pitch: number;
  confidence: number;
}
export class Report {
  pitch: number;
  /**
   * Confidence of the pitch (normalized [0,1])
   */
  confidence: number;
  constructor(parameters: ReportArgs) {
    this.pitch = parameters.pitch;
    this.confidence = parameters.confidence;
  }
}