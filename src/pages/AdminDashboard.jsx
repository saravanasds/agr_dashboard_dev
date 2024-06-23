import React, { useState, useEffect } from 'react';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdGroups, MdEdit } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { SiMoneygram } from "react-icons/si";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [actReq, setActReq] = useState("");
    const [withdrawReqCount, setWithdrawReqCount] = useState([]);
    const [withdrawableValue, setWithdrawableValue] = useState("");
    const [inputText, setInputText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [message, setMessage] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.post('https://agr-backend-m85q.onrender.com/api/admin/deactivatedUser', {}, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setActReq(response.data.activatedUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                console.log(token);
                const response = await axios.get('https://agr-backend-m85q.onrender.com/api/admin/withdrawRequestUser', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.result;
                console.log(data);
                setWithdrawReqCount(data)
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const totalLevelIncome = withdrawReqCount.reduce((acc, withdrawReq) => acc + withdrawReq.levelIncome, 0);
        const totalReferralIncome = withdrawReqCount.reduce((acc, withdrawReq) => acc + withdrawReq.referralIncome, 0);
        setWithdrawableValue(totalLevelIncome + totalReferralIncome);
    }, [withdrawReqCount]);


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
                console.log(data);
                setUsers(data);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, []);


    // Load todos from localStorage when component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    // Save todos to localStorage whenever todos state changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleDueTimeChange = (event) => {
        setDueTime(event.target.value);
    };

    const handleAddTodo = async () => {
        if (inputText.trim() !== "") {
            const newTodo = { id: Date.now(), text: inputText, dueDate, dueTime };
            const token = localStorage.getItem('adminToken');
            try {
                const response = await fetch('https://agr-backend-m85q.onrender.com/api/admin/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ content: inputText })
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessage({ type: 'success', text: data.message });
                    setTodos(prevTodos => [...prevTodos, newTodo]);
                    setInputText("");
                    setDueDate("");
                    setDueTime("");

                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    setMessage({ type: 'error', text: errorData.message });
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                }
            } catch (error) {
                setMessage({ type: 'error', text: 'Error: ' + error.message });
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            }
        }
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (id) => {
        setEditingId(id);
        const todoToEdit = todos.find((todo) => todo.id === id);
        setEditedText(todoToEdit.text);
    };

    const handleSaveEdit = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text: editedText };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditingId(null);
    };

    return (
        <>
            <div className='w-full overflow-y-auto grow flex flex-col justify-start items-center'>
                <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
                    <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Dashboard</h1>
                </div>

                <div className='w-full flex flex-col xl:flex-row justify-center items-start bg-gray-200 pb-10'>
                    <div className='w-full gap-4 grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 px-3 sm:px-14 py-6 min-h-[300px]'>
                        <div className='bg-blue-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-md sm:text-xl font-semibold'>Total Members</p>
                                <p className='text-xl sm:text-xl font-semibold text-center'> {users.length}</p>
                            </div>
                            <div><GiTakeMyMoney className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-red-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-md sm:text-xl font-semibold'>Activation Request</p>
                                <p className='text-xl sm:text-xl font-semibold text-center'>{actReq.length}</p>
                            </div>
                            <div><MdGroups className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>
                        {/* <div className='bg-[#66bfbf] rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-md sm:text-xl font-semibold'>Referral Members</p>
                                <p className='text-xl sm:text-xl font-semibold text-center'>03</p>
                            </div>
                            <div><BsPersonFillAdd className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div> */}
                        {/* <div className='bg-green-300 rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-md sm:text-xl font-semibold'>Total Refferals</p>
                                <p className='text-xl sm:text-xl font-semibold text-center'> 200</p>
                            </div>
                            <div><MdAccountBalance className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div> */}
                        <div className='bg-[#fce38a] rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500 '>
                            <div>
                                <p className='text-md sm:text-xl font-semibold'>Withdraw Request</p>
                                <p className='text-xl sm:text-xl font-semibold text-center'>{withdrawReqCount.length}</p>
                            </div>
                            <div><BiMoneyWithdraw className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>

                        <div className='bg-[#93a7d1] rounded-lg py-5 flex justify-around items-center px-4 shadow-md shadow-gray-500'>
                            <div>
                                <p className='text-md sm:text-xl font-semibold'>Withdraw Value</p>
                                <p className='text-xl sm:text-xl font-semibold text-center'> &#x20B9; {withdrawableValue}</p>
                            </div>
                            <div><SiMoneygram className='text-[40px] md:text-[65px] opacity-80' /></div>
                        </div>
                    </div>
                </div>

                <div className="w-full mx-auto px-3 sm:px-14 py-5 bg-gray-400 min-h-[50vh]">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">Add Notifications</h1>
                    <div className="flex flex-col lg:flex-row mb-4">
                        <input
                            type="text"
                            className="w-full lg:w-auto border border-gray-400 px-4 py-2 flex-grow lg:rounded-l-md mb-2 text-md"
                            placeholder="Type New Notification"
                            value={inputText}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            className="w-full lg:w-auto border border-gray-400 px-4 py-2 lg:rounded-l-none mb-2"
                            value={dueDate}
                            onChange={handleDueDateChange}
                        />
                        <input
                            type="time"
                            className="w-full lg:w-auto border border-gray-400 px-4 py-2 lg:rounded-r-none mb-2"
                            value={dueTime}
                            onChange={handleDueTimeChange}
                        />
                        <button
                            className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 lg:rounded-r-md mb-2"
                            onClick={handleAddTodo}
                        >
                            Add
                        </button>
                    </div>
                    {message && (
                        <div className={`mb-4 p-2 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {message.text}
                        </div>
                    )}
                    <ul className="w-full">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex justify-between items-center mb-2 text-md md:text-xl border-b-2 py-2 shadow-sm shadow-black hover:bg-gray-200 rounded-md"
                            >
                                {editingId === todo.id ? (
                                    <>
                                        <textarea
                                            type="text"
                                            className="border border-gray-400 px-2 py-1 rounded w-full"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                        />
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => handleSaveEdit(todo.id)}
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex-1 px-3 text-lg">{todo.text}</span>
                                        <span className="px-3 text-sm whitespace-nowrap">
                                            {todo.dueTime ? `at ${todo.dueTime}` : ""}
                                        </span>
                                        <span className="px-3 text-sm">{todo.dueDate ? `${todo.dueDate}` : ""}</span>
                                        <div className="px-3">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 mr-5"
                                                onClick={() => handleEditTodo(todo.id)}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-700"
                                                onClick={() => handleDeleteTodo(todo.id)}
                                            >
                                                <RiDeleteBin5Fill />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
