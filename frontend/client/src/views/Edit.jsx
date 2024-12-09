import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router";
import { Container, Row, Col } from 'react-bootstrap'; 
import Sidebar from '../partials/sidebar';

const Edit = () => {
    const [tca, setTCA] = useState({
        firstName: "",
        lastName: "",
        address: "",
        description: "",
        scenarios: [
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 }},
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 }},
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 }}
        ]
    });
    const [selectedForm, setSelectedForm] = useState("")
    const { tcaid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        //fewtch tca data
        axios.get(`/tcas/${tcaid}`).then((res) => {
            console.log("Fetched TCA data:", res.data.tca);
            setTCA(res.data.tca);
        });
    }, [tcaid]); //dependency array to avoid rerunning on each render


        // Handle form submission to save data
        const onFormSubmit = (e) => {
            e.preventDefault(); // Prevent the default form submission behavior
    
            axios.post(`/tcas/${tcaid}/edit`, tca)
                .then(() => {
                    console.log("Data saved successfully");
                    // Optionally, navigate to another page or show a success message
                })
                .catch((err) => console.error("Error saving data:", err));
        };
    

            // Handle input change for controlled inputs, including nested fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedTCA = { ...tca };
        setNestedValue(updatedTCA, name, value);
        setTCA(updatedTCA);
    };

    // Helper to set nested values dynamically based on the `name` path
    const setNestedValue = (obj, path, value) => {
        const keys = path.split('.');
        keys.reduce((acc, key, i) => {
            if (i === keys.length - 1) {
                acc[key] = value;
            } else {
                acc[key] = acc[key] || {};
            }
            return acc[key];
        }, obj);
    };

  

    // Helper functions for specific forms

    const renderClientForm = () => (
        <>
            <div className="mb-3">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input className="form-control" type="text" id="firstName" name="firstName" value={tca?.firstName || ""} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input className="form-control" type="text" id="lastName" name="lastName" value={tca?.lastName || ""} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="address">Address</label>
                <input className="form-control" type="text" id="address" name="address" value={tca?.address || ""} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <input className="form-control" type="text" id="description" name="description" value={tca?.description || ""} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-success">Save Client Info</button>
        </>
    );


    const renderProductMainForm = (index) => (
        <>
            <h5>Product {index + 1} Details</h5>
            <div className="mb-3">
                <label className="form-label" htmlFor={`name-${index}`}>Name</label>
                <input className="form-control" type="text" id={`name-${index}`} name={`scenarios.${index}.name`} value={tca?.scenarios[index]?.name || ""} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor={`price-${index}`}>Price</label>
                <input className="form-control" type="number" id={`price-${index}`} name={`scenarios.${index}.price`} value={tca?.scenarios[index]?.price || 0} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor={`downPayment-${index}`}>Down Payment</label>
                <input className="form-control" type="number" id={`downPayment-${index}`} name={`scenarios.${index}.downPayment`} value={tca?.scenarios[index]?.downPayment || 0}  onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor={`rate-${index}`}>Rate</label>
                <input className="form-control" type="number" id={`rate-${index}`} name={`scenarios.${index}.rate`} aria-valuenow={tca?.scenarios[index]?.rate || 0}  onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor={`term-${index}`}>Term</label>
                <input className="form-control" type="number" id={`term-${index}`} name={`scenarios.${index}.term`} value={tca?.scenarios[index]?.term || 0}  onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-success">Save Client Info</button>
        </>
    );
    
    
    const renderClosingCostsForm = (index) => (
        <>
            <h5>Closing Costs for Product {index + 1}</h5>
            <div className="mb-3">
                <label className="form-label" htmlFor={`aprCosts-${index}`}>APR Costs</label>
                <input className="form-control" type="number" id={`aprCosts-${index}`} name={`scenarios.${index}.cc.aprCosts`} value={tca?.scenarios[index]?.cc?.aprCosts || 0} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor={`points-${index}`}>Points</label>
                <input className="form-control" type="number" id={`points-${index}`} name={`scenarios.${index}.cc.points`} value={tca?.scenarios[index]?.cc?.points || 0} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor={`escrowFees-${index}`}> Escrow Fees </label>
                <input className="form-control" type="number" id={`escrowFees-${index}`} name={`scenarios.${index}.cc.escrowFees`} value={tca?.scenarios[index]?.cc?.escrowFees || 0}  onChange={handleInputChange} />
            </div>

            <button type="submit" className="btn btn-success">Save Client Info</button>

            {/* Additional closing costs fields here */}
        </>
    );
    
    const renderMonthlyCostsForm = (index) => (
        <>
            <h5>Monthly Costs for Product {index + 1}</h5>
            <div className="mb-3">
                <label className="form-label" htmlFor={`hoa-${index}`}>HOA</label>
                <input className="form-control" type="number" id={`hoa-${index}`} name={`scenarios.${index}.mc.hoa`} value={tca?.scenarios[index]?.mc?.hoa || 0}  onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-success">Save Client Info</button>
            {/* Additional monthly costs fields here */}
        </>
    );


    const renderFormContent = () => {
        switch (selectedForm) {
            case "client":
                return renderClientForm();
            case "product1-main":
                return renderProductMainForm(0);
            case "product1-closingCosts":
                return renderClosingCostsForm(0);
            case "product1-monthlyCosts":
                return renderMonthlyCostsForm(0);
            case "product2-main":
                return renderProductMainForm(1);
            case "product2-closingCosts":
                return renderClosingCostsForm(1);
            case "product2-monthlyCosts":
                return renderMonthlyCostsForm(1);
            case "product3-main":
                return renderProductMainForm(2);
            case "product3-closingCosts":
                return renderClosingCostsForm(2);
            case "product3-monthlyCosts":
                return renderMonthlyCostsForm(2);
            case "presentationView":
                return <p>Presentation view content here</p>;
            default:
                return renderClientForm();
        }
    };  
    

    return (
        <>
            <Container fluid>
                <Row>
                    {/* Sidebar Column */}
                    <Col md="auto" className="p-0">
                   
                        {tca && <Sidebar tca={tca} onSelection={setSelectedForm} />}
                        </Col>

                
                    {/* Main Content Column */}
                    <Col style={{padding: '30px' }}>
                        <form onSubmit={onFormSubmit}>
                            {renderFormContent()}

                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Edit;