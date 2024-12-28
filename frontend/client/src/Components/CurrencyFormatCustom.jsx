import React from "react";
import CurrencyFormat from "react-currency-format";
import { TextField } from "@mui/material";

// Forward ref correctly
const CurrencyFormatCustom = React.forwardRef(function CurrencyFormatCustom(
  { onChange, name, value, ...other },
  ref
) {
  return (
    <CurrencyFormat
      {...other}
      ref={ref} // Forward ref to the input element
      value={value || ""} // Ensure the value is blank by default (avoiding 0 placeholder)
      thousandSeparator
      prefix="$"
      allowNegative={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value, // Pass the raw numeric value
          },
        });
      }}
    />
  );
});

export default CurrencyFormatCustom;
