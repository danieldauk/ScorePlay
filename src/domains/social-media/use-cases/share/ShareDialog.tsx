import CloseIcon from "@mui/icons-material/Close";
import { alpha,Dialog, DialogTitle, IconButton } from "@mui/material";

import { DialogContent } from "./DialogContent";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ShareDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
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
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: theme.typography.fontWeightBold,
          backgroundColor: theme.palette.secondary.main,
          mb: 3,
        })}
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
