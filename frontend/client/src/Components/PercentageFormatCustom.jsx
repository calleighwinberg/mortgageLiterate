import React from "react";
import CurrencyFormat from "react-currency-format";
import { TextField } from "@mui/material";

const PercentageFormatCustom = React.forwardRef(function PercentageFormatCustom(
    { onChange, name, value, ...other },
ref
  ) {
    return (
        <CurrencyFormat
            {...other}
            ref={ref} // Forward ref to the input element
            value={value || ""} // Ensure the value is blank by default (avoiding 0 placeholder)
            thousandSeparator
            suffix="%"
            allowNegative={false}
            decimalScale={3} // Limit to 3 decimal places
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

export default PercentageFormatCustom;
