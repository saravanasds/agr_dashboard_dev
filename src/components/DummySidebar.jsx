import React, { useState, useEffect } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
}from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { IoGiftSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import ProgressSteper from '../Kyc-form/ProgressSteper';
import agrlogo from '../../public/assets/logos/agr logo.png'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 568);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 568); // Set isMobile based on window width
    const toggle = () => {
        if (!isMobile) { // Toggle sidebar only if it's not in mobile view
            setIsOpen(!isOpen);
        }
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth < 568); 
        setIsOpen(window.innerWidth > 568)   // Update isMobile when window is resized
    };

    // Listen for window resize events
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItem=[
        {
            path:"#",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"#",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"#",
            name:"Level Position",
            icon:<FaRegChartBar/>
        },
        {
            path:"#",
            name:"Wallet",
            icon:<GiWallet/>
        },
        {
            path:"#",
            name:"Withdraw Request",
            icon:<BiMoneyWithdraw/>
        },
        {
            path:"#",
            name:"Payment History",
            icon:<FaMoneyCheckDollar/>
        },
        {
            path:"#",
            name:"Rewards",
            icon:<IoGiftSharp/>
        },
    ];

    return (
        <div className="flex w-full">
            <div style={{ width: isOpen ? "250px" : "40px", minWidth: isOpen ? "250px" : "40px" }} className="sidebar bg-black min-h-screen text-white transition-all duration-500 fixed">
                <div className="top_section flex items-center py-[20px] " style={{ marginBottom: isOpen ? "15px" : "60px" }}>
                    <img src={agrlogo} alt="" style={{ display: isOpen ? "block" : "none" }} className="logo w-[85px] sm:w-[100px] ml-14 sm:ml-16 mt-5" />
                    <div style={{ marginTop: isOpen ? "15px" : "20px", fontSize: isOpen? "30px" : "25px", marginLeft: isOpen ? "16px" : "7px" }} className="bars flex justify-center items-center text-3xl cursor-pointer hover:text-blue-400 absolute ">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link flex items-center py-[10px] px-[18px] gap-[15px] text-green-300 hover:bg-green-400 hover:text-[#000] transition-all duration-500 mb-5 " activeclassName="active" style={{ justifyContent: isOpen? "start" : "center" }}>
                            <div className="icon" style={{ fontSize: isOpen? "25px" : "20px"}} >{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text text-md text-white font-semibold hover:text-black">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <div className="main-container w-full transition-all duration-500" style={{ overflowY: "auto", marginLeft: isOpen ? "250px" : "40px" }}>
                <main className='w-full'><ProgressSteper/></main>
            </div>
        </div>
    );
};

export default Sidebar;
