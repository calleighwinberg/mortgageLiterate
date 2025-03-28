import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {
  Box, Button, Card, Collapse, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import { computePrices } from '../../utils/computations';
import SummaryTable from '../Components/SummaryTable';
import PaymentModal from '../Components/PaymentModal';
import ClosingCostsModal from '../Components/ClosingCostsModel';

const Show = () => {
  const [tca, setTCA] = useState();
  const { tcaid } = useParams();
  const navigate = useNavigate();

  const [computedScenarios, setComputedScenarios] = useState([]);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openClosingCostModal, setOpenClosingCostModal] = useState(false);

  const [activeTab, setActiveTab] = useState(null); // 'payment' or 'closingCosts'
  const handleOpenModal = (tab) => setActiveTab(tab);
  const handleCloseModal = () => setActiveTab(null);

  useEffect(() => {
    console.log('getting tca')
    axios.get(`/tcas/${tcaid}`).then((res) => {
      setTCA({ ...res.data.tca });
      console.log('tca fetched', res.data.tca)
    });

  }, [tcaid]);

  useEffect(() => {
    console.log('TCA state updated alone:', tca);  // This will log when the tca state changes
  }, [tca]);

  useEffect(() => {
    // Only compute scenarios if `tca` is not null or undefined
    if (tca) {
      console.log('TCA state updated:', tca);  // Check if tca is available
      console.log('Computing scenarios...');
      const computedPrices = computePrices(tca);
      console.log('Computed prices:', computedPrices);
      setComputedScenarios(computedPrices);
    }
  }, [tca]);  // This effect depends on `tca` so it will run once tca is set

  const onDeleteClick = () => {
    axios.get(`/tcas/${tcaid}/delete`).then((res) => {
      if (res.status === 200) {
        navigate("/tcas");
      }
    });
  };

  return (

    <Box sx={{
      flex: 1,
      p: 3,
      marginTop: '64px', // Push content below navbar
    }}>
      {tca ? (
        <>

          <Grid container spacing={3}>
            {/* User and Author Info */}
            <Grid item xs={12} md={9}>
              <Typography variant="h3">Hi {tca.firstName},</Typography>
              <Typography variant="h5" sx={{ color: '#ff8080' }}>
                {tca.address}
              </Typography>
              <Typography>{tca.description}</Typography>
            </Grid>
            {/* <Grid item xs={12} md={3}>
          <Typography>This report was created for you by</Typography>
          <Typography variant="h6" fontWeight="bold">
            {tca.author.username}
          </Typography>
          <Box display="flex" alignItems="center">
            <i className="bi bi-envelope"></i>
            <Typography>{tca.author.email}</Typography>
          </Box>
        </Grid> */}
          </Grid>

          {/* Summary and Table */}
          <Box sx={{ marginTop: 3 }}>
            <Box display="flex" alignItems="center" sx={{ backgroundColor: '#ff8080', padding: 2 }}>
              <Typography variant="h5" sx={{ color: 'white' }}>Summary</Typography>
              <Button
                variant="contained"
                sx={{ ml: 'auto', borderRadius: '50px', backgroundColor: '#fff', color: '#ff8080' }}
                onClick={() => handleOpenModal('payment')}
              >
                More Info
              </Button>
            </Box>

            {computedScenarios && computedScenarios.length > 0 ? (
              <>
                <SummaryTable tca={tca} computedScenarios={computedScenarios} />
                {activeTab === 'payment' && (
                  <PaymentModal
                    open={true}
                    onClose={handleCloseModal}
                    tca={tca}
                    computedScenarios={computedScenarios}
                    onShowClosingCostModal={() => handleOpenModal('closingCosts')} // Switch tabs
                  />
                )}

                {activeTab === 'closingCosts' && (
                  <ClosingCostsModal
                    open={true}
                    onClose={handleCloseModal}
                    tca={tca}
                    computedScenarios={computedScenarios}
                    onShowPaymentModal={() => handleOpenModal('payment')} // Switch tabs
                  />
                )}
              </>
            ) : (
              <div>Loading...</div>
            )}
          </Box>
          <Typography variant="h4" gutterBottom>
            {tca.firstName}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              color="primary"
              href={`/tcas/${tcaid}/edit`}
              sx={{ mr: 2 }}
            >
              Edit TCA
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteClick}
              sx={{ mr: 2 }}
            >
              Delete TCA
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="/tcas"
            >
              All TCAs
            </Button>
          </Box>



        </>
      ) : (
        <Typography variant="h4" color="textSecondary">
          No Data
        </Typography>
      )}
    </Box>
  );
};

export default Show;
