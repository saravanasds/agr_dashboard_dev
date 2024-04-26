import React from 'react';
import Header from "../components/Header"



const WithdrawRequestTable = () => {

    const requests = [
        { id: 1, date: '2024-04-01', transactionNo: 'TRAN0004758', amount: 100, result: 'pending' },
    ];

    return (
        <>
            <div>
                <Header />
            </div>

            <div className="w-[90%] sm:w-[80%] mx-auto mt-8">
                <div className='py-10'>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Withdraw Request</h1>
                    <form className='flex flex-col lg:flex-row justify-between items-center border-2 p-4 rounded-lg gap-3'>
                        <label htmlFor="" className='w-full lg:w-auto text-md font-semibold'>Withdrawable Amount:</label>
                        <input type="text" Value={'INR-2500.00'} className='w-full lg:w-1/3 border-2 p-2 rounded-lg'/>
                        <button type='submit' className='w-full lg:w-auto p-2 px-4 rounded-lg bg-green-700 text-white'>Send request</button>
                    </form>

                </div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Withdraw Request Status</h2>
                {requests.length > 0 ? (
                    <div className="overflow-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requests.map(request => (
                                    <tr key={request.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">${request.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.transactionNo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center py-8">No result found.</div>
                )}
            </div>

        </>
    );
};

export default WithdrawRequestTable;
