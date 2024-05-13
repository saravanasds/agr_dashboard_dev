import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Activate() {
    const { activationToken } = useParams();
    const [activationStatus, setActivationStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const activateUser = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/auth/activate/:activationToken', {
                    activationToken: activationToken
                });
                setActivationStatus(response.data.message);
            } catch (error) {
                setError('Activation failed. Please try again.');
            }
        };

        activateUser();
    }, [activationToken]);

    return (
        <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
            {activationStatus ? (
                <h1>{activationStatus}</h1>
            ) : (
                <h1>Activating your account...</h1>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Activate;
