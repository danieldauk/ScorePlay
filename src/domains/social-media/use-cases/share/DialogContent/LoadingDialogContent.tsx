import { CircularProgress, DialogContent, Stack } from "@mui/material";

export const LoadingDialogContent = () => {
  return (
    <DialogContent>
      <Stack spacing={2} alignItems="center" py={5}>
        <CircularProgress size={40} />
      </Stack>
    </DialogContent>
  );
};
