import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';

function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/user/profile', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleSaveChanges = async (updatedData) => {
        try {
            const response = await axios.put('http://localhost:9000/api/user/profile', updatedData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProfileData(response.data);
            setActiveTab('profile');
        } catch (err) {
            console.error('Error updating profile data:', err);
        }
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <div className='pt-5'>
                <div className="tabs flex items-center justify-between gap-5 px-6 sm:px-14 py-4">
                    <button onClick={() => setActiveTab('profile')} className='text-md sm:text-lg font-semibold border-b-2'>Profile</button>
                    <button onClick={() => setActiveTab('edit')} className='text-md sm:text-lg font-semibold border-b-2 flex items-center gap-1'><FaRegEdit />Edit Profile</button>
                </div>
                <div className="tab-content border-gray-800">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error loading data: {error.message}</p>}
                    {profileData && (
                        activeTab === 'profile' ? 
                            <ProfileTab data={profileData} /> : 
                            <EditProfileTab data={profileData} onSaveChanges={handleSaveChanges} />
                    )}
                </div>
            </div>
        </>
    );
}

function ProfileTab({ data }) {
    return (
        <>
            {/* Personal details */}
            <div className='bg-white w-full'>
                <h2 className='sm:text-2xl text-center font-bold uppercase tracking-wide py-4 bg-gray-200 mx-5 xl:mx-12'>Profile Details</h2>
                <div className='bg-[#F4F6F9] mx-5 xl:mx-12 flex flex-col lg:flex-row py-5 justify-center text-md'>
                    <div className='w-full xl:w-1/3 flex justify-center items-center'>
                        <div className='bg-white border-4 border-gray-500 h-[200px] w-[200px] md:h-[250px] md:w-[250px] rounded-[50%]'>
                            <img src={data.photo} alt="" className='rounded-full border-white border-4' />
                        </div>
                    </div>
                    <div className='w-full xl:w-1/3'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 font-semibold'>User Id</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.referralId}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>Referral Id</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.referralId}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>User Name</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.firstName}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>Guardian Name</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.guardian}</p>
                        </div>
                    </div>
                    <div className='w-full xl:w-1/3'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>User Email</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.email}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>DOB</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.dob}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>Mobile</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.mobileNumber}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>User Address</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banking Details */}
            <div className='bg-white w-full mb-10'>
                <h1 className='sm:text-2xl text-center font-bold uppercase tracking-wide py-4 bg-gray-200 mx-5 xl:mx-12'>Banking Details</h1>
                <div className='bg-[#F4F6F9] px-5 py-8 xl:px-14 mx-5 xl:mx-12 flex flex-col lg:flex-row'>
                    <div className='w-full xl:w-1/2'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>Bank Name</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.bankName}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>Account Number</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.bankAcno}</p>
                        </div>
                    </div>
                    <div className='w-full xl:w-1/2'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>IFSC Code</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.ifsc}</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-md font-semibold'>UPI Id</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>{data.upiId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function EditProfileTab({ data, onSaveChanges }) {
    const [formData, setFormData] = useState({
        firstName: data.userName,
        guardian: data.guardianName,
        mobileNumber: data.mobile,
        bankName: data.bankName,
        bankAcno: data.accountNumber,
        ifsc: data.ifscCode,
        upiId: data.upiId,
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveChanges(formData);
    };

    return (
        <div className='bg-white w-full'>
            <div className='flex flex-col justify-center items-center lg:flex-row px-5 '>
                <form onSubmit={handleSubmit} className='lg:w-1/2 w-full justify-center items-center bg-[#F4F6F9] pb-5 m-5 shadow-md border-2 border-gray-300'>
                    <h2 className='text-2xl text-center font-semibold bg-gray-300 py-3'>Update Profile Details</h2>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>User Name</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' name='userName' value={formData.firstName} onChange={handleChange} placeholder="User Name" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>Guardian Name</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' name='guardianName' value={formData.guardian} onChange={handleChange} placeholder="Guardian Name" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>Mobile</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='number' name='mobile' value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile" />
                    </div>
                    <div className='flex justify-center w-full px-5'>
                        <button type='submit' className='w-full py-2 bg-green-700 text-white font-bold text-md mt-2 rounded-lg hover:bg-green-800 transition 2s'>Save Changes</button>
                    </div>
                </form>

                <form onSubmit={handleSubmit} className='lg:w-1/2 w-full justify-center items-center bg-[#F4F6F9] pb-5 m-5 shadow-md border-2 border-gray-300'>
                    <h2 className='text-2xl text-center font-semibold bg-gray-300 py-3'>Update Banking Details</h2>
                    <div className=' rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>Bank Name</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' name='bankName' value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
                    </div>
                    <div className=' rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>Account Number</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='number' name='accountNumber' value={formData.bankAcno} onChange={handleChange} placeholder="Account number" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>IFSC Code</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' name='ifscCode' value={formData.ifsc} onChange={handleChange} placeholder="Enter IFSC" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>UPI Id</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' name='upiId' value={formData.upiId} onChange={handleChange} placeholder="Enter UPI Id" />
                    </div>
                    <div className='flex justify-center w-full px-5'>
                        <button type='submit' className='w-full py-2 bg-green-700 text-white font-bold text-md mt-2 rounded-lg hover:bg-green-800 transition 2s'>Save Changes</button>
                    </div>
                </form>
            </div>

            <div className='bg-white w-full'>
                <div className='flex flex-col justify-center items-center lg:flex-row px-5' >
                    <form onSubmit={handleSubmit} className='lg:w-1/2 w-full justify-center items-center bg-[#F4F6F9] pb-5 m-5 shadow-md border-2 border-gray-300'>
                        <h2 className='text-2xl text-center font-semibold bg-gray-300 py-3'>Change Password</h2>
                        <div className=' rounded-lg my-2 px-5 '>
                            <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>Password</label>
                            <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' name='password' value={formData.password} onChange={handleChange} placeholder="Old Password" />
                        </div>
                        <div className=' rounded-lg my-2 px-5 '>
                            <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>New Password</label>
                            <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='password' name='newPassword' value={formData.newPassword} onChange={handleChange} placeholder="New Password" />
                        </div>
                        <div className=' rounded-lg my-2 px-5 '>
                            <label className='block text-gray-700 font-semibold mb-2 py-1 text-md'>Confirm Password</label>
                            <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                        </div>
                        <div className='flex justify-center w-full px-5'>
                            <button type='submit' className='py-2 px-8 w-full bg-green-700 text-white font-bold text-md mt-2 rounded-lg hover:bg-green-800 transition 2s'>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
