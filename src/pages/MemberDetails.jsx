import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState(null);
  const [memberDetails, setMemberDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        console.log(token);
        const response = await axios.get('http://localhost:9000/api/admin/allUsers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.result;
        console.log(data);
        if (data.length > 0) {
          setMemberDetails(data);
        } else {
          setMemberDetails([]);
          setError('Users not found');
        }
      } catch (error) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const totalMembers = memberDetails.length;
    localStorage.setItem('totalMembers', totalMembers);
  }, [memberDetails]);



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const filteredMembers = memberDetails.filter(member => {
    const matchesSearchTerm = (
      member.referralId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.mobileNumber.includes(searchTerm)
    );

    const fromDateObject = fromDate ? new Date(fromDate) : null;
    const toDateObject = toDate ? new Date(toDate) : null;
    const memberDateObject = new Date(member.updatedAt);

    const matchesDateRange = (
      (!fromDateObject || memberDateObject >= fromDateObject) &&
      (!toDateObject || memberDateObject <= toDateObject)
    );

    return matchesSearchTerm && matchesDateRange;
  });

  const togglePopup = (memberDetails) => {
    setSelectedUser(memberDetails);
    setIsOpen(!isOpen);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
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
            .details{
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 30px
            }
            .details-btn{
                display: none
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

  return (
    <>
      <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
        <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Members Details</h1>
      </div>

      <div className="mx-auto px-4 py-8 bg-gray-300 min-h-screen">
        <div className="w-full flex flex-col xl:flex-row justify-between items-center bg-gray-400 py-4 pb-6 px-8 mb-6 rounded-md shadow-md shadow-[#2d4059]">
          <div className='w-full lg:w-[90%] xl:w-[380px] mb-3 xl:mb-0'>
            <label className="text-md font-semibold">Search Member Details:</label>
            <input
              type="text"
              placeholder="Search by Member ID or Phone Number"
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-md mr-4 w-full"
            />
          </div>
          <div className='w-full xl:w-auto flex flex-col lg:flex-row justify-evenly items-center gap-2'>
            <div className='w-full lg:w-auto'>
              <label className="text-md font-semibold">From Date:</label>
              <input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                className="px-4 py-2 border rounded-md mr-4 w-full"
              />
            </div>
            <div className='w-full lg:w-auto'>
              <label className="text-md font-semibold">To Date:</label>
              <input
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                className="px-4 py-2 border rounded-md w-full"
              />
            </div>
          </div>
        </div>

        {filteredMembers.length === 0 ? (
          <p className="text-red-500">No member found with the given ID or Phone Number.</p>
        ) : (
          <div className='w-full flex justify-center items-center'>
            <div className="overflow-auto w-full">
              <table className="min-w-full">
                <thead className="bg-[#455d7a]">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">For more</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member, index) => (
                    <tr key={member.memberId}>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{formatDate(member.updatedAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.referralId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.mobileNumber}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          className='bg-blue-800 p-1 px-3 mr-3 rounded-md hover:bg-blue-600 text-white text-xs sm:text-sm'
                          onClick={() => togglePopup(member)}
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
        )}
      </div>
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
    </>
  );
};

export default MemberDetails;
