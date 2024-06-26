import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Example() {
  const [adminHistory, setAdminHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchReferralHistory();
  }, [currentPage]);

  const fetchReferralHistory = async () => {
    try {
      const response = await axios.get('https://agr-backend-m85q.onrender.com/api/admin/referralHistory', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        params: {
          page: currentPage,
          limit: 20,
        },
      });
      setAdminHistory(response.data);
      setTotalPages(Math.ceil(response.data.totalCount / 20));
    } catch (error) {
      console.error('Error fetching bonus history:', error);
      setAdminHistory([]);
      setTotalPages(0);
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

  const printPaymentHistory = () => {
    const printContents = document.getElementById("printPaymentHistory").innerHTML;
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

  return (
    <>
      <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
        <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Payment History</h1>
      </div>
      <div className="w-full flex justify-center items-start bg-gray-300 py-10 min-h-screen">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          <div className="w-[90%] overflow-auto border border-gray-500 rounded-lg shadow-md">
            <div id="printPaymentHistory">
              <table className="min-w-full">
                <thead className="bg-[#455d7a]">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Member Id</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Transaction no</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Ac/no</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Level Income</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Referral Income</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Bonus</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminHistory && adminHistory.map((payment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{index + 1 + (currentPage - 1) * 20}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${payment.paymentStatus === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>
                        {payment.date ? payment.date : "null"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.referralId}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${payment.paymentStatus === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>
                        {payment.transactionNo ? payment.transactionNo : "null"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.bankAcno}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.withdrawLevelIncome ? payment.withdrawLevelIncome : "0"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.withdrawRefferalIncome ? payment.withdrawRefferalIncome : "0"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.bonusValue ? payment.bonusValue : "0"}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${payment.paymentStatus === 'rejected' ? 'text-red-500' : 'text-green-500'}`}>
                        {payment.paymentStatus ? payment.paymentStatus : "Success"}
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
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-400"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <button className="bg-blue-500 text-white px-8 py-2 mt-4 rounded-md hover:bg-blue-600 font-semibold uppercase shadow-sm shadow-gray-900" onClick={printPaymentHistory}>Print</button>
        </div>
      </div>
    </>
  );
}
