

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Sidebar.css';


// Sidebar.js
import React, { useState } from 'react';
import { Nav, Button, Collapse } from 'react-bootstrap';

const Sidebar = ({ tca, onSelection }) => {
    // State to control collapsible sections
    const [openP1, setOpenP1] = useState(false);
    const [openP2, setOpenP2] = useState(false);
    const [openP3, setOpenP3] = useState(false);

    return (
        <div className="bg-dark min-vh-100 d-flex flex-column p-3 text-light" style={{ width: '200px' }}>

            {/* Sidebar Header */}
            <div className="mb-4">
                <div className="fs-5">This presentation is for</div>
                <p className="fw-bold">{tca.firstName} {tca.lastName}</p>
            </div>

            {/* Sidebar Menu */}
            <Nav className="flex-column" variant="pills">
                <Nav.Link onClick={() => onSelection("client")} className="text-light">
                    <i className="bi bi-person-fill"></i>
                    <span className="fs-4 ms-3 d-none d-sm-inline">Client</span>
                </Nav.Link>

                {/* Product 1 */}
                <Button
                    onClick={() => {
                        onSelection("product1-main"); // Trigger main form display for Product 1
                        setOpenP1(!openP1); // Toggle dropdown visibility
                        setOpenP2(false)
                        setOpenP3(false)
                    }}
                    aria-controls="p1-collapse"
                    aria-expanded={openP1}
                    className="text-start w-100 text-light"
                    variant="link"
                >
                    <i className="bi bi-file-earmark-text"></i>
                    <span className="fs-4 ms-3">Product 1</span>
                    <i className="bi bi-caret-down-fill float-end"></i>
                </Button>
                <Collapse in={openP1}>
                    <div id="p1-collapse">
                        <Nav className="flex-column ms-3">
                            <Button variant="link" className="text-light text-start w-100" onClick={() => onSelection("product1-closingCosts")}>
                                Closing Costs
                            </Button>
                            <Button variant="link" className="text-light text-start w-100" onClick={() => onSelection("product1-monthlyCosts")}>
                                Monthly Costs
                            </Button>
                        </Nav>
                    </div>
                </Collapse>

                {/* Product 2 */}
                <Button
                    onClick={() => {
                        onSelection("product2-main"); // Trigger main form display for Product 2
                        setOpenP2(!openP2)
                        setOpenP1(false)
                        setOpenP3(false)
                    
                    }}
                    aria-controls="p2-collapse"
                    aria-expanded={openP2}
                    className="text-start w-100 text-light"
                    variant="link"
                >
                    <i className="bi bi-file-earmark-text"></i>
                    <span className="fs-4 ms-3">Product 2</span>
                    <i className="bi bi-caret-down-fill float-end"></i>
                </Button>
                <Collapse in={openP2}>
                    <div id="p2-collapse">
                        <Nav className="flex-column ms-3">
                            <Button variant="link" className="text-light text-start w-100" onClick={() => onSelection("product2-closingCosts")}>
                                Closing Costs
                            </Button>
                            <Button variant="link" className="text-light text-start w-100" onClick={() => onSelection("product2-monthlyCosts")}>
                                Monthly Costs
                            </Button>
                        </Nav>
                    </div>
                </Collapse>

                {/* Product 3 */}
                <Button
                    onClick={() => {
                        onSelection("product3-main"); // Trigger main form display for Product 3
                        setOpenP3(!openP3)
                        setOpenP1(false)
                        setOpenP2(false)
                    }}
                    aria-controls="p3-collapse"
                    aria-expanded={openP3}
                    className="text-start w-100 text-light"
                    variant="link"
                >
                    <i className="bi bi-file-earmark-text"></i>
                    <span className="fs-4 ms-3">Product 3</span>
                    <i className="bi bi-caret-down-fill float-end"></i>
                </Button>
                <Collapse in={openP3}>
                    <div id="p3-collapse">
                        <Nav className="flex-column ms-3">
                            <Button variant="link" className="text-light text-start w-100" onClick={() => onSelection("product3-closingCosts")}>
                                Closing Costs
                            </Button>
                            <Button variant="link" className="text-light text-start w-100" onClick={() => onSelection("product3-monthlyCosts")}>
                                Monthly Costs
                            </Button>
                        </Nav>
                    </div>
                </Collapse>

                {/* Presentation View */}
                <Nav.Link onClick={() => onSelection("presentationView")} className="text-light">
                    <i className="bi bi-easel"></i>
                    <span className="fs-4 ms-3 d-none d-sm-inline">Presentation View</span>
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;

