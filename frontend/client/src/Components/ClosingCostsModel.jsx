import React from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close' ;
import CurrencyFormatDisplay from './CurrencyFormatDisplay';
import PercentageFormatDisplay from './PercentageFormatDisplay';


const ClosingCostsModal = ({ open, onClose, tca, computedScenarios, onShowPaymentModal }) => {
  const rows = [
    { label: 'Down Payment', key: 'downPayment', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'Loan To Value: ', key: 'ltv', formatter: PercentageFormatDisplay, source: 'computedScenarios' },
    { label: 'Points', key: 'cc.points', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'Title and Escrow', key: 'cc.escrowFees', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'Prepaids', key: 'cc.prepaids', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'Contributions', key: 'cc.contributions', formatter: CurrencyFormatDisplay, source: 'tca' },
    { label: 'APR Fees', key: 'cc.aprCosts', formatter: CurrencyFormatDisplay, source: 'tca' },
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
      <Button onClick={onShowPaymentModal} sx={{
        borderColor: "#ff8080", color: "#ff8080", borderRadius: "8px", borderWidth: "1px"}} variant="outlined">
        Payment Breakdown
      </Button>
      <Button sx={{
        borderColor: "#ff8080", color: "white", borderRadius: "8px", borderWidth: "1px", backgroundColor: "#ff8080"}} variant="outlined">
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
      <Typography variant="h5" sx={{ color: 'white' }}>Closing Costs Breakdown</Typography>
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

export default ClosingCostsModal;