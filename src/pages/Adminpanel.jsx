import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [memberId, setMemberId] = useState('');
    const [bonusValue, setBonusValue] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');

    const adminToken = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchBonusHistory = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/admin/bonusHistory', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                console.log(response.data);
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching bonus history:', error);
            }
        };
        fetchBonusHistory();
    }, [adminToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!memberId || !bonusValue || !subject || !date) {
            alert('Please fill out all fields');
            return;
        }

        const newBonus = {
            referralId: memberId,
            bonusValue: parseInt(bonusValue, 10),
            subject,
            date
        };

        try {
            const response = await axios.post('http://localhost:9000/api/admin/assignBonus', newBonus, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            if (response.status === 200) {
                setTodos([...todos, newBonus]);
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
                    <div className='w-full gap-4 grid grid-cols-1 lg:grid-cols-3 px-3 sm:px-14 md:px-6 py-6 min-h-[150px]'>
                        <div className='bg-blue-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div className='text-center'>
                                <p className='text-xl sm:text-xl font-semibold mb-2'>Add New Admin</p>
                                <Link to="/adminRegister" className="font-bold hover:underline text-center ">
                                    Register Here
                                </Link>
                            </div>
                            <div><MdGroups className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-red-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xl sm:text-xl font-semibold mb-2'>Total Payment Received</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; 500000</p>
                            </div>
                            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-[#66bfbf] rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xl sm:text-xl font-semibold mb-2'>Total Amount Paid</p>
                                <p className='text-xl sm:text-xl font-bold text-center'>&#x20B9; 6000</p>
                            </div>
                            <div><BiMoneyWithdraw className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 p-4 px-6">
                <form onSubmit={handleSubmit} className="w-full  space-y-3 border-2 border-gray-500 p-4 rounded-lg bg-gray-400 shadow-lg shadow-white">
                    <h1 className='text-center text-xl font-semibold uppercase'>Bonus Payment</h1>
                    <div>
                        <label htmlFor="memberId" className="block text-md text-gray-700 font-semibold">Member Id:</label>
                        <input
                            type="text"
                            id="memberId"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            className="border border-gray-400 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="bonusValue" className="block text-md text-gray-700 font-semibold">Bonus Value:</label>
                        <input
                            type="text"
                            id="bonusValue"
                            value={bonusValue}
                            onChange={(e) => setBonusValue(e.target.value)}
                            className="border border-gray-400 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-md text-gray-700 font-semibold">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="border border-gray-400 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-md text-gray-700 font-semibold">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-400 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                    <button type="submit" className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded-md w-full font-semibold">Add Bonus</button>
                </form>

                <div className="w-full  border-2 border-gray-500 p-4 rounded-lg bg-gray-400 shadow-lg shadow-white">
                    <h1 className='text-center text-xl font-semibold mb-6 uppercase'>Bonus Report</h1>
                    <ul className='overflow-auto h-[340px] py-3 pr-3 '>
                        {todos.map((todo, index) => (
                            <li key={index} className="mb-2 flex gap-6 border-2 p-2 rounded-md w-[800px]">
                                {index + 1}. {todo.date} <span className="font-semibold">{todo.referralId}</span>  <span>&#x20B9; {todo.bonusValue}</span>  {todo.subject}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
