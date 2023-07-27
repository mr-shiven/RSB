import React from "react";
// import "./index.css";

function Footer() {
    return (
        <footer className="flex flex-col overflow-hidden">

            {/* Main */}
            <div className="text-white py-6 px-2 sm:px-8 flex flex-wrap justify-between items-center bg-gradient-to-tr from-purple-400 via-white-200 to-indigo-400">

                {/* Logo */}
                <a href="/" className="cursor-pointer lg:flex hidden">
                    <img
                        src="./images/logo-compass-crop.png"
                        alt="Logo"
                        className="rounded-[200px] w-40 h-40"
                    />
                </a>

                <div className="flex flex-wrap gap-16 justify-center items-center text-deepBlue">

                    {/* Navigation */}
                    <div className="">
                        <h2 className="font-extrabold font-mullish text-xl">Quick Links</h2>

                        <ul className="mt-2">
                            <li>
                                <a href="/">Home</a>
                            </li>

                            <li>
                                <a href="/donatemoney">Feed the Hungry</a>
                            </li>

                            <li>
                                <a href="/login">Login</a>
                            </li>

                            <li>
                                <a href="/register">Register</a>
                            </li>
                        </ul>

                    </div>

                    {/* Company */}
                    <div className="">
                        <h2 className="font-extrabold font-mullish text-xl">Rakht-Sashakt</h2>

                        <ul className="mt-2">
                            <li>
                                <a href="#">Legal</a>
                            </li>

                            <li>
                                <a href="#">Terms & Conditions</a>
                            </li>

                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>

                            <li>
                                <a href="#">Cookies Policy</a>
                            </li>
                        </ul>
                    </div>

                    {/* Reach Us */}
                    <div className="">
                        <h2 className="font-extrabold font-mullish text-xl">Reach Us</h2>

                        <ul className="mt-2">
                            <li>
                                <a href="tel:+911234567890">+91 1234567890</a>
                            </li>

                            <li>
                                <a href="mailto:rakhtsashaktbharat@gmail.com">rakhtsashaktbharat@gmail.com</a>
                            </li>
                        </ul>


                        {/* Social Media Icons */}
                        <div className="flex gap-7 mt-4">
                            <img src="./images/facebook.png" className="w-10 hover:scale-125" />
                            <img src="./images/twitter.png" className="w-10 hover:scale-125" />
                            <img src="./images/instagram.png" className="w-10 hover:scale-125" />
                            <img src="./images/linkedin.png" className="w-10 hover:scale-125" />
                        </div>

                    </div>

                    {/* Logo */}
                    <div className="">
                        <a href="/" className="cursor-pointer flex lg:hidden">
                            <img
                                src="./images/logo-compass-crop.png"
                                alt="Logo"
                                className="rounded-[200px] w-40 h-40"
                            />
                        </a>
                    </div>

                </div>

            </div>

            {/* Copyright */}
            <div className="bg-deepRed h-auto text-white">
                <span className="hidden sm:flex justify-center mt-2">&copy;2023 Rakht-Sashakt-Bharat: Network of Blood Donors.&nbsp;&nbsp;All Rights Reserved.</span>
                <span className="sm:hidden flex justify-center mt-2">&copy;2023 Rakht-Sashakt-Bharat.&nbsp;&nbsp;All Rights Reserved.</span>
            </div>

        </footer>
    );
}

export default Footer;
