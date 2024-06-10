import React from 'react';
import Header from "../components/Header"

const Wallet = () => {
    return (
        <>
            <div>
                <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
                    <div><span className='sm:text-2xl font-bold uppercase text-white'>Wallet</span></div>
                    <div className='border-2 border-black rounded-full'>
                        <img src="src/assets/1679057404284.jpg" alt="" className='w-12 rounded-full border-2' />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-center py-4">Wallet Section</h1>
                <div className="  flex flex-col justify-around items-center gap-4">
                    {/* Wallet */}
                    <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
                        <h1 className="text-xl font-semibold mb-1">Your Wallet</h1>
                        <div className="my-3">
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Current Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>$ 4000</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Withdraw Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>$ 4000</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Wallet Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>$ 4000</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Breakups */}
                    <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
                        <h1 className="text-xl font-semibold mb-1">Breakups</h1>
                        <div className="my-3">
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Level Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>$---</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Referal Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>$---</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Bonus</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>$---</p></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Wallet;