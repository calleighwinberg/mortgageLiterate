import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link as MuiLink,
} from '@mui/material';

const TCAs = () => {
  const [tcas, setTCAs] = useState([]);

  useEffect(() => {
    axios.get('/tcas').then((res) => {
      setTCAs(res.data.tcas);
    });
  }, []);

  return (
    <Box sx={{
        flex: 1,
        p: 3,
        marginTop: '64px', // Push content below navbar
    }}>
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        All TCAs
      </Typography>

      {/* Link to Create New TCA */}
      <Button
        variant="contained"
        color="primary"
        href="/new"
        sx={{ marginBottom: 2 }}
      >
        New TCA
      </Button>

      {/* List of TCAs */}
      {tcas?.length ? (
        <List>
          {tcas.map((tca, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton component="a" href={`/tcas/${tca._id}`}>
                <ListItemText primary={tca.firstName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h6" color="textSecondary">
          No data
        </Typography>
      )}
    </Box>
  );
};

export default TCAs;
