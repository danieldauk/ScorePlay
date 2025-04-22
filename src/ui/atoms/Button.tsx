import {
  Button as MuiButton,
  ButtonProps,
  lighten,
  styled,
} from "@mui/material";

const ButtonBase = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius * 4,
  paddingBlock: theme.spacing(0.5),
  paddingInline: theme.spacing(2),
  color: theme.palette.text.primary,
  "&.MuiButton-contained": {
    backgroundColor: lighten(theme.palette.primary.main, 0.5),
  },

  boxShadow: "none",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:focus": {
    outline: `1px solid ${theme.palette.primary.main}`,
  },
  "&:disabled": {
    opacity: 0.8,
  },
  transition: "transform 0.1s",
}));

export const Button = ({ ...props }: ButtonProps) => {
  return <ButtonBase {...props} disableFocusRipple disableElevation />;
};
