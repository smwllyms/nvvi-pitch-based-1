import * as React from "react";
import { IconStyles, IconWrapperStyles } from "./Icon.css";

interface IconProps {
  iconName: string;
  style?: React.CSSProperties;
}
export const Icon = ({
  iconName,
  style
}: IconProps): React.JSX.Element => {
  return (
    <div style={{ ...IconWrapperStyles, ...style}}>
      <i
        style={IconStyles}
        className="material-icons"
      >
        {iconName}
      </i>
    </div>
  )
}