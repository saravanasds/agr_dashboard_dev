import React from 'react';
import { Link } from "react-router-dom";

const Step6 = ({ prevStep }) => {
    return (
        <>
            <div className="mx-auto w-full flex justify-center items-center p-3">
                <div className="bg-white w-full lg:w-3/4 pt-4 pb-4 mb-2 ">
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h2 className='text-3xl font-bold text-green-500 mb-10'>Your details has been submited successfull</h2>
                        <Link to={'/login'}>
                            ok
                        </Link>
                    </div>
                    <div className='w-full flex justify-center items-center gap-3'>
                        <button onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step6;
