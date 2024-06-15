import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MemberStatus() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get('http://localhost:9000/api/admin/allUsers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.result;
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

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        filterMembers(searchTerm, selectedLevel);
    };

    const handleLevelChange = (event) => {
        const level = event.target.value;
        setSelectedLevel(level);
        filterMembers(searchTerm, level);
    };

    const filterMembers = (searchTerm, level) => {
        let filtered = members;
        if (searchTerm) {
            filtered = filtered.filter(member =>
                member.referralId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.mobileNumber.includes(searchTerm) ||
                member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (level) {
            filtered = filtered.filter(member => member.level === parseInt(level));
        }
        setFilteredMembers(filtered);
        setCurrentPage(1);  // Reset to first page whenever filter changes
    };

    const handleRowClick = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMember(null);
    };

    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentMembers = filteredMembers.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage);

    return (
        <>
            <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
                <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Members Status</h1>
            </div>
            <div className="mx-auto px-4 py-8 bg-gray-300 min-h-screen">
                <div className="">
                    <div className='w-full flex flex-col md:flex-row justify-around items-center gap-4 bg-gray-400 py-4 px-8 mb-6 rounded-md shadow-md shadow-[#2d4059]'>
                        <h1 className="text-md md:text-xl font-bold mb-1 md:mb-0 w-full md:w-/2 lg:w-1/3">Search Member Status</h1>
                        <div className="mb-2 md:mb-0 w-full md:w-/2 lg:w-2/3">
                            <input
                                type="text"
                                placeholder="Search by Member ID, Name or Phone Number"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="border border-gray-400 rounded px-4 py-2 w-full"
                            />
                        </div>
                        <div className="mb-2 md:mb-0 w-full md:w-/2 lg:w-1/3">
                            <select
                                value={selectedLevel}
                                onChange={handleLevelChange}
                                className="border border-gray-400 rounded px-4 py-2 w-full"
                            >
                                <option value="">All Levels</option>
                                {[...Array(10).keys()].map(level => (
                                    <option key={level + 1} value={level + 1}>Level {level + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filteredMembers.length === 0 && searchTerm !== '' && (
                        <p className="text-red-500">No member found with the given details.</p>
                    )}
                    {filteredMembers.length > 0 && (
                        <>
                            <div className="mb-4 text-center">
                                <p className="text-lg font-medium">Total Members Found: {filteredMembers.length}</p>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <div className="overflow-auto w-[100%]">
                                    <table className="w-full border-collapse border border-gray-400">
                                        <thead className="bg-[#455d7a]">
                                            <tr>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Sl.no</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Member ID</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Level</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Referrals</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Earnings</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentMembers.map((member, index) => (
                                                <tr key={index} onClick={() => handleRowClick(member)} className="cursor-pointer">
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.referralId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.firstName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.level}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.referredPeoples.length} members</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm">{member.amount - 5000}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-1 rounded text-xs ${currentPage === 1 ? 'bg-gray-200' : 'bg-gray-400 text-white'}`}
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-1">{currentPage} / {totalPages}</span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-1 rounded text-xs ${currentPage === totalPages ? 'bg-blue-400' : 'bg-blue-500 text-white'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {showModal && selectedMember && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                            <h2 className="text-xl font-semibold mb-4">Referred People Details of {selectedMember.firstName}</h2>

                            <table className="w-full border-collapse border border-gray-400 text-center">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 border">Sl.no</th>
                                        <th className="px-4 py-2 border">Member ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedMember.referredPeoples.map((referral, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border">{index + 1}</td>
                                            <td className="px-4 py-2 border">{referral}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='w-full text-center'>
                                <button className="w-full mt-4 px-4 py-1 bg-gray-400 text-white rounded" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default MemberStatus;
