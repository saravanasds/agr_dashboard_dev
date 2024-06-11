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
                                <p className="mb-4">Are you sure you want to activate {selectedUser.firstName}?</p>
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
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                            <div id='printUserDetails'>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h1 className='text-2xl text-center font-semibold uppercase tracking-wide py-4 bg-gray-200'>Profile Details</h1>
                                    <div className='details w-full bg-[#F4F6F9] flex flex-col lg:flex-row py-5 justify-center'>
                                        <div className='w-full lg:w-1/3 px-3'>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>User Name:</h2>
                                                <p>{selectedUser.firstName}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Email Id:</h2>
                                                <p>{selectedUser.email}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Guardian Name:</h2>
                                                <p>{selectedUser.guardian}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Gender:</h2>
                                                <p>{selectedUser.gender}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>DOB:</h2>
                                                <p>{new Date(selectedUser.dob).toLocaleDateString()}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Mobile no:</h2>
                                                <p>{selectedUser.mobileNumber}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Alternate Mobile no:</h2>
                                                <p>{selectedUser.alternateMobileNumber}</p>
                                            </div>
                                        </div>
                                        <div className='w-full lg:w-1/3 px-3'>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Adhar no:</h2>
                                                <p>{selectedUser.aadharNo}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Adhar proof:</h2>
                                                <p>
                                                    <a href={`http://localhost:9000/${selectedUser.adharProof}`} target="_blank" rel="noopener noreferrer">
                                                        {selectedUser.adharProof}
                                                    </a>
                                                </p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Photo:</h2>
                                                <p>
                                                    <a href={`http://localhost:9000/${selectedUser.photo}`} target="_blank" rel="noopener noreferrer">
                                                        {selectedUser.photo}
                                                    </a>
                                                </p>
                                            </div>

                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Nominee Name:</h2>
                                                <p>{selectedUser.nomineeName}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Nominee Relationship:</h2>
                                                <p>{selectedUser.nomineeRelationship}</p>
                                            </div>
                                            <div className='address hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Address:</h2>
                                                <p>{selectedUser.address}</p>
                                            </div>
                                        </div>
                                        <div className='w-full lg:w-1/3 px-3'>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Bank Ac.no:</h2>
                                                <p>{selectedUser.bankAcno}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Bank Name:</h2>
                                                <p>{selectedUser.bankName}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Branch:</h2>
                                                <p>{selectedUser.branch}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>IFSC Code:</h2>
                                                <p>{selectedUser.ifsc}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Payment Date:</h2>
                                                <p>{new Date(selectedUser.paymentDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Transaction Id:</h2>
                                                <p>{selectedUser.transactionId}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Payment Screenshot:</h2>
                                                <p>{selectedUser.paymentScreenshot}</p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Referral Id:</h2>
                                                <p>{selectedUser.referralId}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="details-btn bg-gray-50 px-4 py-3 sm:px-6 flex gap-3 items-center justify-end mr-12">
                                    <button className="bg-green-700 text-white px-8 py-2 rounded-md hover:bg-green-600 font-semibold uppercase" onClick={printUserDetails}>Print</button>
                                    <button
                                        onClick={togglePopup}
                                        className="bg-orange-700 text-white px-8 py-2 rounded-md hover:bg-orange-600 font-semibold uppercase"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InactiveUser;
