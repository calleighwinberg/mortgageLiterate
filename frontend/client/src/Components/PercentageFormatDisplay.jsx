import React from "react";
import CurrencyFormat from "react-currency-format";

// Forward ref correctly
// CurrencyFormatCustom for Display only (non-editable)
const PercentageFormatDisplay = ({ value }) => {
    return (
      <CurrencyFormat
        value={value || ""}
        displayType={'text'} // Only display as text
        thousandSeparator
        suffix="%"
        decimalScale={3} // Limit to 3 decimal places
        renderText={value => value} // Render the value as plain text
      />
    );
  };
  

export default PercentageFormatDisplay;
