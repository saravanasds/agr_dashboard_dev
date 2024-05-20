import React, { useState } from 'react';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";



const Dashboard = () => {

    const [todos, setTodos] = useState([]);
    const [memberId, setMemberId] = useState('');
    const [bonusValue, setBonusValue] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!memberId || !bonusValue || !subject || !date) {
            alert('Please fill out all fields');
            return;
        }
        const newTodo = {
            id: Date.now(),
            memberId,
            bonusValue,
            subject,
            date
        };
        setTodos([...todos, newTodo]);
        // Clear input fields
        setMemberId('');
        setBonusValue('');
        setSubject('');
        setDate('');
    };

    return (
        <>
            <div className='w-full overflow-y-auto grow flex flex-col justify-start items-center'>

                <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'><h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>adminpanel</h1></div>


                <div className='w-full flex justify-center items-start bg-gray-200 '>
                    <div className='w-full gap-4 grid grid-cols-1 lg:grid-cols-3 px-3 sm:px-14 md:px-6 py-6 min-h-[150px]'>
                        <div className='bg-blue-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-xl sm:text-xl font-semibold mb-2'>Total Members</p>
                                <p className='text-xl sm:text-xl font-bold text-center '> 500</p>
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
                            {todos.map(todo => (
                                <li key={todo.id} className="mb-2 flex gap-6 border-2 p-2 rounded-md w-[800px]">
                                   {todo.date} <span className="font-semibold">{todo.memberId}</span>  <span>&#x20B9; {todo.bonusValue}</span>  {todo.subject}  
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


        </>
    );
};

export default Dashboard;