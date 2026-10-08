import * as React from "react";

export type StyledProps<T extends React.ElementType> = {
  elemType?: T;
  hoverStyle?: React.CSSProperties;
  focusStyle?: React.CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<T>, "elemType">;

export const Styled = <T extends React.ElementType,>({
  elemType,
  hoverStyle,
  focusStyle,
  ...rest
}: StyledProps<T>): React.JSX.Element => {

  const Elem = elemType || "div";

  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const styles: React.CSSProperties = {
    ...rest.style,
    ...isHovered && hoverStyle ? hoverStyle : {},
    ...isFocused && focusStyle ? focusStyle : {}
  }

  return (
    <Elem
      {...rest}
      style={styles}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  )
}