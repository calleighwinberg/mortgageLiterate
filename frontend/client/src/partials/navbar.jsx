import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavbarMain() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <Box>
    <AppBar position="fixed" color="transparent" sx={{ boxShadow: 2, top: 0, // Fixed to the top of the screen
        zIndex: 1300, backgroundColor: '#333', color: '#fff' }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Mortgage Literate
          </Typography>

          <Button
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ marginLeft: 2 }}
          >
            Dropdown
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'dropdown-button',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Action</MenuItem>
            <MenuItem onClick={handleMenuClose}>Another action</MenuItem>
            <MenuItem onClick={handleMenuClose}>Something</MenuItem>
            <MenuItem onClick={handleMenuClose}>Separated link</MenuItem>
          </Menu>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ marginLeft: 'auto' }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/tcas"
          >
            Clients
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/new"
          >
            New Client
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{ marginLeft: 2 }}
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}

export default NavbarMain;
