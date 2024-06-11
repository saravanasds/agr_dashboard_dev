import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserProvider';
import { GiPadlock } from "react-icons/gi";

const Level = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    // Function to calculate counts for levels
    const calculateLevelCount = (allChildLength) => {
        const levels = new Array(10).fill(0); // Initialize an array for 4 levels with zero count

        if (allChildLength >= 1 && allChildLength <= 3) {
            levels[0] = allChildLength;
        } else if (allChildLength >= 4 && allChildLength <= 12) {
            levels[0] = 3;
            levels[1] = allChildLength - 3;
        } else if (allChildLength >= 13 && allChildLength <= 39) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = allChildLength - 12;
        } else if (allChildLength >= 40 && allChildLength <= 120) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = allChildLength - 39;
        } else if (allChildLength >= 121 && allChildLength <= 363) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = 81;
            levels[4] = allChildLength - 120;
        } else if (allChildLength >= 364 && allChildLength <= 1092) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = 81;
            levels[4] = 243;
            levels[5] = allChildLength - 363;
        } else if (allChildLength >= 1093 && allChildLength <= 3279) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = 81;
            levels[4] = 243;
            levels[5] = 729;
            levels[6] = allChildLength - 1092;
        } else if (allChildLength >= 3280 && allChildLength <= 9840) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = 81;
            levels[4] = 243;
            levels[5] = 729;
            levels[6] = 2187;
            levels[7] = allChildLength - 3279;
        } else if (allChildLength >= 9841 && allChildLength <= 29523) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = 81;
            levels[4] = 243;
            levels[5] = 729;
            levels[6] = 2187;
            levels[7] = 6561;
            levels[8] = allChildLength - 9840;
        } else if (allChildLength >= 29524 && allChildLength <= 88572) {
            levels[0] = 3;
            levels[1] = 9;
            levels[2] = 27;
            levels[3] = 81;
            levels[4] = 243;
            levels[5] = 729;
            levels[6] = 2187;
            levels[7] = 6561;
            levels[8] = 19683;
            levels[9] = allChildLength - 29523; // 59049
        }

        return levels;
    };

    const levelsCount = calculateLevelCount(user?.data?.allChild?.length || 0);

    return (
        <>
            <div className='w-full min-h-screen overflow-y-auto grow flex flex-col justify-start items-center'>
                <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
                    <div><span className='sm:text-2xl font-bold uppercase text-white'>Level</span></div>
                    <div className='border-2 border-black rounded-full'>
                        <img src="src/assets/1679057404284.jpg" alt="" className='w-12 rounded-full border-2' />
                    </div>
                </div>
                <div className='w-full flex flex-col lg:flex-row gap-5 px-5 py-12 bg-gray-200 font-semibold'>
                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 w-full lg:w-4/5'>
                        {levelsCount.map((count, index) => (
                            <div key={index} className='rounded-md shadow-md shadow-gray-500 h-auto flex flex-col'>
                                <h1 className={`text-center w-full py-2 rounded-t-md ${index % 2 === 0 ? 'bg-blue-400' : 'bg-red-400'}`}>Level {index + 1}</h1>
                                <span className='py-3 w-full flex justify-center items-center bg-white rounded-b-md'>
                                    {count > 0 ? count : <GiPadlock className='h-6 w-6' />}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='border-[1px] border-gray-300 rounded-md shadow-md shadow-gray-500 w-full lg:w-1/5 flex flex-col justify-center items-center p-2 py-4 bg-gray-500' style={{ color: 'greenyellow' }}>
                        <h1 className='text-md font-semibold uppercase text-white'>Total Members</h1>
                        <span className='text-5xl font-bold uppercase'>{user?.data?.allChild?.length || 0}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Level;
