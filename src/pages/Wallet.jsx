import React from 'react';
import Header from "../components/Header"

const Wallet = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-center py-4">Wallet Section</h1>
                <div className="  flex justify-around">
                    {/* Wallet */}
                    <div className="border-2 border-black w-[40%] p-2 bg-white rounded-xl">
                        <h1 className="text-xl font-bold mb-1">Your Wallet</h1>
                        <div className="my-3">
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-lg">Current Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>$ 4000</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-lg">Withdraw Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>$ 4000</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-lg">Wallet Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>$ 4000</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Breakups */}
                    <div className="border-2 border-black w-[40%] p-2 bg-white rounded-xl">
                        <h1 className="text-xl font-bold mb-1">Breakups</h1>
                        <div className="my-3">
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-lg">Level Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>$---</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-lg">Referal Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>$---</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-lg">Bonus</h1></div>
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