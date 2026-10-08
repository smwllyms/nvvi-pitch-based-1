import { backgroundLinear } from "../../constants/styles"

const bgColor = "white"

export const FooterStyles: React.CSSProperties = {
  width: "100%",
  backgroundColor: bgColor,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  padding: "0 15px",
  boxSizing: "border-box",
  boxShadow: "-2px 0 4px black",
  background: backgroundLinear
}