import React from "react";
import { Outlet } from "react-router";
import NavbarMain from "./navbar";
import Sidebar from './sidebar' ;

const Boilerplate = () => {
    return (
        <div >
            <NavbarMain />
            
                <Outlet />
            
        </div>
    ) ;
} ;

export default Boilerplate