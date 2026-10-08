import * as React from "react";
import { VideoPlayerStyles, VideoStyles } from "./VideoPlayer.css";

export type VideoType = |
  "video/mp4" |
  string;

interface VideoPlayerProps {
  source: string;
  controls?: boolean;
  /**
   * Default "video/mp4"
   */
  videoType?: VideoType;
  containerStyles?: React.CSSProperties;
  videoStyles?: React.CSSProperties;
}
export const VideoPlayer = ({
  source,
  videoType = "video/mp4",
  controls,
  containerStyles,
  videoStyles
}: VideoPlayerProps): React.JSX.Element => {
  return (
    <div style={{ ...VideoPlayerStyles, ...containerStyles }}>
      <video
        controls={controls}
        style={{ ...VideoStyles, ...videoStyles }}
      >
        <source
          src={source}
          type={videoType}
        />
      </video>
    </div>
  )
}