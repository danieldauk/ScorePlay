import { Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { DialogContent } from "./DialogContent";

type Props = {
  onClose: () => void;
};

// TODO: implement
export const ShareDialog = ({ onClose }: Props) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Share to Social Media</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent onShared={onClose} onCancel={onClose} />
    </Dialog>
  );
};
