import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CurrencyFormatDisplay from './CurrencyFormatDisplay';
import PercentageFormatDisplay from './PercentageFormatDisplay';

const SummaryTable = ({ tca, computedScenarios }) => {
    console.log("tca passed to SummaryTable:", tca);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="summary table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{tca.scenarios[0].name}</TableCell>
            <TableCell>{tca.scenarios[1].name}</TableCell>
            <TableCell>{tca.scenarios[2].name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Purchase Price</TableCell>
            <TableCell><CurrencyFormatDisplay value={tca.scenarios[0].price} /></TableCell>
            <TableCell><CurrencyFormatDisplay value={tca.scenarios[1].price} /></TableCell>
            <TableCell><CurrencyFormatDisplay value={tca.scenarios[2].price} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Loan Amount</TableCell>
            <TableCell>{computedScenarios[0].loan}</TableCell>
            <TableCell>{computedScenarios[1].loan}</TableCell>
            <TableCell>{computedScenarios[2].loan}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Interest Rate</TableCell>
            <TableCell><PercentageFormatDisplay value={tca.scenarios[0].rate} /></TableCell>
            <TableCell><PercentageFormatDisplay value={tca.scenarios[1].rate} /></TableCell>
            <TableCell><PercentageFormatDisplay value={tca.scenarios[2].rate} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Term (months)</TableCell>
            <TableCell>{tca.scenarios[0].term}</TableCell>
            <TableCell>{tca.scenarios[1].term}</TableCell>
            <TableCell>{tca.scenarios[2].term}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>PI</TableCell>
            <TableCell><CurrencyFormatDisplay value={computedScenarios[0].piti} /></TableCell>
            <TableCell><CurrencyFormatDisplay value={computedScenarios[1].piPayment} /></TableCell>
            <TableCell><CurrencyFormatDisplay value={computedScenarios[2].piPayment} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
