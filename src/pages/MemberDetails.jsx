import React, { useState } from 'react';

const MemberDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [memberDetails, setMemberDetails] = useState([
    {
      memberId: 'MEM001',
      date: '11-jan-2024',
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      address: '123 Street, City',
      phone: '1234567890'
    },
    {
      memberId: 'MEM002',
      date: '20-feb-2024',
      name: 'Jane Smith',
      age: 25,
      email: 'jane@example.com',
      address: '456 Avenue, Town',
      phone: '9876543210'
    },
    {
      memberId: 'MEM003',
      date: '02-mar-2024',
      name: 'Michael Johnson',
      age: 35,
      email: 'michael@example.com',
      address: '789 Road, Village',
      phone: '7890123456'
    }
  ]);

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
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
    );

    const fromDateObject = fromDate ? new Date(fromDate) : null;
    const toDateObject = toDate ? new Date(toDate) : null;
    const memberDateObject = new Date(member.date);

    const matchesDateRange = (
      (!fromDateObject || memberDateObject >= fromDateObject) &&
      (!toDateObject || memberDateObject <= toDateObject)
    );

    return matchesSearchTerm && matchesDateRange;
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">For more</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map(member => (
                    <tr key={member.memberId}>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.memberId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.phone}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          className='bg-blue-800 p-1 px-3 mr-3 rounded-md hover:bg-blue-600 text-white text-xs sm:text-sm'
                          onClick={togglePopup}
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
      {isOpen && (
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
                        <p>Karthikeyan</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Email Id:</h2>
                        <p>karthin951@gmail.com</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Guardian Name:</h2>
                        <p>Murugesan</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Gender:</h2>
                        <p>Male</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>DOB:</h2>
                        <p>12-12-1997</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Mobile no:</h2>
                        <p>9994476524</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Alternate Mobile no:</h2>
                        <p>9994476524</p>
                      </div>

                    </div>

                    <div className='w-full lg:w-1/3 px-3'>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Adhar no:</h2>
                        <p>4499077550220</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Adhar proof:</h2>
                        <p>file</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Nominee Name:</h2>
                        <p>Murugesan</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Nominee Relationship:</h2>
                        <p>Father</p>
                      </div>
                      <div className='address hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Address:</h2>
                        <p>3/385-C, gobalapuram, vkmills, chinnakalayamputhur, palani, dindigul.</p>
                      </div>
                    </div>


                    <div className='w-full lg:w-1/3 px-3'>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Bank Ac.no:</h2>
                        <p>33814913660</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Bank Name:</h2>
                        <p>State bank of india</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Branch:</h2>
                        <p>palani</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>IFSC Code:</h2>
                        <p>SBIN0002241</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Payment Date:</h2>
                        <p>12-12-2024</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Transaction Id:</h2>
                        <p>TRAN58723654283754</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Payment Screenshot:</h2>
                        <p>file</p>
                      </div>
                      <div className='hover:bg-gray-200 rounded flex p-2 gap-2'>
                        <h2 className='text-md font-semibold'>Referral Id:</h2>
                        <p>AK25478</p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="details-btn bg-gray-50 px-4 py-3 sm:px-6 flex gap-3 items-center justify-end mr-12">
                  <button className="bg-green-700 text-white px-8 py-2 rounded-md hover:bg-green-600 font-semibold uppercase" onClick={printUserDetails}>Print</button>
                  <button
                    onClick={togglePopup}
                    className="bg-orange-700 text-white px-8 py-2  rounded-md hover:bg-orange-600 font-semibold uppercase"
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
