import { Switch as MuiSwitch, switchClasses, SwitchProps } from "@mui/material";

type Props = SwitchProps;

export const Switch = ({ ...props }: Props) => {
  return (
    <MuiSwitch
      {...props}
      sx={(theme) => ({
        p: 0,
        height: "24px",
        width: "50px",
        borderRadius: 3,
        [`& .${switchClasses.switchBase}`]: {
          height: "100%",
          px: "3px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          [`&.${switchClasses.checked}`]: {
            transform: "translateX(25px)",
            [`& .${switchClasses.thumb}`]: {
              backgroundColor: "white",
            },
            [`& +.${switchClasses.track}`]: {
              opacity: 1,
            },
          },
        },
        [`& .${switchClasses.thumb}`]: {
          height: "19px",
          width: "19px",
          boxShadow: "none",
        },
        [`& .${switchClasses.track}`]: {
          backgroundColor: theme.palette.primary.main,
        },
      })}
    />
  );
};
