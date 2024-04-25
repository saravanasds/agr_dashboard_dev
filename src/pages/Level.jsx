import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { GiPadlock } from "react-icons/gi";
import Header from "../components/Header"

const Level = () => {
    return (
        <>
            <div className='w-full min-h-screen overflow-y-auto grow flex flex-col justify-start items-center'>
                <div className='w-full'>
                    <Header />
                </div>
                <div className='w-full flex flex-col justify-center items-center min-h-screen pt-10'>
                    {/* <h1 className='text-center text-3xl font-bold py-5'>Level Position</h1> */}
                    <div className='flex flex-col sm:flex-row justify-center w-full xl:w-4/5  overflow-x-auto' style={{color:'greenyellow'}}>
                        <div className='w-full text-center flex flex-col justify-end items-center p-1 md:p-3 gap-3 '>
                            {/* <span className='text-2xl font-semibold'>Level</span> */}

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black rounded-md' >
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-800 black rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>1st</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={50}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-800 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black  rounded-md'>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-orange-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>2nd</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={10}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-gray-600 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black rounded-md' >
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>1st</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={60}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-800 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black  rounded-md'>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-orange-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>2nd</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-gray-600 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black rounded-md' >
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>1st</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-800 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black  rounded-md'>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-orange-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>2nd</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-gray-600 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black rounded-md' >
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>1st</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-800 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black  rounded-md'>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-orange-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>2nd</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-gray-600 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black rounded-md' >
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-green-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>1st</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-blue-800 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 sm:mb-0 p-2 border border-black  rounded-md'>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-orange-800 rounded hover:bg-blue-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>2nd</span> Level</h1>
                                </div>
                                <div className='w-full py-3 h-12 rounded px-3 flex items-center border-2 xl:border-none'>
                                    <ProgressBar
                                        completed={100}
                                        className='w-full'
                                    />
                                </div>
                                <div className='w-full xl:w-1/2 py-3 h-12 flex items-center justify-center bg-gray-600 rounded hover:bg-green-500' style={{border:'1px solid greenyellow'}}>
                                    <h1 className='font-semibold'><span>&#x20B9;</span> 1500</h1>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Level;