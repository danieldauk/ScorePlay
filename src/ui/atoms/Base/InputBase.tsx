import {
  styled,
  InputBase as MuiInputBase,
  InputBaseProps as MuiInputBaseProps,
} from "@mui/material";

export type InputBaseProps = MuiInputBaseProps;

export const InputBase = styled(MuiInputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius * 2,
    position: "relative",
    backgroundColor: "#F3F6F9",
    border: "1px solid",
    borderColor: "#E0E3E7",
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
