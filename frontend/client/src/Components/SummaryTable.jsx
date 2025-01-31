import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CurrencyFormatDisplay from './CurrencyFormatDisplay';
import PercentageFormatDisplay from './PercentageFormatDisplay';

const SummaryTable = ({ tca, computedScenarios }) => {
    console.log("tca passed to SummaryTable:", tca);

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
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                const value = source === 'tca' ? tca.scenarios[index][key] : computedScenarios[index][key];
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
  );
};

export default SummaryTable;
