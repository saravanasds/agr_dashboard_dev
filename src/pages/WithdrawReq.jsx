import React, { useState } from 'react';

const WithdrawRequestTable = () => {
    const [isOpen, setIsOpen] = useState(false);

    const requests = [
        {
            id: 1,
            date: '2024-04-01',
            name: 'Karthik',
            memberId: 'TRAN0004758',
            value: 2500,
            mobileNo: '9994476524',
            bankAcno: '3381754862',
            bank: 'State bank of india',
            IFSC: 'SBIN0002241'
        },
        {
            id: 2,
            date: '2024-04-05',
            name: 'anandh',
            memberId: 'TRAN0004758',
            value: 2500,
            mobileNo: '9994476524',
            bankAcno: '3381754862',
            bank: 'State bank of india',
            IFSC: 'SBIN0002241'
        },
        {
            id: 3,
            date: '2024-04-07',
            name: 'naveen',
            memberId: 'TRAN0004758',
            value: 2500,
            mobileNo: '9994476524',
            bankAcno: '3381754862',
            bank: 'State bank of india',
            IFSC: 'SBIN0002241'
        },
    ];

    const printWithdrawRequests = () => {
        const printContents = document.getElementById("printWithdrawRequests").innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Table</title>
                <style>
                /* Add your CSS styles here */
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

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
                <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Withdraw Request</h1>
            </div>

            <div className='w-full flex justify-center items-start bg-gray-300 py-10 min-h-screen'>
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-semibold mb-4">Withdrawable Requests</h2>
                    <div className="w-[90%] overflow-auto shadow-md">
                        <div id="printWithdrawRequests">
                            <table className="min-w-full">
                                <thead className="bg-[#455d7a]">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">req.Date</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">member id</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">value</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Mobile no</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Bank ac.no</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">bank</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">IFSC</th>
                                        <th className="noprint px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-300">
                                    {requests.map(request => (
                                        <tr key={request}>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.id}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.date}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.name}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.memberId}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.value}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.mobileNo}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.bankAcno}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.bank}</td>
                                            <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">{request.IFSC}</td>
                                            <td className="noprint px-6 py-4 text-center whitespace-nowrap">
                                                <button className='bg-green-600 p-1 px-3 mr-3 rounded-md hover:bg-green-400 text-white text-xs sm:text-sm' onClick={togglePopup}>Activate</button>
                                                <button className='bg-red-600 p-1 px-3 mr-3 rounded-md hover:bg-red-400 text-white text-xs sm:text-sm'>Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-8 py-2 mt-4 rounded-md hover:bg-blue-600 font-semibold uppercase shadow-sm shadow-gray-900" onClick={printWithdrawRequests}>Print</button>
                </div>
            </div>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2 className="text-xl font-semibold mb-4">Are You Sure Comfirm to Activate?</h2>
                                {/* Your form content here */}
                                <div className="mt-5 sm:mt-4 flex justify-end">
                                    <button className='bg-green-600 p-1 px-3 mr-3 rounded-md hover:bg-green-400 text-white' onClick={() => { window.alert('Success! Your action was completed.'); togglePopup(); }}>Yes</button>
                                    <button
                                        type="button"
                                        onClick={togglePopup}
                                        className='bg-red-600 p-1 px-3 mr-3 rounded-md hover:bg-red-400 text-white'
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default WithdrawRequestTable;
