import React from 'react'

function Header() {
  return (
    <div className='w-full h-16 bg-gray-400 flex justify-between items-center py-3 px-10'>
        <div><span className='text-2xl font-bold uppercase'>Your Level : 3</span></div>
        <div className='border-2 border-black rounded-full'>
            <img src="src/assets/1679057404284.jpg" alt="" className='w-12 rounded-full border-2'/>
        </div>
    </div>
  )
}

export default Header