import React, { useState } from 'react';
import Header from "../components/Header"
import { FaRegEdit } from "react-icons/fa";


function ProfileTab() {
    return (
        <>

            {/* Personal details */}
            <div className='bg-white  w-full'>
                <h2 className='text-2xl text-center font-semibold uppercase tracking-wide py-4 bg-gray-200 mx-5 xl:mx-12'>Profile Details</h2>
                <div className='bg-[#F4F6F9] mx-5 xl:mx-12 flex flex-col lg:flex-row py-5 justify-center'>

                    <div className='w-full xl:w-1/3 flex justify-center items-center' >
                        <div className='bg-white border-4 border-gray-500 h-[200px] w-[200px] md:h-[250px] md:w-[250px] rounded-[50%] '>
                            <img src="src/assets/1679057404284.jpg" alt="" className='rounded-full border-white border-4' />
                        </div>
                    </div>

                    <div className='w-full xl:w-1/3'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>User Id</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>159753</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>Referral Id</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>User Name</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>Guardian Name</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                    </div>

                    <div className='w-full xl:w-1/3'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>User Email</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>DOB</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>Mobile</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>User Address</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Banking Details */}
            <div className='bg-white w-full mb-10' >
                <h1 className='text-2xl text-center font-semibold uppercase tracking-wide py-4 bg-gray-200 mx-5 xl:mx-12'>Banking Details</h1>
                <div className='bg-[#F4F6F9] px-5 py-8 xl:px-14 mx-5 xl:mx-12 flex flex-col lg:flex-row'>
                    <div className='w-full xl:w-1/2'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>Bank Name</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>Account Number</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                    </div>

                    <div className='w-full xl:w-1/2'>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>IFSC Code</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                        <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
                            <h2 className='p-2 text-xl font-semibold'>UPI Id</h2>
                            <p className='p-2 border hover:border-black rounded-lg'>Lorem, ipsum.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* KYC Details */}

        </>
    );
}

function EditProfileTab() {
    return (
        <div className='bg-white w-full'>
            <div className='flex flex-col justify-center items-center lg:flex-row px-5 '>
                {/* User Profile */}
                <form className='lg:w-1/2 w-full justify-center items-center bg-[#F4F6F9] pb-5 m-5 shadow-md border-2 border-gray-300'>
                    <h2 className='text-2xl text-center font-semibold bg-gray-300 py-3'>Update Profile Details</h2>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>User Name</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' placeholder="User Name" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>Guardian Name</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' placeholder="Guardian Name" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>Mobile</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='number' placeholder="Mobile" />
                    </div>
                    <div className='flex justify-center w-full px-5'>
                        <button className='w-full py-2 bg-green-700 text-white font-bold text-xl mt-2 rounded-lg hover:bg-green-800 transition 2s'>Save Changes</button>
                    </div>
                </form>

                {/* Banking */}
                <form className='lg:w-1/2 w-full justify-center items-center bg-[#F4F6F9] pb-5 m-5 shadow-md border-2 border-gray-300'>
                    <h2 className='text-2xl text-center font-semibold bg-gray-300 py-3'>Update Banking Details</h2>
                    <div className=' rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>Bank Name</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' placeholder="Bank Name" />
                    </div>
                    <div className=' rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>Account Number</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='number' placeholder="Account number" />
                    </div>
                    <div className='rounded-lg my-2 px-5'>
                        <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>IFSC Code</label>
                        <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' placeholder="Enter IFSC" />
                    </div>
                    <div className='flex justify-center w-full px-5'>
                        <button className='w-full py-2 bg-green-700 text-white font-bold text-xl mt-2 rounded-lg hover:bg-green-800 transition 2s'>Save Changes</button>
                    </div>
                </form>
            </div>

            <div className='bg-white w-full'>
                {/* Password */}
                <div className='flex flex-col justify-center items-center lg:flex-row px-5' >
                    <form className='lg:w-1/2 w-full justify-center items-center bg-[#F4F6F9] pb-5 m-5 shadow-md border-2 border-gray-300'>
                        <h2 className='text-2xl text-center font-semibold bg-gray-300 py-3'>Change Password</h2>
                        <div className=' rounded-lg my-2 px-5 '>
                            <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>Password</label>
                            <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='text' placeholder="Old Password" />
                        </div>
                        <div className=' rounded-lg my-2 px-5 '>
                            <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>New Password</label>
                            <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='password' placeholder="New Password" />
                        </div>
                        <div className=' rounded-lg my-2 px-5 '>
                            <label className='block text-gray-700 font-semibold mb-2 py-1 text-xl'>Confirm Password</label>
                            <input className='p-2 border hover:border-[#E3E4E8] rounded-lg w-full' type='password' placeholder="Confirm Password" />
                        </div>
                        <div className='flex justify-center w-full px-5'>
                            <button className='py-2 px-8 w-full bg-green-700 text-white font-bold text-xl mt-2 rounded-lg hover:bg-green-800 transition 2s'>Save Changes</button>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
}

function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <>
        <div>
            <Header/>
        </div>
            <div className=' pt-5'>
                <div className="tabs flex items-center justify-between gap-5 px-14 py-4">
                    <button onClick={() => setActiveTab('profile')} className='text-lg font-semibold  border-b-2 '>Profile</button>
                    <button onClick={() => setActiveTab('edit')} className='text-lg font-semibold  border-b-2 flex items-center gap-1'><FaRegEdit />Edit Profile</button>
                </div>
                <div className="tab-content border-gray-600">
                    {activeTab === 'profile' ? <ProfileTab /> : <EditProfileTab />}
                </div>
            </div>
        </>
    );
}

export default ProfilePage;