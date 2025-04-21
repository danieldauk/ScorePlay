import { Dialog, DialogTitle, IconButton, alpha } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { DialogContent } from "./DialogContent";

type Props = {
  onClose: () => void;
};

export const ShareDialog = ({ onClose }: Props) => {
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: { borderRadius: 3, boxShadow: "none" },
        },
        backdrop: {
          sx: (theme) => ({
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
          }),
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
        }}
      >
        <span>Share to Social Media</span>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent onShared={onClose} onCancel={onClose} />
    </Dialog>
  );
};
