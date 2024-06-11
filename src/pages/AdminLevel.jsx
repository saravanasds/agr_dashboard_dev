import React from 'react';
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

           
        </>
    );
};

export default Level;