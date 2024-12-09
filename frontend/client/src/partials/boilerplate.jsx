import React from "react";
import { Outlet } from "react-router";
import NavbarMain from "./navbar";
import { Box } from '@mui/material';


const Boilerplate = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <NavbarMain />
            
                <Outlet />
            
        </Box>
    ) ;
} ;

export default Boilerplate