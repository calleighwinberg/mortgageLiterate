import React from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, keyframes } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close' ;
import CurrencyFormatDisplay from './CurrencyFormatDisplay';
import PercentageFormatDisplay from './PercentageFormatDisplay';


const PaymentModal = ({ open, onClose, tca, computedScenarios, onShowClosingCostModal }) => {
  const rows = [
    { label: 'Purchase Price', key: 'price', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'P&I', key: 'piPayment', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
    { label: 'Hazard Insurance', key: 'mc.hazIns', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'Taxes', key: 'mc.taxes', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'PMI', key: 'mc.pmi', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'HOA Fees', key: 'mc.hoa', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'Monthly Payment', key: 'piti', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
  ];

  const getNestedValue = (scenario, key) => 
    key.split('.').reduce((result, next) => result && result[next], scenario);


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
  <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {/* Dialog Actions - Aligned */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {/* Left-aligned "Closing Costs" Button */}
      <Box display="flex" gap={2}>
      <Button sx={{
        borderColor: "#ff8080", color: "white", borderRadius: "8px", borderWidth: "1px", backgroundColor: "#ff8080"}} variant="outlined">
        Payment Breakdown
      </Button>
      <Button onClick={onShowClosingCostModal} sx={{
        borderColor: "#ff8080", color: "#ff8080", borderRadius: "8px", borderWidth: "1px"}} variant="outlined">
        Closing Costs
      </Button>
      </Box>

      {/* Right-aligned "X" Close Button */}
      <IconButton onClick={onClose} color="primary">
        <CloseIcon />
      </IconButton>
    </Box>
    {/* Title Section */}
    <Box display="flex" alignItems="center" sx={{ backgroundColor: 'black', padding: 1, borderRadius: 1 }}>
      <Typography variant="h5" sx={{ color: 'white' }}>Payment breakdown</Typography>
    </Box>

    {/* Table Section */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="summary table">
        <TableHead>
          <TableRow>
            <TableCell />
            {tca.scenarios.map((scenario, index) => (
              <TableCell key={index}>{scenario.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ label, key, formatter: Formatter, source }) => (
            <TableRow key={key}>
              <TableCell>{label}</TableCell>
              {tca.scenarios.map((_, index) => {
                const value = source === 'tca' 
                ? getNestedValue(tca.scenarios[index], key)
                : getNestedValue(computedScenarios[index], key);
                return (
                  <TableCell key={index}>
                    {Formatter ? <Formatter value={value} /> : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </DialogContent>
</Dialog>

  );

}

export default PaymentModal;