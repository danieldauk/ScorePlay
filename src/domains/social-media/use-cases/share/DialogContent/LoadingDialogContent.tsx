import { Box, CircularProgress, DialogContent } from "@mui/material";

export const LoadingDialogContent = () => {
  return (
    <DialogContent>
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress size={40} />
      </Box>
    </DialogContent>
  );
};
