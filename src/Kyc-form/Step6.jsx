import React from 'react';
import { Link } from "react-router-dom";


const Step6 = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className='text-2xl mb-3 font-semibold'>Please Wait</h1>
      <p className='text-center flex flex-col gap-1 w-[60%] '>
        <span className='text-md mb-4'><span className='font-bold'>Note: </span>{message ? message : "Loading..."} </span>
        <Link to="/userLogin" className="font-semibold hover:underline border-2 py-1 bg-gray-200">
          Click Here
        </Link>
      </p>
    </div>
  );
};

export default Step6;
