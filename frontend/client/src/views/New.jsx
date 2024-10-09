import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { useNavigate } from 'react-router';

const New = () => {
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        e.preventDefault()
        const tca = {
            firstName: e.target[0].value, 
            lastName: e.target[1].value,
            address: e.target[2].value,
            description: e.target[3].value
        } ;
        console.log(tca) ;
        await axios.post("http://localhost:8080/tcas/new", tca).then((res) => {
            navigate(`/tcas/${res.data}`)
            console.log(res.data) ;
        });

    };

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">First Name</label>
                    <input className="form-control" type="text" id="firstName" name="firstName" required />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Last Name</label>
                    <input className="form-control" type="text" id="lastName" name="lastName" required />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Address</label>
                    <input className="form-control" type="text" id="address" name="address" required />
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
        </>
    );
};

export default New;