import { FormControl } from "@mui/material";
import { useId } from "react";

import { InputBase, InputBaseProps } from "./Base/InputBase";
import { InputHelperText } from "./InputHelperText";
import { InputLabel } from "./InputLabel";

type Props = {
  label?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
} & Omit<InputBaseProps, "id">;

export const Input = ({
  label,
  error,
  disabled,
  helperText,
  errorText,
  ...inputProps
}: Props) => {
  const inputId = useId();
  const helperTextId = useId();

  return (
    <FormControl error={error} disabled={disabled}>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
      <InputBase
        slotProps={{
          input: {
            id: inputId,
          },
        }}
        aria-describedby={helperTextId}
        {...inputProps}
      />
      <InputHelperText id={helperTextId}>
        {error ? errorText : helperText}
      </InputHelperText>
    </FormControl>
  );
};
