import React from 'react'
import { useParams } from 'react-router-dom';

function activate() {

    const { activationToken } = useParams();

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <h1>Activate Account</h1>
            <p>Activation Token: {activationToken}</p>
        </div>
    )
}

export default activate