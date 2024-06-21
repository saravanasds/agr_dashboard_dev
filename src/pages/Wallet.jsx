import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/UserProvider';


const Wallet = () => {
    const { user, setUser } = useContext(UserContext);
    const [singleUser, setSingleUser] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    const email = user?.data?.email

    useEffect(() => {
        const fetchSingleUser = async () => {
            const token = localStorage.getItem('token');
            if (user && token) {
                try {
                    const response = await fetch('https://agr-backend-m85q.onrender.com/api/auth/userData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({email})
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setSingleUser(data.data);
                    } else {
                        console.error('Failed to fetch notifications');
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };
        fetchSingleUser();
    }, [user]);

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
                <div className="  flex flex-col justify-around items-center mt-16 gap-4">
                    {/* Wallet */}
                    <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
                        <h1 className="text-xl font-semibold mb-1">Current Balance</h1>
                        <div className="my-3">
                           
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Level Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {singleUser?.availableLevelIncome}</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Referal Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {singleUser?.availableReferralIncome}</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>&#x20B9; {singleUser?.amount-5000}</p></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wallet;