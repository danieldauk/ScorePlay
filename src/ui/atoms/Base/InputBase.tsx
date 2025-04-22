import {
  InputBase as MuiInputBase,
  InputBaseProps as MuiInputBaseProps,
  lighten,
  styled,
} from "@mui/material";

export type InputBaseProps = MuiInputBaseProps;

export const InputBase = styled(MuiInputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius * 2,
    position: "relative",
    backgroundColor: lighten(theme.palette.secondary.main, 0.7),
    border: "1px solid",
    borderColor: lighten(theme.palette.primary.main, 0.8),
    padding: theme.spacing(1),
    "&:focus": {
      outline: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius * 2,
    },
    "&[aria-invalid=true]": {
      borderColor: theme.palette.error.main,
      outlineColor: theme.palette.error.main,
    },
    "&:disabled": {
      opacity: 0.5,
    },
  },
}));
