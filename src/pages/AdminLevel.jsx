import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { GiPadlock } from "react-icons/gi";

const Level = () => {
    return (
        <>
            <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'><h1 className='sm:text-2xl font-bold py-3 px-10 uppercase tracking-wider text-white'>Levels</h1></div>

            <div className='w-full flex flex-col lg:flex-row gap-5 px-5 py-12 bg-gray-200 font-semibold'>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-3 w-full lg:w-4/5'>
                    <div className=' rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-blue-400 py-2 rounded-t-md'>1st Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'>50</span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col'>
                        <h1 className='text-center w-full bg-red-400 py-2 rounded-t-md'>2nd Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'>50</span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-yellow-400 py-2 rounded-t-md'>3rd Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'>50</span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-green-400 py-2 rounded-t-md'>4th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'>50</span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-purple-400 py-2 rounded-t-md'>5th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'>50</span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col'>
                        <h1 className='text-center w-full bg-orange-400 py-2 rounded-t-md'>6th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'><GiPadlock className='h-6 w-6' /></span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-lime-400 py-2 rounded-t-md'>7th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'><GiPadlock className='h-6 w-6' /></span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-cyan-400 py-2 rounded-t-md'>8th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'><GiPadlock className='h-6 w-6' /></span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col  '>
                        <h1 className='text-center w-full bg-pink-400 py-2 rounded-t-md'>9th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'><GiPadlock className='h-6 w-6' /></span>
                    </div>
                    <div className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col '>
                        <h1 className='text-center w-full bg-[#66bfbf] py-2 rounded-t-md'>10th Level</h1>
                        <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'><GiPadlock className='h-6 w-6' /></span>
                    </div>
                </div>
                <div className='border-[1px] border-gray-300 rounded-md shadow-md shadow-gray-500 w-full lg:w-1/5 flex flex-col justify-center items-center p-2 py-4  bg-gray-500' style={{color:'greenyellow'}}>
                    <h1 className='text-md font-semibold uppercase text-white'>Total Members</h1>
                    <span className='text-5xl font-bold uppercase'>530</span>
                </div>
            </div>

            <div className='w-full flex flex-col justify-center items-center min-h-screen bg-gray-400 text-white py-20'>
                {/* <h1 className='text-center text-3xl font-bold py-5'>Level Position</h1> */}
                <div className='flex justify-center w-full xl:w-4/5 -mt-10'>
                    <div className='w-1/3 text-center flex flex-col justify-end items-center p-1 md:p-3 gap-2 '>
                        <span className='text-sm md:text-xl font-semibold uppercase sm:shadow-sm sm:shadow-white rounded-md py-2 w-full xl:w-1/2 mb-8 px-2 bg-[#2d4059]'>Level</span>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black' >
                            <h1 className='font-semibold '><span>1st</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <h1 className='font-semibold '><span>2nd</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>3rd</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>4th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>5th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>6th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>7th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>8th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>9th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>10th</span> Level</h1>
                        </div>
                    </div>

                    <div className='w-1/3 text-center flex flex-col justify-centter items-center p-1 md:p-3 gap-2'>
                        <span className='text-sm md:text-xl font-semibold uppercase sm:shadow-sm sm:shadow-white rounded-md py-2 px-2 w-full  mb-8 bg-[#2d4059]'>Status</span>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={100}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={100}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={60}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                        <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                            <ProgressBar
                                completed={0}
                                className='w-full'
                            />
                        </div>
                    </div>


                    <div className='w-1/3 text-center flex flex-col justify-centter items-center p-1 md:p-3 gap-2'>
                        <span className='text-sm md:text-xl font-semibold uppercase sm:shadow-sm sm:shadow-white rounded-md py-2 px-2 w-full xl:w-1/2 mb-8 bg-[#2d4059]'>Income</span>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <h1 className='font-semibold'><span>&#x20B9;</span> 900</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 2700</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 8100</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 24300</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 22900</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 218700</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 656100</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-500 rounded hover:bg-green-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 1968300</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-500 rounded hover:bg-blue-500 shadow-sm shadow-black'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 5904900</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Level;