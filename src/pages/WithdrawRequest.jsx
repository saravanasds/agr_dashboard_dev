import React from 'react';
import Header from "../components/Header"



const WithdrawRequest = () => {


    return (
        <>
            <div>
                <Header />
            </div>

            <div className="w-[90%] sm:w-[80%] mx-auto mt-8">
                <div className='py-10'>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Withdraw Request</h1>
                    <form className='flex flex-col lg:flex-row justify-between items-center border-2 p-4 rounded-lg gap-3'>
                        <label htmlFor="" className='w-full lg:w-auto text-md font-semibold'>Withdrawable Amount:</label>
                        <input type="text" Value={'INR-2500.00'} className='w-full lg:w-1/3 border-2 p-2 rounded-lg'/>
                        <button type='submit' className='w-full lg:w-auto p-2 px-4 rounded-lg bg-green-700 text-white'>Send request</button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default WithdrawRequest;
