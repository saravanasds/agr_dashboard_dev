import React, { useState } from 'react'
import ActiveUser from "./ActiveUser"
import InactiveUser from './InactiveUser'

const AcActivation = () => {
    const [activeTab, setActiveTab] = useState('inactivate');

    return (
        <>
            <div className='bg-gray-300'>

                <div>
                    <div className='text-left w-full bg-[#2d4059] border-[1px] border-gray-500'>
                        <h1 className='sm:text-2xl text-white font-bold py-3 px-10 uppercase tracking-wider'>Account Activation</h1>
                    </div>
                </div>
                <div className='pt-5'>
                    <div className="w-full flex items-center justify-center py-4">
                        <button
                            onClick={() => setActiveTab('inactivate')}
                            className={`text-sm sm:text-lg font-semibold sm:px-12 px-6 py-1 ${activeTab === 'inactivate' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
                        >
                            Inactivate Members
                        </button>
                        <button
                            onClick={() => setActiveTab('activate')}
                            className={`text-sm sm:text-lg font-semibold sm:px-12 px-6 py-1 ${activeTab === 'activate' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
                        >
                            Activate Members
                        </button>
                    </div>
                    <div className="tab-content border-gray-600">
                        {activeTab === 'activate' ? <ActiveUser /> : <InactiveUser />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AcActivation;
