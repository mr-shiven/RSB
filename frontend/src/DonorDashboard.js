import React from 'react';
import axios from 'axios';
import useSendLocation from './hooks/useSendLocation';

import { Decrypt } from './EncryptDecrypt';

const secretKey = '5a0d6b84072e0f18342e72e704251a6f041d3e6d4dbaece3d0db9d8906b5c422';

// GET DONOR'S EMAIL ID FROM COOKIE
function getEmailFromCookie() {
      const emailCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('email='));
      const email = emailCookie ? Decrypt(emailCookie.split('=>')[1], secretKey) : '';
      return email;
}

function getUserRoleFromCookie() {
      const userRoleCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userRole='));
      const userRole = userRoleCookie ? Decrypt(userRoleCookie.split('=>')[1], secretKey) : '';
      return userRole;
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

export default function DonorDashboard() {

      useSendLocation();

      if (getUserRoleFromCookie() !== 'Donor') {
            return (
                  window.location.href = '/accessforbidden'
            )
      }

      return (
            <section className="bg-gray-900 text-white">

                  <div className="mx-auto w-full px-4 py-32 flex h-full md:h-[100vh] items-center">

                        <div className="mx-auto w-full text-center">

                              {/* Welcome line */}
                              <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl sm:font-extrabold text-transparent mb-10 sm:text-5xl">
                                    Welcome! {getEmailFromCookie().split('@')[0]}
                                    <br />
                                    <span className=" text-xl sm:block pt-4">
                                          Applause! You are an inspiration to the world!
                                    </span>
                              </h1>

                              {/* Message */}
                              <div className="mx-auto font-mullish mt-4 w-[90%] sm:w-[53%] space-y-4 sm:text-xl/relaxed">
                                    <p>
                                          Your generosity has the power to save lives and make a significant difference in the world.
                                          Your noble contribution is a testament to the kindness and compassion of humanity, and we applaud you for being a part of it.
                                    </p>

                                    <p>
                                          It takes special individuals like you to make such a valuable contribution to society, and we are grateful for your dedication to helping others.
                                    </p>

                                    <p>
                                          Thank you for being a shining example of humanity's best qualities and for making a positive impact on the lives of those in need.
                                    </p>

                              </div>

                              {/* Button group */}
                              <div className="mt-8 flex flex-wrap justify-center gap-4">
                                    <a href="/" className="block w-full rounded border border-blue-600 bg-blue-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
                                          Home
                                    </a>

                                    <a href="/donatemoney" className="block w-full rounded border border-blue-600 bg-green-600 px-8 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">
                                          Feed the Hungry
                                    </a>

                                    <a href="mailto:rakhtsashaktbharat@gmail.com" className="block w-full rounded border border-blue-600 bg-zinc-600 px-8 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">
                                          Contact Admin
                                    </a>

                                    <a onClick={handleLogout} className="block w-full rounded border border-blue-600 bg-red-700 px-8 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">
                                          Logout
                                    </a>
                              </div>

                        </div>

                  </div>

            </section>

      )
}
