import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';

const Show = () => {
  const [tca, setTCA] = useState(null);
  const { tcaid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/tcas/${tcaid}`).then((res) => {
      setTCA(res.data.tca);
    });
  }, [tcaid]);

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
