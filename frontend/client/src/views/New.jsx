import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Box, Container, TextField, Button } from '@mui/material';

const New = () => {
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
 
        const tca = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            address: formData.get("address"),
            description: formData.get("description"),
            scenarios: [
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } },
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } },
            { name: "", price: 0, downPayment: 0, rate: 0, term: 0, cc: { aprCosts: 0, points: 0, escrowFees: 0, noAPRcosts: 0, contribution: 0 }, mc: { hoa: 0, hazIns: 0, taxes: 0, pmi: 0 } }
        ]
        };
        console.log(tca);
        await axios.post("/tcas/new", tca).then((res) => {
            navigate(`/tcas/${res.data}/edit`)
            console.log(res.data);
        });

    };

    const ClientForm = () => (
        <>
            <TextField
                label="First Name"
                name="firstName"
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Description"
                name="description"
                defaultValue='Below is your personal Total Cost Analysis for your home loan. Thank you for partnering with our team.'
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                Save
            </Button>
        </>
    );

    return (
        <>
            <Container>
                {/* Ensure the content is pushed below the navbar */}
                <div className="content-container">
                    <Box sx={{ display: "flex", flex: 1 }}>
                        <Box sx={{
                            flex: 1,
                            p: 3,
                            marginTop: '64px', // Push content below navbar
                        }}>
                            <form onSubmit={onFormSubmit}>
                                <ClientForm />
                            </form>
                        </Box>
                    </Box>
                </div>
            </Container>
        </>
    );
};

export default New;