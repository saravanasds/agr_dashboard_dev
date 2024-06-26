import React, { useState, useEffect } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
} from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import agrlogo from '../../public/assets/logos/agr logo.png'

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 568);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 568); // Set isMobile based on window width
    const navigate = useNavigate();
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

    const menuItem = [
        {
            path: "/userDashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/profile",
            name: "Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/level",
            name: "Level Position",
            icon: <FaRegChartBar />
        },
        {
            path: "/wallet",
            name: "Wallet",
            icon: <GiWallet />
        },
        {
            path: "/withdrawRequest",
            name: "Withdraw Request",
            icon: <BiMoneyWithdraw />
        },
        {
            path: "/paymentHistory",
            name: "Payment History",
            icon: <FaMoneyCheckDollar />
        },
        {
            name: "Logout",
            icon: <RiLogoutCircleRLine />,
            action: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/userLogin");
            }
        },
    ];

    return (
        <div className="flex w-full">
            <div style={{ width: isOpen ? "250px" : "40px", minWidth: isOpen ? "250px" : "40px" }} className="sidebar bg-black min-h-screen text-white transition-all duration-500 fixed">
                <div className="top_section flex items-center py-[20px] " style={{ marginBottom: isOpen ? "15px" : "60px" }}>
                    <img src={agrlogo} alt="" style={{ display: isOpen ? "block" : "none" }} className="logo w-[85px] sm:w-[100px] ml-14 sm:ml-16 mt-5" />
                    <div style={{ marginTop: isOpen ? "15px" : "20px", fontSize: isOpen ? "30px" : "25px", marginLeft: isOpen ? "16px" : "7px" }} className="bars flex justify-center items-center text-3xl cursor-pointer hover:text-blue-400 absolute ">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        item.path ? (
                            <NavLink to={item.path} key={index} className="link flex items-center py-[10px] px-[18px] gap-[15px] text-green-300 hover:bg-green-400 hover:text-[#000] transition-all duration-500 mb-5 " activeClassName="active" style={{ justifyContent: isOpen ? "start" : "center" }}>
                                <div className="icon" style={{ fontSize: isOpen ? "25px" : "20px" }} >{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text text-md text-white font-semibold hover:text-black">{item.name}</div>
                            </NavLink>
                        ) : (
                            <button onClick={item.action} key={index} className="link flex items-center py-[10px] px-[18px] gap-[15px] text-green-300 hover:bg-green-400 hover:text-[#000] transition-all duration-500 mb-5 " style={{ justifyContent: isOpen ? "start" : "center", width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                <div className="icon" style={{ fontSize: isOpen ? "25px" : "20px" }} >{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text text-md text-white font-semibold hover:text-black">{item.name}</div>
                            </button>
                        )
                    ))
                }
            </div>
            <div className="main-container w-full transition-all duration-500" style={{ overflowY: "auto", marginLeft: isOpen ? "250px" : "40px" }}>
                <main className='w-full'>{children}</main>
            </div>
        </div>
    );
};

export default Sidebar;
