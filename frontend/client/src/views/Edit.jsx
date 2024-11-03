import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router";
import { Container, Row, Col } from 'react-bootstrap'; 
import Sidebar from '../partials/sidebar';

const Edit = () => {
    const [tca, setTCA] = useState(undefined);
    const { tcaid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        //fewtch tca data
        axios.get(`/tcas/${tcaid}`).then((res) => {
            setTCA(res.data.tca);
        });
    }, [tcaid]); //dependency array to avoid rerunning on each render


    const onFormSubmit = async (e) => {
        e.preventDefault()
        const tca = {
            firstName: e.target[0].value,
            lastName: e.target[1].value,
            address: e.target[2].value,
            description: e.target[3].value
        };
        console.log(tca);
        await axios.post(`/tcas/${tcaid}/edit`, tca).then((res) => {
            console.log(res.data);
            navigate(`/tcas/${res.data}`)

        });

    };

    return (
        <>
            <Container fluid>
                <Row>
                    {/* Sidebar Column */}
                    <Col md="auto" className="p-0">
                   
                        {tca && <Sidebar tca={tca} />}
                        </Col>
                
                    {/* Main Content Column */}
                    <Col style={{padding: '30px' }}>
                        <form onSubmit={onFormSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">First Name</label>
                                <input className="form-control" type="text" id="firstName" name="firstName" defaultValue={tca?.firstName || ""} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Last Name</label>
                                <input className="form-control" type="text" id="lastName" name="lastName" defaultValue={tca?.lastName || ""} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Address</label>
                                <input className="form-control" type="text" id="address" name="address" defaultValue={tca?.address || ""} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" type="text" id="description" name="tcadescription"
                                    cols="30" rows="5" defaultValue='Below is your personal Total Cost Analysis for your home loan. Thank you for partnering with our team.'
                                    required></textarea>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success"> Save </button>
                            </div>
                        </form>
                        <a href="/tcas"> All TCAS </a>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Edit;