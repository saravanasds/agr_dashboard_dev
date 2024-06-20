import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserProvider';

const PaymentHistory = () => {
    const { user, setUser } = useContext(UserContext);
    const [singleUser, setSingleUser] = useState(null);
    const [withdrawHistory, setWithdrawHistory] = useState([]);

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
                    const response = await fetch('https://api.agrpremiumplan.in/api/auth/userData', {
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
        if (singleUser && singleUser.withdrawHistory) {
            setWithdrawHistory(singleUser.withdrawHistory);
        }
    }, [singleUser]);

    return (
        <>
            <div>
                <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
                    <div><span className='sm:text-2xl font-bold uppercase text-white'>Payment History</span></div>
                    <div className='border-2 border-black rounded-full'>
                        <img src="src/assets/1679057404284.jpg" alt="" className='w-12 rounded-full border-2' />
                    </div>
                </div>
            </div>
            <div className="w-[90%] sm:w-[80%] mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
                <div className="overflow-auto border border-gray-300 rounded-lg">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.no</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Id</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level Income</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Income</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {withdrawHistory.map((history, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{history.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{history.transactionNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{history.withdrawLevelIncome?history.withdrawLevelIncome:"0"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{history.withdrawRefferalIncome?history.withdrawRefferalIncome:"0"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{history.bonusValue?history.bonusValue:"0"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;
