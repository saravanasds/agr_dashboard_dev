import React from 'react';
import Header from "../components/Header"

const PaymentHistory = () => {
    const payments = [
        { id: 1, date: '2024-04-01', transactionId: 'TRAN0004758', amount: 100 },
        { id: 2, date: '2024-04-05', transactionId: 'TRAN0004758', amount: 150 },
        { id: 3, date: '2024-04-10', transactionId: 'TRAN0004758', amount: 200 },
        // Add more payment data as needed
    ];

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="max-w-3xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.no</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Id</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map(payment => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{payment.transactionId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">&#x20B9; {payment.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;
