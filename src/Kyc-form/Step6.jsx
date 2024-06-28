import React from 'react';
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';  // Import the ClipLoader from react-spinners

const Step6 = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className='text-2xl mb-3 font-semibold text-gray-500'>Please Wait</h1>
      <p className='text-center flex flex-col gap-1 w-[60%] '>
        <span className='text-xl mb-4 font-semibold'>
          {message ?
            <div className='flex flex-col justify-center items-center p-4 gap-3'>
              {message}
              <Link to="/" className="text-lg font-semibold hover:bg-gray-300 border-2 uppercase py-1 px-16 bg-gray-200">
                Go to home
              </Link>
            </div>
            :
            <ClipLoader color="#0000FF" loading={true} size={40} />}
        </span>

      </p>
    </div>
  );
};

export default Step6;
