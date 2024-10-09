import React, { useEffect, useState } from 'react';
import { useParams } from "react-router" ;
import axios from 'axios';

const Show = () => {
    const [tca, setTCA] = useState();
    const {tcaid}  = useParams() ;

    useEffect(() => {
        axios.get(`http://localhost:8080/tcas/${tcaid}`).then((res) => {
            setTCA(res.data.tca) ;
        });
    });

    return (
        <>
        {tca ? <>
            <h1>{tca.firstName}</h1>
            </> : <h1> No Data</h1>
            
        }
        <a href={`/tcas/${tcaid}/edit`}> Edit tca</a>
        <br/>
        <a href="/tcas"> All tcas </a>
        </>
    )
};

export default Show;