import * as React from "react";

interface TitleProps {
  children: string;
}
export const Title = ({ children }: TitleProps): React.JSX.Element =>
  <h2 style={{ width: "75%", color: "crimson", textAlign: "center" }}>{children}</h2>;