import * as React from "react";
import { BlurbStyles } from "./Blurb.css";

interface BlurbProps {
  children: string | Array<React.JSX.Element> | React.JSX.Element;
}
export const Blurb = ({
  children
}: BlurbProps): React.JSX.Element => {

  return (
    <div style={BlurbStyles}>{children}</div>
  )
}