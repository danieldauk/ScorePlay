import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DialogActions, DialogContent, Stack, Typography } from "@mui/material";

import { Button } from "~/ui/atoms/Button";

type Props = {
  onRetry: () => void;
  onCancel: () => void;
};

export const ErrorDialogContent = ({ onCancel, onRetry }: Props) => {
  return (
    <>
      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <ErrorOutlineIcon
            sx={(theme) => ({
              fontSize: theme.typography.h1,
              color: theme.palette.error.main,
            })}
          />
          <Typography variant="h5">
            There was an issue loading social media profiles
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={(theme) => ({
          padding: theme.spacing(3),
        })}
      >
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={onRetry}>
          Try again
        </Button>
      </DialogActions>
    </>
  );
};
