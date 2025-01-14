import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore, Person, Description, ViewQuilt } from '@mui/icons-material';

const Sidebar = ({ tca, onSelection }) => {
  const [openP1, setOpenP1] = useState(false);
  const [openP2, setOpenP2] = useState(false);
  const [openP3, setOpenP3] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (setSection, otherSections) => {
    setSection((prev) => !prev);
    otherSections.forEach((setOther) => setOther(false));
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        marginTop: '64px',
        height: 'calc(100vh - 64px)',
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#333', color: '#fff', top: "64px", // Same as above to align Drawer paper
          },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">This presentation is for</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {tca.firstName} {tca.lastName}
        </Typography>
      </Box>

      <List>
        {/* Client Section */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => onSelection('client')}>
            <Person sx={{ mr: 2 }} />
            <ListItemText primary="Client" />
          </ListItemButton>
        </ListItem>

        {/* Product 1 */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            onSelection("product1-main");
            handleToggle(setOpenP1, [setOpenP2, setOpenP3])
            }}>
            <Description sx={{ mr: 2 }} />
            <ListItemText primary={tca?.scenarios[0]?.name || "Product 1"} />
            {openP1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openP1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => onSelection('product1-closingCosts')}>
              <ListItemText primary="Closing Costs" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => onSelection('product1-monthlyCosts')}>
              <ListItemText primary="Monthly Costs" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Product 2 */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            onSelection("product2-main");
            handleToggle(setOpenP2, [setOpenP1, setOpenP3])
            }}>
            <Description sx={{ mr: 2 }} />
            <ListItemText primary={tca?.scenarios[1]?.name || "Product 1"} />
            {openP2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openP2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => onSelection('product2-closingCosts')}>
              <ListItemText primary="Closing Costs" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => onSelection('product2-monthlyCosts')}>
              <ListItemText primary="Monthly Costs" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Product 3 */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            onSelection("product3-main");
            handleToggle(setOpenP3, [setOpenP1, setOpenP2])
          }}>
            <Description sx={{ mr: 2 }} />
            <ListItemText primary={tca?.scenarios[2]?.name || "Product 1"} />
            {openP3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openP3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => onSelection('product3-closingCosts')}>
              <ListItemText primary="Closing Costs" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => onSelection('product3-monthlyCosts')}>
              <ListItemText primary="Monthly Costs" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Presentation View */}
        <ListItem disablePadding>
        <ListItemButton onClick={() => navigate(`/tcas/${tca._id}`)}>
            <ViewQuilt sx={{ mr: 2 }} />
            <ListItemText primary="Presentation View" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
