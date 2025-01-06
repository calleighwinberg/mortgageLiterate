import React from "react";
import CurrencyFormat from "react-currency-format";

// Forward ref correctly
// CurrencyFormatCustom for Display only (non-editable)
const CurrencyFormatDisplay = ({ value }) => {
    return (
      <CurrencyFormat
        value={value || ""}
        displayType={'text'} // Only display as text
        thousandSeparator
        prefix="$"
        renderText={value => value} // Render the value as plain text
      />
    );
  };
  

export default CurrencyFormatDisplay;