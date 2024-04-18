import React, { useState } from 'react';
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


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/level",
            name:"Level Position",
            icon:<FaRegChartBar/>
        },
        {
            path:"/wallet",
            name:"Wallet",
            icon:<GiWallet/>
        },
        {
            path:"/withdrawRequest",
            name:"Withdraw Request",
            icon:<BiMoneyWithdraw/>
        },
        {
            path:"/paymentHistory",
            name:"Payment History",
            icon:<FaMoneyCheckDollar/>
        },
        {
            path:"/rewards",
            name:"Rewards",
            icon:<IoGiftSharp/>
        },
    ]
    return (
        <div className="flex w-full">
           <div style={{width: isOpen ? "250px" : "70px"}} className="sidebar bg-black min-h-screen text-white transition-all duration-500 relative">
               <div className="top_section flex items-center py-[20px] " style={{marginBottom: isOpen ? "15px" : "60px"}}>
                   <img src="src/assets/agr logo.png" alt="" style={{display: isOpen ? "block" : "none"}} className="logo w-[85px] sm:w-[100px] ml-14 sm:ml-16 mt-5" />
                   <div style={{marginTop: isOpen ? "15px" : "20px"}} className="bars flex text-3xl cursor-pointer hover:text-blue-400 absolute ml-[16px]">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link flex items-center py-[10px] px-[18px] gap-[15px] text-green-300 hover:bg-green-400 hover:text-[#000] transition-all duration-500 mb-5 " activeclassName="active">
                           <div className="icon text-2xl">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text text-md text-white font-semibold hover:text-black">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className='w-full'>{children}</main>
        </div>
    );
};

export default Sidebar;