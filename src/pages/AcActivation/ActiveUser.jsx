import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rejOpen, setRejOpen] = useState(false);
    const [activations, setActivations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await axios.post('https://agr-backend-m85q.onrender.com/api/admin/activatedUser', { page: currentPage, limit: 20 }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const reversedActivations = response.data.activatedUsers.reverse();
            setActivations(reversedActivations);
            setTotalPages(Math.ceil(response.data.totalCount / 20));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

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
        setRejOpen(true);
    };

    const handleActivation = async (activate) => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axios.post(
                'https://agr-backend-m85q.onrender.com/api/admin/activateUser',
                {
                    email: selectedUser.email,
                    reqMessage: false // Set to true for deactivation
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
                    user.email === selectedUser.email ? { ...user, isActivate: false } : user
                )
            );
            setRejOpen(false);
        } catch (error) {
            console.error('Error activating/deactivating user:', error);
        }
    };

    const handleDeactivate = () => {
        handleActivation(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
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
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{formatDate(activate.paymentDate)}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.firstName}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.transactionId}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.referralId}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{activate.mobileNumber}</td>
                                            <td className="noprint px-6 py-4 text-center whitespace-nowrap">
                                                <button className='bg-red-600 p-1 px-3 mr-3 rounded-md hover:bg-red-400 text-white text-xs sm:text-sm' onClick={() => actPopup(activate)}>Reject</button>
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
                    <div className="mt-4 flex justify-center">
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l-md hover:bg-gray-400"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-400"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                    <button className="bg-blue-500 text-white px-8 py-2 mt-4 rounded-md hover:bg-blue-600 font-semibold uppercase shadow-sm shadow-gray-900" onClick={printTable}>Print</button>
                </div>
            </div>
            {rejOpen && selectedUser && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2 className="text-2xl font-semibold mb-4">Deactivation Form</h2>
                                <div>
                                    <p>Do you want to Deactivate {selectedUser.firstName}?</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDeactivate}>Yes</button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setRejOpen(false)}>No</button>
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
                                                <h2 className='text-md font-semibold'>Whatsapp no:</h2>
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
                                                    <a href={selectedUser.adharProof} target="_blank" rel="noopener noreferrer" className='underline'>
                                                        Click here
                                                    </a>
                                                </p>
                                            </div>
                                            <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                                                <h2 className='text-md font-semibold'>Photo:</h2>
                                                <p>
                                                    <a href={selectedUser.photo} target="_blank" rel="noopener noreferrer" className='underline'>
                                                        Click here
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
                                                <h2 className='text-md font-semibold'>Gpay Number:</h2>
                                                <p>{selectedUser.gpayNumber}</p>
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
                                                <p>
                                                    <a href={selectedUser.paymentScreenshot} target="_blank" rel="noopener noreferrer" className='underline'>
                                                        Click here
                                                    </a>
                                                </p>
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

export default ActiveUser;
