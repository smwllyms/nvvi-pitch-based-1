import * as React from "react";
import { Button } from "../Button/Button";
import { OverlayStyles, DialogStyles } from "./Dialog.css";

interface HelpDialogProps {
  handleClose: () => void;
  content: React.JSX.Element;
}
export const HelpDialog = ({
  handleClose,
  content
}: HelpDialogProps): React.JSX.Element => {
  return (
    <div style={OverlayStyles}>
      <div style={DialogStyles}>
        <div>
          {content}
        </div>
        <div>
          <Button
            label="Close"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  )
}