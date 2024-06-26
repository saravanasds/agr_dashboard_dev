import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/UserProvider';

const Wallet = () => {
    const { user, setUser } = useContext(UserContext);
    const [singleUser, setSingleUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

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
                        body: JSON.stringify({ email: user?.data?.email })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setSingleUser(data?.data);
                        console.log(data);
                    } else {
                        console.error('Failed to fetch user data');
                        setError('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        if (user) {
            fetchSingleUser();
        }
    }, [user]);

    if (loading) {
        return <div className='w-full h-[100vh] text-2xl font-semibold'>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const profilePhoto = user ? user.data.photo : '';

    return (
        <>
            <div>
                <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
                    <div><span className='sm:text-2xl font-bold uppercase text-white'>Wallet</span></div>
                    <div className='rounded-full flex justify-center items-center'>
                        {user && <img src={profilePhoto} alt="" className='rounded-full border-2 h-12 w-12 object-cover' />}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-around items-center mt-16 gap-4">
                    <div className="border-2 border-gray-400 w-[95%] md:w-[70%] p-2 md:p-5 bg-white rounded-md">
                        <h1 className="text-xl font-semibold mb-1">Current Balance</h1>
                        <div className="my-3">
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Level Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {singleUser?.availableLevelIncome}</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Referral Income</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md text-xl"><p>&#x20B9; {singleUser?.availableReferralIncome}</p></div>
                            </div>
                            <div className="flex justify-center items-center w-full hover:bg-gray-200 p-2 rounded-md">
                                <div className="w-1/2"><h1 className="text-md sm:text-lg">Total Balance</h1></div>
                                <div className="w-1/2 h-full bg-gray-200 hover:bg-white px-2 py-1 rounded-md"><p>&#x20B9; {singleUser?.availableLevelIncome + singleUser?.availableReferralIncome}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wallet;
