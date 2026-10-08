import * as React from "react";
import { Icon } from "../Icon/Icon";
import { NvviPitchControllerState } from "../../nvvi-tool";
import { useInterval } from "../../utils/useInterval";
import { IconStyles, NvviToolStyles } from "./NvviTool.css";

enum NvviToolStatus {
  ON = "ON",
  OFF = "OFF"
}

interface NvviToolProps {
  getNvviToolState: () => NvviPitchControllerState;
}
export const NvviTool = ({ getNvviToolState }: NvviToolProps): React.JSX.Element => {

  const [status, setStatus] = React.useState<NvviToolStatus>(NvviToolStatus.OFF);
  const [toolIconName, setToolIconName] = React.useState<string>("highlight_off");
  const [detectedPitch, setDetectedPitch] = React.useState<number | null>(null);
  const [deltaPitch, setDeltaPitch] = React.useState<number | null>(null);

  const onInterval = (): boolean => {
    const state = getNvviToolState();
    if (!state) return true;
    const isOn = !state.transientSilence;
    setStatus(isOn ? NvviToolStatus.ON : NvviToolStatus.OFF);
    setDetectedPitch(state.inSession ? state.pitchInfo.pitch : null);
    setDeltaPitch(state.session?.currentOffsetHz);
    setToolIconName(isOn ? "hearing" : "highlight_off");
    if (state.shutdown) {
      return false;
    }
    return true;
  }
  useInterval({ callback: onInterval, initialStart: true, intervalRateInMs: 100 });

  return (
    <div style={NvviToolStyles}>
      <span>NVVI</span>
      <span>{status === NvviToolStatus.OFF ? "Off" : "Listening..."}</span>
      <Icon iconName={toolIconName} style={IconStyles} />
      <span>{detectedPitch ? `${detectedPitch} Hz | ${deltaPitch}` : ""}</span>
    </div>
  )
}