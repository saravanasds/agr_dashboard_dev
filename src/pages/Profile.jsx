// Profile.js
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserProvider';
import { formatDate } from '../utils/utils';

const Profile = () => {
  const { user, setUser } = useContext(UserContext); // Access user data from context

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  if (!user) {
    return <div>Loading...</div>; // Show loading or redirect to login if no user data is available
  }
  // console.log(user.data)

  return (
    <>
      <div>
      <div className='w-full h-16 bg-[#2d4059] flex justify-between items-center py-3 px-10'>
        <div><span className='sm:text-2xl font-bold uppercase text-white'>Profile</span></div>
        <div className='border-2 border-black rounded-full'>
            <img src="src/assets/1679057404284.jpg" alt="" className='w-12 rounded-full border-2'/>
        </div>
    </div>
      </div>
      {/* Personal details */}
      <div className='bg-white w-full py-8'>
        <h2 className='sm:text-2xl text-center font-bold uppercase tracking-wide py-4 bg-gray-200 mx-5 xl:mx-12'>Profile Details</h2>
        <div className='bg-[#F4F6F9] mx-5 xl:mx-12 flex flex-col lg:flex-row py-5 justify-center text-md'>
          <div className='w-full xl:w-1/3 flex justify-center items-center'>
            <div className='bg-white border-4 border-gray-500 h-[200px] w-[200px] md:h-[250px] md:w-[250px] rounded-[50%]'>
              <img src={`https://agr-backend-m85q.onrender.com/${user.data.photo}`} alt="" className='rounded-full border-white border-4' />
            </div>
          </div>
          <div className='w-full xl:w-1/3'>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 font-semibold'>User Id</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.referralId}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>Referral Id</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.referralId}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>User Name</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.firstName}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>Guardian Name</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.guardian}</p>
            </div>
          </div>
          <div className='w-full xl:w-1/3'>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>User Email</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.email}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>DOB</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{formatDate(user.data.dob)}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>Mobile</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.mobileNumber}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>User Address</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.address}</p>
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
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.bankName}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>Account Number</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.bankAcno}</p>
            </div>
          </div>
          <div className='w-full xl:w-1/2'>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>IFSC Code</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.ifsc}</p>
            </div>
            <div className='hover:bg-gray-200 p-3 rounded-lg my-2'>
              <h2 className='p-2 text-md font-semibold'>Gpay Number</h2>
              <p className='p-2 border hover:border-black rounded-lg'>{user.data.gpayNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
