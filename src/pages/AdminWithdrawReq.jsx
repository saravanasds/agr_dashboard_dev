import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WithdrawRequestTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [currentRequest, setCurrentRequest] = useState({});
  const [approvePayment, setApprovePayment] = useState({});
  const [rejectPayment, setRejectPayment] = useState({});

  const navigate = useNavigate();

  const payment = (e) => {
    const { name, value } = e.target;
    setApprovePayment((pre) => ({ ...pre, [name]: value }));
  };
  console.log(approvePayment);
  const adminToken = localStorage.getItem("adminToken");
  const adminEmail = localStorage.getItem("adminEmail");
  console.log(adminEmail);

  useEffect(() => {
    setApprovePayment({ ...approvePayment, adminEmail });
    setRejectPayment({...rejectPayment, adminEmail})
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.agrpremiumplan.in/api/admin/withdrawRequestUser",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        const data = response.data.result;
        console.log(data);
        if (data.length > 0) {
          setRequests(data);
        } else {
          setRequests([]);
          setError("No requests from users");
        }
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(approvePayment);
      // console.log(adminToken);
      await axios.post(
        "https://api.agrpremiumplan.in/api/admin/approveWithdrawRequest",
        approvePayment,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      window.alert("Success! Your action was completed.");
      navigate("/adminDashboard");

      // togglePopup();
    } catch (err) {
      // alert(err);
      console.log(err);
    }
  };

  const printWithdrawRequests = () => {
    const printContents = document.getElementById(
      "printWithdrawRequests"
    ).innerHTML;
    const printWindow = window.open("", "_blank");
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

  const togglePopup = (data) => {
    setCurrentRequest(data);
    console.log(data);
    setApprovePayment({
      ...approvePayment,
      email: data.email,
      withdrawRequestId: data.withdrawRequestId,
      withdrawLevelIncome: data.levelIncome,
      withdrawRefferalIncome: data.referralIncome,
      bankName: data.bankName,
      bankAcno: data.bankAcno,
      branch: data.branch,
      name: data.name,
      ifsc: data.ifsc,
      mobileNumber: data.mobileNumber,
      referralId: data.referralId,
      mongoId: data._id,
      paymentStatus: "accepted",
    });
    setIsOpen(!isOpen);
  };

  const handleReject = async (data) => {
    const newData = {
      ...rejectPayment,
      email: data.email,
      withdrawRequestId: data.withdrawRequestId,
      withdrawLevelIncome: data.levelIncome,
      withdrawRefferalIncome: data.referralIncome,
      bankName: data.bankName,
      bankAcno: data.bankAcno,
      branch: data.branch,
      name: data.name,
      ifsc: data.ifsc,
      mobileNumber: data.mobileNumber,
      referralId: data.referralId,
      mongoId: data._id,
      paymentStatus: "rejected",
    };

  console.log(newData)

    try {

      await axios.post(
        "https://api.agrpremiumplan.in/api/admin/rejectWithdrawRequest",
        newData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      window.alert("Success! Your action was completed.");
      navigate("/adminDashboard");
    } catch (err) {
      // alert(err);
      console.log(err);
    }

  };

  return (
    <>
      <div className="text-left w-full bg-[#2d4059] border-[1px] border-gray-500">
        <h1 className="sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider">
          Withdraw Request
        </h1>
      </div>

      <div className="w-full flex justify-center items-start bg-gray-300 py-10 min-h-screen">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">Withdrawable Requests</h2>
          {error && <p className="text-red-500">{error}</p>}
          {requests.length > 0 ? (
            <div className="w-[90%] overflow-auto shadow-md">
              <div id="printWithdrawRequests">
                <table className="min-w-full">
                  <thead className="bg-[#455d7a]">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Sl.no
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        req.Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Level Income
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Referral Income
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Bank Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Bank Ac.No
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        IFSC
                      </th>
                      <th className="noprint px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {requests.map((request, index) => (
                      <tr key={request.withdrawRequestId}>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {formatDate(request.date)}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.name}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.withdrawRequestId}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.levelIncome}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.referralIncome}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.bankName}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.bankAcno}
                        </td>
                        <td className="px-6 py-4 text-center text-xs sm:text-sm whitespace-nowrap">
                          {request.ifsc}
                        </td>
                        <td className="noprint px-6 py-4 text-center whitespace-nowrap">
                          <button
                            className="bg-green-600 p-1 px-3 mr-3 rounded-md hover:bg-green-400 text-white text-xs sm:text-sm"
                            onClick={(e) => togglePopup(request, e)}
                          >
                            Accept
                          </button>
                          <button
                            onClick={()=>handleReject(request)}
                            className="bg-red-600 p-1 px-3 mr-3 rounded-md hover:bg-red-400 text-white text-xs sm:text-sm"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No requests from users</p>
          )}
          <button
            className="bg-blue-500 text-white px-8 py-2 mt-4 rounded-md hover:bg-blue-600 font-semibold uppercase shadow-sm shadow-gray-900"
            onClick={printWithdrawRequests}
          >
            Print
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center items-center ">
                <h2 className="text-xl font-semibold mb-4">
                  Are You Sure Confirm to Activate?
                </h2>
                {/* Your form content here */}
                <form
                  action=""
                  className="flex flex-col gap-4 w-[100%] p-4"
                  style={{ width: "100%" }}
                  onSubmit={handleSubmit}
                >
                  {/* <div> */}
                  <input
                    type="text"
                    className="border-[2px]"
                    placeholder="Name"
                    disabled
                    defaultValue={currentRequest.name || ""}
                  />
                  <input
                    type="text"
                    className="border-[2px]"
                    placeholder="Member Id"
                    disabled
                    defaultValue={currentRequest.referralId || ""}
                  />
                  <input
                    type="text"
                    className="border-[2px]"
                    placeholder="Account No"
                    defaultValue={currentRequest.bankAcno || ""}
                  />
                  <input
                    type="date"
                    className="border-[2px]"
                    placeholder="Payment Date"
                    name="date"
                    onChange={payment}
                    required
                  />
                  <input
                    type="text"
                    className="border-[2px]"
                    placeholder="Transaction No"
                    name="transactionNo"
                    onChange={payment}
                    required
                  />
                  <input
                    type="Number"
                    className="border-[2px]"
                    name={
                      currentRequest.levelIncome === 0
                        ? "withdrawRefferalIncome"
                        : "withdrawLevelIncome"
                    }
                    onChange={payment}
                    defaultValue={
                      currentRequest.levelIncome === 0
                        ? currentRequest.referralIncome
                        : currentRequest.levelIncome
                    }
                    required
                  />
                  {/* </div> */}

                  <div className="mt-5 sm:mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-600 p-1 px-10 mr-3 rounded-md hover:bg-green-400 text-white"
                      // onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={togglePopup}
                      className="bg-gray-500 p-1 px-10 mr-3 rounded-md hover:bg-gray-400 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawRequestTable;
