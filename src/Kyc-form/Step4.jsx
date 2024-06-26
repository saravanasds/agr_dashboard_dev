import React from 'react';
import "react-toastify/dist/ReactToastify.css";

const Step4 = ({ nextStep, prevStep }) => {


    return (
        <>
            <div className="mx-auto w-full flex justify-center items-center min-h-screen flex-col p-3">

                <div className="flex flex-col md:flex-row justify-center mb-4 border-2 ">
                    <img
                        src="assets/agr-qr.jpeg"
                        alt="Sample QR Code"
                        className="w-90"
                    />
                    <div className='border-2 p-10 text-left leading-10'>
                        <h1 className='text-2xl font-bold text-gray-800 mb-8'>Account Details</h1>
                        <span><span className='font-bold mr-3'>Name:</span>G.Ramamoorthi</span><br />
                        <span><span className='font-bold mr-3'>Bank:</span>City Union Bank</span><br />
                        <span><span className='font-bold mr-3'>Ac.no:</span>500101012417848</span><br />
                        <span><span className='font-bold mr-3'>Branch:</span> Palani</span><br />
                        <span><span className='font-bold mr-3'>IFSC Code:</span>CUB0000321</span><br />
                        <span><span className='font-bold mr-3'>Gpay Number:</span>7418618828</span>
                    </div>
                </div>

                <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3'>
                    <button onClick={prevStep} className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                    <button onClick={nextStep} className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Next</button>
                </div>

            </div>
        </>
    );
};

export default Step4;
