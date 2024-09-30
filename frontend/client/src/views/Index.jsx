import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TCAs = () => {
    const [tcas, setTCAs] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/tcas").then((res) => {
            setTCAs(res.data.tcas) ;
        }) ;
    }, []) ;

    return (
        <>
        <h1>All TCAs</h1>
        <ul>
            {tcas?.length ? (
                tcas.map((tca, idx) => <li key={idx}>tca.firstName</li>)
            ): <h2>No data</h2>}
        </ul>
        
        </>
      )
}

export default TCAs