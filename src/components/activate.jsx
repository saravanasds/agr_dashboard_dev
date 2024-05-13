import React from 'react'
import { useParams } from "react-router-dom";

function activate() {

    const { activationToken } = useParams(); // Get activation token from URL

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            activate
        </div>
    )
}

export default activate