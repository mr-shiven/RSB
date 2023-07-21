import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSendLocation from './hooks/useSendLocation';

import { Decrypt } from './EncryptDecrypt';

function decrypt(id) {
  const decrypted_id = (id - 42) / 8723456789123456;
  return decrypted_id;
}

const secretKey = '5a0d6b84072e0f18342e72e704251a6f041d3e6d4dbaece3d0db9d8906b5c422';

export default function DonorResponse() {

  useSendLocation();

  const [isAccepted, setIsAccepted] = useState(false);

  const queryParams = new URLSearchParams(window.location.search.split('?')[1]);
  const encrypted_donation_id = queryParams.get('q');
  // console.log(encrypted_donation_id)
  const donationId = decrypt(encrypted_donation_id);
  // console.log(donationId)

  // Get donor email from cookies
  function getAcceptedDonorEmail() {
    const emailCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('email='));
    const email = emailCookie ? Decrypt(emailCookie.split('=>')[1], secretKey) : '';
    return email;
  }

  // Check staus of current request
  function checkDonationStatus() {
    axios.get('http://localhost:4000/check-donation-status', { params: { donationId } })
      .then(response => {
        if (response.data && response.data.length > 0 && response.data[0].status === 'accepted') {
          setIsAccepted(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Check status of current request whenever anything from dependency list [donationId, isAccepted] is updated
  useEffect(() => {
    checkDonationStatus();
  }, [donationId, isAccepted]);


  // Accept Request Button Click
  function handleAccept() {
    const email = getAcceptedDonorEmail();

    if (!email) {
      window.location.href = '/login';
      alert('Please login first');
      return;
    }

    axios.put('http://localhost:4000/donation-accepted', { donationId, email })
      .then(response => {
        console.log("Donation request accepted.");
        alert('Donation request accepted successfully');
        setIsAccepted(true);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${queryParams.get('recipient_latitude')}%2C${queryParams.get('recipient_longitude')}&travelmode=driving`;
        window.location.href = url;
      })
      .catch(error => {
        console.log(error);
      });
  }


  // Reject Request Button Click
  function handleReject() {
    console.log("Donation request rejected.");
    alert('Donation request rejected successfully');
    window.location.href = '/';
  }


  return (
    <div className="mx-5 min-h-screen grid place-content-center">

      {/* Heading */}
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl text-white p-8 text-center h-72 max-w-md mx-auto">
        <h1 className="text-3xl mb-3 font-extrabold">Hi There!</h1>
        <p className="text-xs sm:text-sm font-bold">Your donation of blood could be the difference between life and death for someone in need. It's easy, safe, and costs you nothing but a little time.
          <span className='hidden sm:block'>Please consider donating and giving the gift of life to those who need it most.</span></p>
      </div>

      {/* Card */}
      {!isAccepted ?
        (
          <div className="py-8 bg-white px-4 sm:px-10 text-center rounded-md shadow-lg transform -translate-y-16 max-w-xs mx-auto">

            <h2 className="font-semibold text-2xl mb-6">Give blood, Save life</h2>

            <img className="w-20 h-20 object-cover rounded-full mx-auto" src="./images/card-3.png"
            />

            <p className="capitalize text-xl mt-1 mb-10">Do you wish to donate right now?</p>

            <button
              onClick={handleAccept}
              className="rounded-md bg-gradient-to-r from-green-400 to-green-500 text-xl text-white p-2 mx-2 hover:scale-105">
              Accept
            </button>

            <button
              onClick={handleReject}
              className="rounded-md bg-gradient-to-r from-red-400 to-red-500 text-xl text-white p-2 hover:scale-105">
              Reject
            </button>

          </div>
        )
        :
        (
          <div className="py-8 bg-white px-10 text-center rounded-md shadow-lg transform -translate-y-16 max-w-xs mx-auto">

            <h2 className="font-semibold text-2xl capitalize mb-6">No pending requests right now</h2>

            <img className="w-20 h-20 object-cover rounded-full mx-auto" src="./images/man-gesturing-no.png"
            />

            <p className="capitalize text-xl mt-1 mb-10">You are an inspiration to the world</p>

            <a
              href='/'
              className="rounded-md bg-gradient-to-r from-green-400 to-green-500 text-xl text-white p-2">
              Goto Home
            </a>

          </div>
        )
      }

    </div>
  )
}
