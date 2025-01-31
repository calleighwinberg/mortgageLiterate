import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import CurrencyFormatDisplay from './CurrencyFormatDisplay';
import PercentageFormatDisplay from './PercentageFormatDisplay';

const PaymentModal = ({ open, onClose, tca, computedScenarios, onShowClosingCostModal }) => {
    const rows = [
        { label: 'Purchase Price', key: 'price', formatter: CurrencyFormatDisplay, source: 'tca' },
        { label: 'Loan Amount', key: 'loan', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
        { label: 'Interest Rate', key: 'rate', formatter: PercentageFormatDisplay, source: 'tca' },
        { label: 'Term (months)', key: 'term', formatter: null, source: 'tca' },
        { label: 'PI', key: 'piPayment', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
        { label: 'piti', key: 'piti', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
        { label: 'Points', key: 'points', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
  
        { label: 'Cash to Close', key: 'ctc', formatter: CurrencyFormatDisplay, source: 'computedScenarios' },
        { label: 'Taxes', key: 'taxes', formatter: CurrencyFormatDisplay, source: 'tca' },
      ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
          <DialogTitle>{tca.firstName || "Default Title"}</DialogTitle>
          <DialogContent>
            <Typography>
              { "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum."}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained">
              Close
            </Button>
            <Button onClick={onShowClosingCostModal} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );

}

export default PaymentModal;