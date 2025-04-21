import {
  styled,
  Select as MuiSelect,
  FormControl,
  MenuItem,
  SelectProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useId } from "react";
import { InputBase } from "./Base/InputBase";
import { InputLabel } from "./InputLabel";
import { InputHelperText } from "./InputHelperText";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& :focus": {
    borderRadius: theme.shape.borderRadius * 2,
  },
  "& [aria-expanded=true]": {
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const StyledIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  fill: theme.palette.primary.main,
}));

type Props<T> = {
  value: T;
  label?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
} & Omit<SelectProps<T>, "labelId" | "input" | "IconComponent" | "id">;

export const Select = <T,>({
  label,
  error,
  disabled,
  helperText,
  errorText,
  ...selectProps
}: Props<T>) => {
  const inputId = useId();
  const labelId = useId();

  return (
    <FormControl error={error} disabled={disabled}>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
      <MuiSelect
        {...selectProps}
        IconComponent={StyledIcon}
        id={inputId}
        labelId={labelId}
        input={<StyledInputBase />}
      />
      <InputHelperText>{error ? errorText : helperText}</InputHelperText>
    </FormControl>
  );
};

Select.MenuItem = MenuItem;
