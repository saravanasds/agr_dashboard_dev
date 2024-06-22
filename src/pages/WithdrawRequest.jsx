import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserProvider';
import ReferralWithdraw from './ReferralWithdraw';

const WithdrawRequest = () => {
    const { user, setUser } = useContext(UserContext);
    const [singleUser, setSingleUser] = useState({});
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    const email = user?.data?.email;
    const profilePhoto = user?.data ? `https://agr-backend-m85q.onrender.com/${user.data.photo}` : '';

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
                        body: JSON.stringify({ email })
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
    }, [user, email]);

    useEffect(() => {
        if (singleUser && singleUser.allChild) {
            const length = singleUser.allChild.length;
            const amount = singleUser.availableLevelIncome;
            
            if (length == 3 || 12 || 39 || 120 || 363 || 1092 || 3279 || 9840 || 29523 || 88572) {
                setWithdrawAmount(amount);
            } else{
                setWithdrawAmount(0);
            }
        }
    }, [singleUser]);


    if (!singleUser) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        setWithdrawAmount('0');

        const requestData = {
            name: singleUser.firstName,
            email: singleUser.email,
            referralId: singleUser.referralId,
            levelIncome: withdrawAmount,
            mobileNumber: singleUser.mobileNumber,
            bankName: singleUser.bankName,
            bankAcno: singleUser.bankAcno,
            branch: singleUser.branch,
            ifsc: singleUser.ifsc
        };

        console.log(requestData);
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token is missing.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://agr-backend-m85q.onrender.com/api/auth/levelIncomeWithdrawRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            setSuccess(true);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to send the request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
                    <div><span className='sm:text-2xl font-bold uppercase text-white'>Withdraw Request</span></div>
                    <div className=' rounded-full flex justify-center items-center'>
                        {user?.data && <img src={profilePhoto} alt="" className=' rounded-full border-2 h-12 w-12 object-cover' />}
                    </div>
                </div>
            </div>

            <div className="w-[90%] sm:w-[80%] mx-auto mt-8">
                <div className='py-10'>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Level Income</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row justify-between items-center border-2 p-4 rounded-lg gap-3'>
                        <label htmlFor="withdrawAmount" className='w-full lg:w-auto text-md font-semibold'>Withdrawable Amount:</label>
                        <p className='w-full lg:w-1/3 border-2 p-2 rounded-lg bg-gray-100'>{withdrawAmount}</p>
                        <button
                            type='submit'
                            className='w-full lg:w-auto p-2 px-4 rounded-lg bg-green-700 text-white'
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send request'}
                        </button>
                    </form>
                    {error && <p className='text-red-500 mt-4'>{error}</p>}
                    {success && <p className='text-green-500 mt-4'>Request sent successfully!</p>}
                </div>
            </div>
            <ReferralWithdraw />
        </>
    );
};

export default WithdrawRequest;
