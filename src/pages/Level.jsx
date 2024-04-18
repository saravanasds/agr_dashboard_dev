import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { GiPadlock } from "react-icons/gi";
import Header from "../components/Header"

const Level = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='w-full flex flex-col justify-center items-center min-h-screen'>
                {/* <h1 className='text-center text-3xl font-bold py-5'>Level Position</h1> */}
                <div className='flex justify-center w-full xl:w-4/5 -mt-10'>
                    <div className='w-1/3 text-center flex flex-col justify-end items-center p-1 md:p-3 gap-2 '>
                        <span className='text-2xl font-semibold'>Level</span>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <h1 className='font-semibold'><span>1st</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <h1 className='font-semibold'><span>2nd</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>3rd</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>4th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>5th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>6th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>7th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>8th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>9th</span> Level</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>10th</span> Level</h1>
                        </div>
                    </div>

                    <div className='w-1/3 text-center flex flex-col justify-centter items-center p-1 md:p-3 gap-2'>
                        <span className='text-2xl font-semibold'>Status</span>
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
                        <span className='text-2xl font-semibold'>Income</span>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <h1 className='font-semibold'><span>&#x20B9;</span> 900</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 2700</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 8100</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 24300</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 22900</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 218700</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 656100</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-400 rounded hover:bg-green-500'>
                            <GiPadlock className='h-6 w-6 mr-2' />
                            <h1 className='font-semibold'><span>&#x20B9;</span> 1968300</h1>
                        </div>
                        <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-400 rounded hover:bg-blue-500'>
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