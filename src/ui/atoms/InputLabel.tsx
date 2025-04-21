import { styled } from "@mui/material";

export const InputLabel = styled("label")(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
}));
