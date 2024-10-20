import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TCAs = () => {
    const [tcas, setTCAs] = useState([])

    useEffect(() => {
        axios.get("/tcas").then((res) => {
            setTCAs(res.data.tcas) ;
        }) ;
    }, []) ;

    return (
        <>
        <h1>All TCAs</h1>
        <a href="/new"> New tca </a>
        <ul>
            {tcas?.length ? (
                tcas.map((tca, idx) => <li key={idx}>
                    <a href={`/tcas/${tca._id}`}>{tca.firstName}</a> </li>)
            ): <h2>No data</h2>}
        </ul>


        
        </>
      )
}

export default TCAs