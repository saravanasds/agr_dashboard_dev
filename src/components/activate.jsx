import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Activate() {
  const { activationToken } = useParams(); // Get the activation token from the URL parameters
  const [activationStatus, setActivationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await axios.post('https://api.agrpremiumplan.in/api/auth/activate/activateUserEmail', {
          activationToken: activationToken
        });

        const data = response.data;

        setActivationStatus(data.message);
      } catch (error) {
        setError('Please try again later.');
      }
    };

    if (activationToken) {
      activateUser();
    }
  }, [activationToken]);

  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
      {activationStatus ? (
        <h1 className='text-center text-3xl font-semibold'>{activationStatus} <br /><span className='text-xl'> Your Account is Underprocessing.</span></h1>
      ) : (
        <h1>Activating your account...</h1>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Activate;
