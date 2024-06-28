import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Dashboard = () => {
    // const [todos, setTodos] = useState([]);
    const [name, setName] = useState('');
    const [bankAcno, setBankAcno] = useState('');
    const [transactionNo, setTransactionNo] = useState('');
    const [memberId, setMemberId] = useState('');
    const [bonusValue, setBonusValue] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [totalUser, setTotalUser] = useState([]);
    const [totalReceivedAmount, setTotalReceivedAmount] = useState("");
    const [totalAmountPaid, setTotalAmountPaid] = useState("");
    const [totalBonusPaid, setTotalBonusPaid] = useState("");
    const [totalLevelIncomePaid, setTotalLevelIncomePaid] = useState("");
    const [totalReferralIncomePaid, setTotalReferralIncomePaid] = useState("");
    const [error, setError] = useState("");

    const adminToken = localStorage.getItem("adminToken");

    useEffect(() => {
        const totalAmount = totalUser.length * 5000;
        setTotalReceivedAmount(totalAmount);
    }, [totalUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                console.log(token);
                const response = await axios.get('https://agr-backend-m85q.onrender.com/api/admin/allUsers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.result;
                setTotalUser(data);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchBonusHistory = async () => {
    //         try {
    //             const response = await axios.get('https://agr-backend-m85q.onrender.com/api/admin/bonusHistory', {
    //                 headers: {
    //                     Authorization: `Bearer ${adminToken}`,
    //                 },
    //             });
    //             setTodos(response.data);
    //         } catch (error) {
    //             console.error('Error fetching bonus history:', error);
    //         }
    //     };
    //     fetchBonusHistory();
    // }, [adminToken]);

    console.log(totalUser)

    
    useEffect(() => {
        const totalLevelIncomePaid = totalUser.reduce((acc, user) => 
            acc + user.withdrawHistory
                .filter(history => history.paymentStatus === 'accepted')
                .reduce((historyAcc, history) => historyAcc + history.withdrawLevelIncome, 0), 0
        );
        setTotalLevelIncomePaid(totalLevelIncomePaid);
    
        const totalReferralIncomePaid = totalUser.reduce((acc, user) => 
            acc + user.withdrawHistory
                .filter(history => history.paymentStatus === 'accepted')
                .reduce((historyAcc, history) => historyAcc + history.withdrawRefferalIncome, 0), 0
        );
        setTotalReferralIncomePaid(totalReferralIncomePaid);

        const totalBonusPaid = totalUser.reduce((acc, user) => 
            acc + user.withdrawHistory.reduce((historyAcc, history) => historyAcc + (history.bonusValue || 0), 0), 0
        );
    
        setTotalBonusPaid(totalBonusPaid);
    
    
        setTotalAmountPaid(totalLevelIncomePaid + totalReferralIncomePaid + totalBonusPaid);
    }, [totalUser]);
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !memberId || !bankAcno || !transactionNo || !bonusValue || !subject || !date) {
            alert('Please fill out all fields');
            return;
        }

        const newBonus = {
            referralId: memberId,
            bonusValue: parseInt(bonusValue, 10),
            subject,
            date,
            name,
            bankAcno,
            transactionNo
        };

        try {
            const response = await axios.post('https://agr-backend-m85q.onrender.com/api/admin/assignBonus', newBonus, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            if (response.status === 200) {
                // setTodos([...todos, newBonus]);
                setName('');
                setBankAcno('');
                setTransactionNo('');
                setMemberId('');
                setBonusValue('');
                setSubject('');
                setDate('');
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error assigning bonus:', error);
            alert('Failed to assign bonus');
        }
    };

    return (
        <>
            <div className='w-full overflow-y-auto grow flex flex-col justify-start items-center'>
                <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'><h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>adminpanel</h1></div>

                <div className='w-full flex justify-center items-start bg-gray-200 '>
                    <div className='w-[90%] gap-4 grid grid-cols-1 lg:grid-cols-3  py-6 min-h-[150px]'>
                        <div className='bg-blue-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div className='text-center'>
                                <p className='text-xs sm:text-xl font-semibold mb-2'>Add New Admin</p>
                                <Link to="/adminRegister" className="font-bold hover:underline text-center ">
                                    Register Here
                                </Link>
                            </div>
                            <div><MdGroups className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-red-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xs sm:text-xl font-semibold mb-2'>Total Payment Received</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; {totalReceivedAmount}</p>
                            </div>
                            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-[#66bfbf] rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xs sm:text-xl font-semibold mb-2'>Total Amount Paid</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; {totalAmountPaid}</p>
                            </div>
                            <div><BiMoneyWithdraw className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-green-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xs sm:text-xl font-semibold mb-2'>Total Level Income Paid</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; {totalLevelIncomePaid}</p>
                            </div>
                            <div><RiMoneyDollarBoxLine className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-yellow-200 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xs sm:text-xl font-semibold mb-2'>Total Referral Paid</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; {totalReferralIncomePaid}</p>
                            </div>
                            <div><FaPersonArrowUpFromLine className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-pink-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xs sm:text-xl font-semibold mb-2'>Total Bonus Paid</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; {totalBonusPaid}</p>
                            </div>
                            <div><GiPayMoney className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center py-8 ">
                <form onSubmit={handleSubmit} className="w-[90%]  border-2 border-gray-500 rounded-lg bg-gray-400 shadow-lg shadow-white grid grid-cols-1 lg:grid-cols-2 px-6 py-8 lg:gap-10">
                    {/* <h1 className='text-center text-xl font-semibold uppercase'>Bonus Payment</h1> */}
                    <div>
                        <div>
                            <input
                                type="text"
                                placeholder='Name'
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Member Id'
                                id="memberId"
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Bonus Value'
                                id="bonusValue"
                                value={bonusValue}
                                onChange={(e) => setBonusValue(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Bank Ac.no'
                                id="bankAcno"
                                value={bankAcno}
                                onChange={(e) => setBankAcno(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                    </div>


                    <div>
                        <div>
                            <input
                                type="text"
                                placeholder='TransactionNo'
                                id="transactionNo"
                                value={transactionNo}
                                onChange={(e) => setTransactionNo(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Subject'
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                placeholder='Date'
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full mb-3"
                            />
                        </div>
                        <button type="submit" className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded-md w-full font-semibold">Add Bonus</button>
                    </div>
                </form>

                {/* <div className="w-full  border-2 border-gray-500 p-4 rounded-lg bg-gray-400 shadow-lg shadow-white">
                    <h1 className='text-center text-xl font-semibold mb-6 uppercase'>Bonus Report</h1>
                    <ul className='overflow-auto h-[340px] py-3 pr-3 '>
                        {todos.map((todo, index) => (
                            <li key={index} className="mb-2 flex gap-6 border-2 p-2 rounded-md w-[800px]">
                                {index + 1}. {todo.date} <span className="font-semibold">{todo.referralId}</span>  <span>&#x20B9; {todo.bonusValue}</span>  {todo.subject}
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </>
    );
};

export default Dashboard;
