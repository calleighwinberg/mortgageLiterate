import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import { useNavigate, useParams } from "react-router";
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import Sidebar from '../partials/sidebar';
import ClientForm from '../Components/ClientForm';
import CurrencyFormatCustom from '../Components/CurrencyFormatCustom';
import PercentageFormatCustom from '../Components/PercentageFormatCustom';

const Edit = () => {
    const [tca, setTCA] = useState({
        firstName: "",
        lastName: "",
        address: "",
        description: "",
        scenarios: [
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } },
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } },
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } }
        ]
    });
    const [selectedForm, setSelectedForm] = useState("");
    const { tcaid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/tcas/${tcaid}`).then((res) => {
            console.log("Fetched TCA data:", res.data.tca);
            setTCA(res.data.tca);
        });
    }, [tcaid]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post(`/tcas/${tcaid}/edit`, tca)
            .then(() => {
                console.log("Data saved successfully");
            })
            .catch((err) => console.error("Error saving data:", err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedTCA = { ...tca };
        setNestedValue(updatedTCA, name, value);
        setTCA(updatedTCA);
    };

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

    const renderClientForm = () => (
        <>
        <ClientForm tca={tca} handleInputChange={handleInputChange}/>
        </>
    );

    const renderProductMainForm = (index) => (
        <>
            <Typography variant="h6" gutterBottom>
                Product {index + 1} Details
            </Typography>
            <TextField
                label="Name"
                name={`scenarios.${index}.name`}
                value={tca?.scenarios[index]?.name || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name={`scenarios.${index}.price`}
                value={tca?.scenarios[index]?.price === 0 ? "" : tca?.scenarios[index]?.price}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Down Payment"
                name={`scenarios.${index}.downPayment`}
                value={tca?.scenarios[index]?.downPayment === 0 ? "" : tca?.scenarios[index]?.downPayment}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Rate"
                name={`scenarios.${index}.rate`}
                value={tca?.scenarios[index]?.rate ? tca?.scenarios[index]?.rate : ""}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: PercentageFormatCustom,
                }}
            />
            <TextField
                label="Term"
                type="number"
                name={`scenarios.${index}.term`}
                value={tca?.scenarios[index]?.term === 0 ? "" : tca?.scenarios[index]?.term}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                Save Product Info
            </Button>
        </>
    );

    const renderClosingCostsForm = (index) => (
        <>
            <Typography variant="h6" gutterBottom>
                Closing Costs for Product {index + 1}
            </Typography>
            <TextField
                label="APR Costs"
                name={`scenarios.${index}.cc.aprCosts`}
                value={tca?.scenarios[index]?.cc?.aprCosts === 0 ? "" : tca?.scenarios[index]?.cc?.aprCosts}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Points"
                name={`scenarios.${index}.cc.points`}
                value={tca?.scenarios[index]?.cc?.points ? tca?.scenarios[index]?.cc?.points : ""}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: PercentageFormatCustom,
                }}
            />
            <TextField
                label="Escrow Fees"
                name={`scenarios.${index}.cc.escrowFees`}
                value={tca?.scenarios[index]?.cc?.escrowFees === 0 ? "" : tca?.scenarios[index]?.cc?.escrowFees}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Contributions"
                name={`scenarios.${index}.cc.contribution`}
                value={tca?.scenarios[index]?.cc?.contribution === 0 ? "" : tca?.scenarios[index]?.cc?.contribution}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                Save Closing Costs
            </Button>
        </>
    );

    const renderMonthlyCostsForm = (index) => (
        <>
            <Typography variant="h6" gutterBottom>
                Monthly Costs for Product {index + 1}
            </Typography>
            <TextField
                label="HOA"
                name={`scenarios.${index}.mc.hoa`}
                value={tca?.scenarios[index]?.mc?.hoa === 0 ? "" : tca?.scenarios[index]?.mc?.hoa}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Taxes"
                name={`scenarios.${index}.mc.taxes`}
                value={tca?.scenarios[index]?.mc?.taxes === 0 ? "" : tca?.scenarios[index]?.mc?.taxes}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Hazard Insurance"
                name={`scenarios.${index}.mc.hazIns`}
                value={tca?.scenarios[index]?.mc?.hazIns === 0 ? "" : tca?.scenarios[index]?.mc?.hazIns}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <TextField
                label="Mortgage Insurance"
                name={`scenarios.${index}.mc.pmi`}
                value={tca?.scenarios[index]?.mc?.hazIns === 0 ? "" : tca?.scenarios[index]?.mc?.pmi}
                onChange={handleInputChange}
                onBlur={(e) => {
                    if (!e.target.value) handleInputChange({ target: { name: e.target.name, value: 0 } });
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    inputComponent: CurrencyFormatCustom,
                }}
            />
            <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                Save Monthly Costs
            </Button>
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
        <Container>
            {/* Ensure the content is pushed below the navbar */}
            <div className="content-container">
                <Box sx={{ display: "flex", flex: 1 }}>
                    <Sidebar tca={tca} onSelection={setSelectedForm} />
                    <Box sx={{
                        flex: 1,
                        p: 3,
                        marginTop: '64px', // Push content below navbar
                    }}>
                        <form onSubmit={onFormSubmit}>
                            {renderFormContent()}
                        </form>
                    </Box>
                </Box>
            </div>
        </Container>
    );
};

export default Edit;
