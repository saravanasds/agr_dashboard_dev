import React from 'react';
import { Link } from "react-router-dom";
import { Oval } from 'react-loader-spinner';

const Step6 = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className='text-2xl mb-3 font-semibold'>Please Wait</h1>
      {message ? (
        <p className='text-center flex flex-col gap-1 w-[60%] '>
          <span className='text-md mb-4'><span className='font-bold'>Note: </span>{message}</span>
          <Link to="/userLogin" className="font-semibold hover:underline border-2 py-1 bg-gray-200">
            Click Here
          </Link>
        </p>
      ) : (
        <div className="flex justify-center items-center">
          <Oval
            height={60}
            width={60}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
};

export default Step6;
