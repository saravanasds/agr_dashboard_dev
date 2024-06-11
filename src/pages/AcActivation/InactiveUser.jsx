import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InactiveUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [actOpen, setActOpen] = useState(false);
    const [activations, setActivations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.post('http://localhost:9000/api/admin/deactivatedUser', {}, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setActivations(response.data.activatedUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const waitingUsers = activations.length;
        localStorage.setItem('waitingUsers', waitingUsers);
    }, [activations]);

    const printTable = () => {
        const printContents = document.getElementById("printTable").innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Table</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    .noprint {
                        display: none
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    th {
                        background-color: #ddd;
                        color: #333;
                    }
                </style>
            </head>
            <body>${printContents}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };

    const printUserDetails = () => {
        const printContents = document.getElementById("printUserDetails").innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>User Details</title>
                <style>
                    body {
                        width: 100%;
                    }
                    .details {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                    }
                    .details-btn {
                        display: none;
                    }
                    .address {
                        padding-right: 15px;
                        width: 150px;
                    }
                    h1 {
                        text-align: center;
                    }
                    h2 {
                        font-size: 18px;
                    }
                </style>
            </head>
            <body>${printContents}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };

    const togglePopup = (user) => {
        setSelectedUser(user);
        setIsOpen(!isOpen);
    };

    const actPopup = (user) => {
        setSelectedUser(user);
        setActOpen(true);
    };

    const handleActivate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:9000/api/admin/activateUser',
                {
                    email: selectedUser.email,
                    reqMessage: true
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            console.log('Activation response:', response.data);
            // Update the activation status in the state
            setActivations(prevActivations =>
                prevActivations.map(user =>
                    user.email === selectedUser.email ? { ...user, isActivate: true } : user
                )
            );
            setActOpen(false);
        } catch (error) {
            console.error('Error activating user:', error);
        }
    };

    return (
        <div className='w-full overflow-x-hidden'>
            <div className='w-full flex justify-center items-start bg-gray-300 py-10 min-h-screen'>
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="sm:text-2xl font-semibold mb-4 px-6">Activation Members Details</h2>
                    <div className="w-[90%] overflow-auto border border-gray-500 rounded-lg shadow-md">
                        <div id="printTable">
                            <table className="min-w-full">
                                <thead className="bg-[#455d7a]">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Act.Date</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Transaction no</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Referral Id</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Mobile no</th>
                                        <th className="noprint px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-300">
                                    {activations.map((activate, index) => (
                                        <tr key={activate._id}>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{new Date(activate.paymentDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.firstName}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.transactionId}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.referralId}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.mobileNumber}</td>
                                            <td className="noprint px-6 py-4 text-center whitespace-nowrap">
                                                {!activate.isActivate ? (
                                                    <button className='bg-green-600 p-1 px-3 mr-3 rounded-md hover:bg-green-400 text-white text-xs sm:text-sm' onClick={() => actPopup(activate)}>Activate</button>
                                                ) : (
                                                    <span className='text-green-600 font-semibold mr-4'>Activated</span>
                                                )}
                                                <button
                                                    className='bg-blue-800 p-1 px-3 mr-3 rounded-md hover:bg-blue-600 text-white text-xs sm:text-sm'
                                                    onClick={() => togglePopup(activate)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-8 py-2 mt-4 rounded-md hover:bg-blue-600 font-semibold uppercase shadow-sm shadow-gray-900" onClick={printTable}>Print</button>
                </div>
            </div>
            {actOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Activate User</h3>
                                <p className="mb-4">Are you sure you want to activate this user?</p>
                                <div className="flex items-center justify-center gap-3">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleActivate}>Activate</button>
                                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400" onClick={() => setActOpen(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && selectedUser && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div id="printUserDetails">
                                    <div className="w-full flex justify-between items-center mb-5">
                                        <h1 className='text-center text-xl font-semibold text-gray-900'>{selectedUser.firstName}</h1>
                                        <button className='details-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' onClick={printUserDetails}>Print</button>
                                    </div>
                                    <div className="details">
                                        <div className="address">
                                            <h2 className="text-gray-700 mb-1">Address:</h2>
                                            <p className="text-gray-600 text-sm">{selectedUser.address}</p>
                                        </div>
                                        <div className="email">
                                            <h2 className="text-gray-700 mb-1">Email:</h2>
                                            <p className="text-gray-600 text-sm">{selectedUser.email}</p>
                                        </div>
                                        <div className="phone">
                                            <h2 className="text-gray-700 mb-1">Phone:</h2>
                                            <p className="text-gray-600 text-sm">{selectedUser.mobileNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 mt-5 rounded-md hover:bg-gray-400" onClick={() => setIsOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InactiveUser;
