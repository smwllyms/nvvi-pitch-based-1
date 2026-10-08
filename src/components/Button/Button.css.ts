import { backgroundLinear } from "../../constants/styles"

export const ButtonBaseStyles: React.CSSProperties = {
  padding: "12px 24px",
  background: "rgb(70,70,70)",
  color:"white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  letterSpacing: "0.5px",
  fontWeight: "600",
  fontFamily: "inherit",
  cursor: "pointer"
}

export const ButtonHoverStyles: React.CSSProperties = {
  filter: "brightness(0.7)"
}

export const ButtonDisabledStyles: React.CSSProperties = {
  filter: "opacity(0.7)",
  cursor: "not-allowed"
}