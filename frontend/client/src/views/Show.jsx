import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router" ;
import axios from 'axios';

const Show = () => {
    const [tca, setTCA] = useState();
    const {tcaid}  = useParams() ;
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`/tcas/${tcaid}`).then((res) => {
            setTCA(res.data.tca) ;
        });
    });

    const onDeleteClick = () => {
        axios.get(`/tcas/${tcaid}/delete`).then((res) => {
            if (res.status == 200) {
                navigate("/tcas")
            }
        })
    }

    return (
        <>
        {tca ? <>
            <h1>{tca.firstName}</h1>
            </> : <h1> No Data</h1>
            
        }
        <a href={`/tcas/${tcaid}/edit`}> Edit tca</a>
        <br/>
        <button onClick = {onDeleteClick}> Delete TCA </button>
        <a href="/tcas"> All tcas </a>
        </>
    )
};

export default Show;