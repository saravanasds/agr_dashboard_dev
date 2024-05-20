import React, { useState } from 'react';

function Settings() {
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (secretKey === '123') { // Change 'yourSecretKey' to your actual secret key
      window.location.href = '/adminpanel';
    } else {
      alert('Incorrect secret key. Please try again.');
    }
  };


  const handleChange = (event) => {
    setSecretKey(event.target.value);
  };

  return (
    <>

      <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
        <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Settings</h1>
      </div>
      <div className='w-full flex flex-col justify-center items-center min-h-[90vh] bg-gray-300'>
        {/* <h1>Enter Your Password</h1> */}
        <form onSubmit={handleSubmit} className='w-[90%] sm:w-[80%] lg:w-[50%] flex flex-col justify-center items-center border py-10 gap-5 rounded-xl shadow-lg shadow-gray-600 bg-gray-900'>
          <input
            type="password"
            className="border-2 w-[80%] py-2 px-5 rounded-md border-none outline-none"
            value={secretKey}
            onChange={handleChange}
            placeholder='Enter Your Password'
          />
          <button type="submit" className='w-[80%] bg-green-600 px-6 py-2 rounded-md text-white text-md font-semibold hover:bg-green-500'>Submit</button>
        </form>
      </div>

    </>
  );
}

export default Settings;
