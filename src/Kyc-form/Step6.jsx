import React from 'react'
import { Link } from "react-router-dom";

const Step6 = () => {
  return (
    <div>
      <h1 className='text-2xl mb-3 font-semibold'>Please Check Your Email Account For Email Verification</h1>
      <p className='text-center flex flex-col gap-1'>
        <span className='text-md'>Go to Login Page, After Email Verification</span>
        <Link to="/userLogin" className="font-semibold hover:underline border-2 py-1 bg-gray-200">
          Click Here
        </Link>
      </p>
    </div>
  )
}

export default Step6