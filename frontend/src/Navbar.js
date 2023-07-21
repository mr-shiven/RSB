import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';


const rememberMeCookie = document.cookie.split('; ').find(cookie => {
    const cookieValue = cookie.split('=')[1];
    return cookie.startsWith('remember_me=') && (cookieValue === 'true' || cookieValue === 'false');
});

function handleLogout() {
    // make a request to your backend to logout the user
    axios.post("http://localhost:4000/logout")
        .then((response) => {
            // clear all cookies
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });

            alert('Logged out successfully')
            // redirect to the homepage
            window.location.href = "/";
        })
        .catch((error) => {
            alert('Log out failed')
            console.error(error);
        });
}


function Navbar() {

    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isFirstSvgVisible, setIsFirstSvgVisible] = useState(true);

    const toggleNavbar = () => {
        setIsNavbarVisible(!isNavbarVisible);
        setIsFirstSvgVisible(!isFirstSvgVisible);
    };


    return (
        <nav className="bg-gradient-to-r from-gray-700 via-gray-900 to-black">

            <div className="relative w-full mx-auto flex items-center justify-between">

                {/* Logo */}
                <a href="/" className="cursor-pointer py-2">
                    <img
                        src="./images/blood-donation-icon.png"
                        alt="Logo"
                        className="lg:w-20 lg:h-20 ml-6 w-16 h-16"
                    />
                </a>

                {/* Nav Options */}
                <div className="hidden lg:flex">

                    {/* Links */}
                    <ul className="flex mr-[50px] space-x-6">

                        <Link to='/'>
                            <li className="text-white font-mullish py-7 hover:text-lightRed  cursor-pointer transition-all duration-200 relative group">
                                Home
                                <div className="absolute bottom-0 w-full h-1 bg-lightRed hidden group-hover:block transition-all duration-200">
                                </div>
                            </li>
                        </Link>

                        <Link to='/donatemoney'>
                            <li className="text-white font-mullish py-7 hover:text-lightRed cursor-pointer transition-all duration-200 relative group">
                                Feed the Hungry
                                <div className="absolute bottom-0 w-full h-1 bg-lightRed hidden group-hover:block transition-all duration-200"></div>
                            </li>
                        </Link>

                        <Link to='/ourteam'>
                            <li className="text-white font-mullish py-7 hover:text-lightRed cursor-pointer transition-all duration-200 relative group">
                                Our Team
                                <div className="absolute bottom-0 w-full h-1 bg-lightRed hidden group-hover:block transition-all duration-200"></div>
                            </li>
                        </Link>

                    </ul>

                    {/* Buttons */}
                    <div className="flex gap-6 mr-4">
                        {/* Country Logo*/}
                        <img
                            src="./images/india-flag.svg"
                            width="40px"
                            height="40px"
                            alt="India's Flag"
                            className="pt-2"
                        />

                        {/* Login Button */}
                        {rememberMeCookie === undefined &&
                            <Link to="/login">
                                <button className="text-white font-mullish border-lightRed border-2 hover:border-green-500 rounded-xl hover:bg-green-500  px-3 text-sm font-bold
                                hover:text-white flex items-center h-[60%] mt-4"
                                >
                                    Log In
                                    <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="w-[14px] h-[14px] ml-3"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        }

                        {/* Register Button */}
                        {rememberMeCookie === undefined &&
                            <Link to="/register">
                                <button className="border-lightRed text-white font-mullish border-2 hover:border-blue-500 rounded-xl px-4 text-sm font-bold transition-all duration-200 hover:text-white hover:bg-blue-500 flex items-center h-[60%] mt-4">
                                    Register Now
                                    <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="w-[14px] h-[14px] ml-3"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        }


                        {/* Dashboard Button */}
                        {rememberMeCookie &&
                            <Link to="/login">
                                <button className="text-white font-mullish border-lightRed border-2 hover:border-green-500 rounded-xl hover:bg-green-500  px-3 text-sm font-bold
                                hover:text-white flex items-center h-[60%] mt-4"
                                >
                                    Dashboard
                                    <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="w-[14px] h-[14px] ml-3"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        }

                        {/* Logout Button */}
                        {rememberMeCookie &&
                            <button onClick={handleLogout} className="text-white font-mullish border-lightRed border-2 hover:border-green-500 rounded-xl hover:bg-green-500  px-6 text-sm font-bold
                                hover:text-white flex items-center h-[60%] mt-4"
                            >
                                Logout
                            </button>
                        }

                    </div>

                </div>

                {/* Hamburger Menu */}
                <div className="flex lg:hidden">

                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-hamburger"
                            aria-expanded={isNavbarVisible}
                            onClick={toggleNavbar}
                        >
                            {isFirstSvgVisible ? (
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="red"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M1 1l15 12M16 1L1 13"
                                    />
                                </svg>
                            )}


                        </button>

                        <div className={`w-full ${isNavbarVisible ? '' : 'hidden'}`}>

                            {/* Links */}
                            <ul className="flex flex-col font-medium mt-4 rounded-lg rounded-r-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700 absolute top-16 right-0 overflow-y-auto z-50">
                                <li>
                                    <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="donatemoney" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Donate Food
                                    </a>
                                </li>
                                <li>
                                    <a href="ourteam" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                        Our Team
                                    </a>
                                </li>
                                <li>
                                    {rememberMeCookie === undefined &&
                                        <a href="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Login
                                        </a>
                                    }
                                </li>
                                <li>
                                    {rememberMeCookie === undefined &&
                                        <a href="/register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Register
                                        </a>
                                    }
                                </li>
                                <li>
                                    {rememberMeCookie &&
                                        <a href="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Dashboard
                                        </a>
                                    }
                                </li>
                                <li>
                                    {rememberMeCookie &&
                                        <a href="/login" onClick={handleLogout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Logout
                                        </a>
                                    }
                                </li>
                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
