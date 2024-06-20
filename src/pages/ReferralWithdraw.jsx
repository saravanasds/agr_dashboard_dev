import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserProvider';

const ReferralWithdraw = () => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const requestData = {
            name: user.data.firstName,
            email: user.data.email,
            referralId: user.data.referralId,
            referralIncome: user.data.referralAmount,
            mobileNumber: user.data.mobileNumber,
            bankName: user.data.bankName,
            bankAcno: user.data.bankAcno,
            branch: user.data.branch,
            ifsc: user.data.ifsc
        };

        console.log(requestData);
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token is missing.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://api.agrpremiumplan.in/api/auth/referralIncomeWithdrawRequest', {
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
            <div className="w-[90%] sm:w-[80%] mx-auto">
                <div className='py-2'>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Referral Income</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row justify-between items-center border-2 p-4 rounded-lg gap-3'>
                        <label htmlFor="withdrawAmount" className='w-full lg:w-auto text-md font-semibold'>Withdrawable Amount:</label>
                        <p className='w-full lg:w-1/3 border-2 p-2 rounded-lg bg-gray-100'>{user.data.referralAmount}</p>
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
        </>
    );
};

export default ReferralWithdraw;
