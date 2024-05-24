import React from 'react'
import { Link } from "react-router-dom";

const Step6 = () => {
  return (
    <div>
      <h1 className='text-2xl mb-3 font-semibold'>Please Check Your Email Account For Email Verification</h1>
      <p className='text-center flex flex-col'>
        <span className='text-lg'>Go to Login Page, After Email Verification</span>
        <Link to="/userLogin" className="font-semibold hover:underline">
          Click Here
        </Link>
      </p>
    </div>
  )
}

export default Step6