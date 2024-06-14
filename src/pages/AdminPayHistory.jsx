import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Example() {
  const [adminHistory, setAdminHistory] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchReferralHistory = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/admin/referralHistory', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setAdminHistory(response.data);
      } catch (error) {
        console.error('Error fetching bonus history:', error);
      }
    };
    fetchReferralHistory();
  }, [adminToken]);

  console.log(adminHistory);

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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminHistory.map((payment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.referralId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.transactionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.bankAcno}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.withdrawLevelIncome ? payment.withdrawLevelIncome : "0"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.withdrawRefferalIncome ? payment.withdrawRefferalIncome : "0"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{payment.bonusValue ? payment.bonusValue : "0"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-8 py-2 mt-4 rounded-md hover:bg-blue-600 font-semibold uppercase shadow-sm shadow-gray-900" onClick={printPaymentHistory}>Print</button>
        </div>
      </div>
    </>
  );
}
