import React, { useContext, useEffect, useState } from 'react';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { SiMoneygram } from "react-icons/si";
import { BsFilePersonFill } from "react-icons/bs";
import { UserContext } from '../components/UserProvider';

const Dashboard = () => {
    const { user, setUser } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
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
                    const response = await fetch('http://localhost:9000/api/auth/userData', {
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

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            if (user && token) {
                try {
                    const response = await fetch('http://localhost:9000/api/auth/notification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setNotifications(data.data);
                    } else {
                        console.error('Failed to fetch notifications');
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };
        fetchNotifications();
    }, [user]);

    if (!user) {
        return <div>Loading...</div>; // Show loading or redirect to login if no user data is available
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
      };

    return (
        <div className='w-full min-h-screen overflow-y-auto grow flex flex-col justify-start items-center'>
            <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
                <div><span className='sm:text-2xl font-bold uppercase text-white'>Your Level : {singleUser?.level}</span></div>
                <div className='border-2 border-black rounded-full'>
                    <img src="src/assets/1679057404284.jpg" alt="" className='w-12 rounded-full border-2' />
                </div>
            </div>

            <div className='w-full flex flex-col xl:flex-row justify-center items-start'>
                <div className='w-full gap-4 grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 px-3 lg:px-14 py-6 min-h-[300px]'>

                    <div className='bg-green-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-sm shadow-gray-800'>
                        <div>
                            <p className='text-md sm:text-xl font-semibold'>Member Id</p>
                            <p className='text-md sm:text-md font-semibold text-center text-gray-500'>{singleUser?.referralId}</p>
                        </div>
                        <div><BsFilePersonFill className='text-[30px] md:text-[45px] opacity-80' /></div>
                    </div>
                    <div className='bg-red-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-sm shadow-gray-800'>
                        <div>
                            <p className='text-md sm:text-xl font-semibold'>Downline Members</p>
                            <p className='text-xl sm:text-2xl font-semibold text-center'>{singleUser?.allChild.length}</p>
                        </div>
                        <div><MdGroups className='text-[40px] md:text-[65px] opacity-80' /></div>
                    </div>
                    <div className='bg-[#66bfbf] rounded-lg py-5 flex justify-around items-center px-4 shadow-sm shadow-gray-800'>
                        <div>
                            <p className='text-md sm:text-xl font-semibold'>Referral Members</p>
                            <p className='text-xl sm:text-2xl font-semibold text-center'>{singleUser?.referredPeoples.length}</p>
                        </div>
                        <div><BsPersonFillAdd className='text-[40px] md:text-[65px] opacity-80' /></div>
                    </div>
                    <div className='bg-blue-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-sm shadow-gray-800'>
                        <div>
                            <p className='text-md sm:text-xl font-semibold'>Total Earning</p>
                            <p className='text-xl sm:text-2xl font-semibold text-center'> &#x20B9; {singleUser?.amount - 5000}</p>
                        </div>
                        <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80' /></div>
                    </div>
                    <div className='bg-[#fce38a] rounded-lg py-5 flex justify-around items-center px-4 shadow-sm shadow-gray-800'>
                        <div>
                            <p className='text-md sm:text-xl font-semibold'>Level Income</p>
                            <p className='text-xl sm:text-2xl font-semibold text-center'> &#x20B9; {singleUser?.availableLevelIncome}</p>
                        </div>
                        <div><BiMoneyWithdraw className='text-[40px] md:text-[65px] opacity-80' /></div>
                    </div>

                    <div className='bg-[#93a7d1] rounded-lg py-5 flex justify-around items-center px-4 shadow-sm shadow-gray-800'>
                        <div>
                            <p className='text-md sm:text-xl font-semibold'>Referral Income</p>
                            <p className='text-xl sm:text-2xl font-semibold text-center'> &#x20B9; {singleUser?.availableReferralIncome}</p>
                        </div>
                        <div><SiMoneygram className='text-[40px] md:text-[65px] opacity-80' /></div>
                    </div>
                </div>

            </div>

            <div className='w-full flex justify-start items-center px-3 h-auto '>
                <div className='px-3 lg:px-12 py-5 w-full'>
                    <h1 className='font-bold mb-3 text-blue-600'>Notifications</h1>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <p key={index} className='text-md md:text-xl border-b-2 mb-4 py-3 px-5 shadow-sm rounded-md' style={{ borderColor: 'gray', boxShadow: `0 0 2px gray`, backgroundColor: `#e0f3ff` }}>
                                {notification.content}<br></br>
                                <span className='text-xs font-semibold text-gray-400'>Published at {formatDate(notification.createdAt)}</span>
                            </p>
                        ))
                    ) : (
                        <p className='text-md md:text-xl'>No notifications available</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
