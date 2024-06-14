import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MemberStatus() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [members, setMembers] = useState([]);
    // const members = [{
    //     memberId: 'MEM001',
    //     date: '11-jan-2024',
    //     name: 'John Doe',
    //     level: 3,
    //     referrals: '5',
    //     earning: '1500',
    //     walletBallence: '3000',
    //     phone: '1234567890'
    // },
    // {
    //     memberId: 'MEM002',
    //     date: '20-feb-2024',
    //     name: 'Jane Smith',
    //     level: 2,
    //     referrals: '4',
    //     earning: '1000',
    //     walletBallence: '2000',
    //     phone: '9876543210'
    // },
    // {
    //     memberId: 'MEM003',
    //     date: '02-mar-2024',
    //     name: 'Michael Johnson',
    //     level: 1,
    //     referrals: '2',
    //     earning: '0',
    //     walletBallence: '1000',
    //     phone: '7890123456'
    // }];

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
                    setMembers(data);
                } else {
                    setMembers([]);
                    setError('Users not found');
                }
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    console.log(members)

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        const filtered = members.filter(member =>
            member.referralId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.mobileNumber.includes(searchTerm)
        );
        setFilteredMembers(filtered);
    };
    console.log(filteredMembers)

    return (
        <>
            <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
                <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Members Status</h1>
            </div>
            <div className="mx-auto px-4 py-8 bg-gray-300 min-h-screen">
                <div className="">
                    <div className='w-full flex flex-col md:flex-row justify-around items-center bg-gray-400 py-4 px-8 mb-6 rounded-md shadow-md shadow-[#2d4059]'>
                        <h1 className="text-md md:text-xl font-bold mb-1 md:mb-0 w-full md:w-/2 lg:w-1/3">Search Member Status</h1>
                        <div className="mb-2 md:mb-0 w-full md:w-/2 lg:w-2/3">
                            <input
                                type="text"
                                placeholder="Search by Member ID, Name, or Phone Number"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="border border-gray-400 rounded px-4 py-2 w-full"
                            />
                        </div>
                    </div>
                    {filteredMembers.length === 0 && searchTerm !== '' && (
                        <p className="text-red-500">No member found with the given details.</p>
                    )}
                    {filteredMembers.length > 0 && (
                        <div className='w-full flex justify-center items-center'>
                            <div className="overflow-auto w-[100%]">
                                <table className="w-full border-collapse border border-gray-400">
                                    <thead className="bg-[#455d7a]">
                                        <tr>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Member ID</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Act.Date</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Level</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Referrals</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Earnings</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Wallet Balance</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredMembers.map(member => (
                                            <tr key={member.memberId}>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.referralId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.firstName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.level}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.referredPeoples.length}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.amount - 5000}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.walletBallence}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MemberStatus;