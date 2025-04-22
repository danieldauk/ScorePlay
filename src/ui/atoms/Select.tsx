import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  styled,
} from "@mui/material";
import { useId } from "react";

import { InputBase } from "./Base/InputBase";
import { InputHelperText } from "./InputHelperText";
import { InputLabel } from "./InputLabel";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& [aria-expanded=true]": {
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: theme.palette.primary.main,
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
  const helperTextId = useId();

  return (
    <FormControl error={error} disabled={disabled}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        {...selectProps}
        IconComponent={StyledIcon}
        id={inputId}
        labelId={labelId}
        aria-describedby={helperTextId}
        input={<StyledInputBase />}
      />
      <InputHelperText id={helperTextId}>
        {error ? errorText : helperText}
      </InputHelperText>
    </FormControl>
  );
};

Select.MenuItem = MenuItem;
