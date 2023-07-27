import React, { useState } from "react";
import axios from "axios";
import AdminDonorDashboard from "./AdminDonorDashboard";
import AdminRecipientDashboard from "./AdminRecipientDashboard";
import AdminDonationsDashboard from "./AdminDonationsDashboard";
import AdminFeedbackDashboard from "./AdminFeedbackDashboard";

import { Decrypt } from './EncryptDecrypt';

const secretKey = '5a0d6b84072e0f18342e72e704251a6f041d3e6d4dbaece3d0db9d8906b5c422';

function getUserRoleFromCookie() {
      const userRoleCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userRole='));
      const userRole = userRoleCookie ? Decrypt(userRoleCookie.split('=>')[1], secretKey) : '';
      return userRole;
}


export default function AdminDashboard() {

      const [showAdminDonorDashboard, setShowAdminDonorDashboard] = useState(false);
      const [showAdminRecipientDashboard, setShowAdminRecipientDashboard] = useState(false);
      const [showAdminDonationsDashboard, setShowAdminDonationsDashboard] = useState(false);
      const [showAdminFeedbackDashboard, setShowAdminFeedbackDashboard] = useState(false);


      if (getUserRoleFromCookie() !== 'Admin') {
            return (
                  window.location.href = '/accessforbidden'
            )
      }


      const handleAdminDonorDashboardClick = () => {
            setShowAdminDonorDashboard(true);
            setShowAdminRecipientDashboard(false);
            setShowAdminDonationsDashboard(false);
            setShowAdminFeedbackDashboard(false);
      };

      const handleAdminRecipientDashboardClick = () => {
            setShowAdminDonorDashboard(false);
            setShowAdminRecipientDashboard(true);
            setShowAdminDonationsDashboard(false);
            setShowAdminFeedbackDashboard(false);
      };

      const handleAdminDonationsDashboardClick = () => {
            setShowAdminDonorDashboard(false);
            setShowAdminRecipientDashboard(false);
            setShowAdminDonationsDashboard(true);
            setShowAdminFeedbackDashboard(false);
      };

      const handleAdminFeedbackDashboardClick = () => {
            setShowAdminDonorDashboard(false);
            setShowAdminRecipientDashboard(false);
            setShowAdminDonationsDashboard(false);
            setShowAdminFeedbackDashboard(true);
      };


      function toggleMobileMenu() {
            const mobileMenu = document.querySelector('.mobileMenu');
            mobileMenu.classList.toggle('hidden');
      }


      function handleLogout() {
            // make a request to your backend to logout the user
            axios.post("https://rsb.onrender.com/logout")
                  .then((response) => {
                        // clear all cookies
                        document.cookie.split(";").forEach((c) => {
                              document.cookie = c
                                    .replace(/^ +/, "")
                                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                        });

                        // alert('Logged out successfully')
                        // redirect to the homepage
                        window.location.href = "/";
                  })
                  .catch((error) => {
                        alert('Log out failed')
                        console.error(error);
                  });
      }

      return (
            <section className="flex flex-col justify-between">

                  <section className="flex text-gray-700 gap-2 lg:gap-16 justify-between items-center w-full h-16 px-6 sm:px-10 bg-white bg-opacity-75 bg-gradient-to-r from-rose-200 via-fuchsia-300 to-indigo-400">

                        {/* Searchbar */}
                        <input
                              type="search"
                              className="flex items-center h-10 px-2 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                              placeholder="Search for anything…"
                        />

                        {/* Buttons */}
                        <div className="w-full hidden md:flex justify-between">

                              {/* Show data buttons */}
                              <div className="flex gap-4 lg:gap-8">

                                    <button onClick={handleAdminDonorDashboardClick} className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700">
                                          Donors
                                    </button>
                                    <button onClick={handleAdminRecipientDashboardClick} className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700">
                                          Recipients
                                    </button>
                                    <button onClick={handleAdminDonationsDashboardClick} className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700">
                                          Donations
                                    </button>
                                    <button onClick={handleAdminFeedbackDashboardClick} className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700">
                                          Feedback
                                    </button>

                              </div>

                              {/* Home & Logout */}
                              <div className="hidden md:flex justify-between gap-4">

                                    {/* Back to Home Button */}
                                    <a href='/' className="bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg hover:scale-110">
                                          Home
                                    </a>

                                    {/* Logout Button */}
                                    <button onClick={handleLogout} className="bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg hover:scale-110" >
                                          Logout
                                    </button>

                              </div>

                        </div>

                        {/* Hamburger Menu */}
                        <div className="w-auto md:hidden">

                              <button onClick={toggleMobileMenu} className="flex items-center justify-center w-8 h-8 m-auto rounded-full bg-indigo-600 text-white focus:outline-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                              </button>

                              <div className="mobileMenu hidden bg-indigo-600 text-white absolute right-0 top-16 py-2 px-4 rounded rounded-r-none shadow-md z-50">
                                    <button onClick={handleAdminDonorDashboardClick} className="block py-2 px-2 text-sm hover:bg-indigo-500">Donors</button>
                                    <button onClick={handleAdminRecipientDashboardClick} className="block py-2 px-2 text-sm hover:bg-indigo-500">Recipients</button>
                                    <button onClick={handleAdminDonationsDashboardClick} className="block py-2 px-2 text-sm hover:bg-indigo-500">Donations</button>
                                    <button onClick={handleAdminFeedbackDashboardClick} className="block py-2 px-2 text-sm hover:bg-indigo-500">Feedback</button>
                                    <div className="flex flex-col mt-2 gap-4">
                                          <a href='/' className="bg-green-400 block px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full">
                                                Home
                                          </a>
                                          <button onClick={handleLogout} className="bg-green-400 block px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full">
                                                Logout
                                          </button>
                                    </div>
                              </div>

                        </div>

                  </section>


                  <section>
                        {showAdminDonorDashboard && <AdminDonorDashboard />}
                        {showAdminRecipientDashboard && <AdminRecipientDashboard />}
                        {showAdminDonationsDashboard && <AdminDonationsDashboard />}
                        {showAdminFeedbackDashboard && <AdminFeedbackDashboard />}
                  </section>

            </section>
      );
}
