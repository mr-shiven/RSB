import React, { useState } from 'react';
import axios from 'axios';
import PotentialDonorsChildComponent from './PotentialDonorsChildComponent';

import { Decrypt } from './EncryptDecrypt';


const secretKey = '5a0d6b84072e0f18342e72e704251a6f041d3e6d4dbaece3d0db9d8906b5c422';

function getUserRoleFromCookie() {
    const userRoleCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userRole='));
    const userRole = userRoleCookie ? Decrypt(userRoleCookie.split('=>')[1], secretKey) : '';
    return userRole;
}

// Set required attribute for radio buttons on larger screens
function setRequiredForRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const isSmallScreen = window.innerWidth <= 1280;

    radioButtons.forEach((radioButton) => {
        radioButton.required = !isSmallScreen;
    });
}

// Call the function initially and on window resize
setRequiredForRadioButtons();
window.addEventListener('resize', setRequiredForRadioButtons);

export default function BloodRequest() {

    const [bloodType, setBloodType] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [potentialDonors, setPotentialDonors] = useState([]);
    const [recipientData, setRecipientData] = useState([]);
    const [locationError, setLocationError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRequested, setIsRequested] = useState(false);


    if (getUserRoleFromCookie() !== 'Recipient') {
        return (
            window.location.href = '/accessforbidden'
        )
    }

    // GET RECIPIENT'S EMAIL ID FROM COOKIE
    function getEmailFromCookie() {
        const emailCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('email='));
        const email = emailCookie ? Decrypt(emailCookie.split('=>')[1], secretKey) : '';
        return email;
    }


    // Blood Request Button Form Submission
    const handleSubmit = (event) => {
        event.preventDefault();

        setIsRequested(true);

        const recipientEmail = getEmailFromCookie();
        const email = recipientEmail;

        const requestData = {
            bloodType,
            latitude,
            longitude,
            email
        };

        try {

            axios.get('http://localhost:4000/api/potential-donor', { params: requestData })
                .then(response => {
                    console.log(requestData);
                    console.log(response.data);

                    const donorData = response.data[0];
                    setPotentialDonors(donorData);
                    setRecipientData(requestData);

                })
                .catch(error => {
                    console.error(error);
                });

        }
        catch (error) {
            console.error(error);
            setErrorMessage('No Records Found');
        }

        // Clear form data
        setBloodType('');
        setLatitude('');
        setLongitude('');
    }


    // API to Fetch User's Location Coordinates
    function updateLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude.toFixed(7));
                setLongitude(longitude.toFixed(7));
                console.log('Your Coordinates are:', latitude, longitude)
                setLocationError("");
            },
            (error) => {
                console.error(error);
                setLocationError(error.message);
            },
            { maximumAge: 0, timeout: 10000, enableHighAccuracy: true }
        );
    }


    return (

        <section className='flex flex-col justify-between'>

            {/* RECIPIENT BLOOD REQUEST FORM */}
            <section className="bg-gray-900 flex items-center justify-center px-5 py-5">

                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">

                    <div className="md:flex w-full">

                        {/* Left Part */}
                        <div className="hidden md:block w-1/2 bg-red-600 p-10">
                            <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#ff9d00' width='1600' height='800' /><g stroke='#000' strokeWidth='66.7' strokeOpacity='0.05' ><circle fill='#ff9d00' cx='0' cy='0' r='1800' /><circle fill='#fb8d17' cx='0' cy='0' r='1700' /><circle fill='#f47d24' cx='0' cy='0' r='1600' /><circle fill='#ed6e2d' cx='0' cy='0' r='1500' /><circle fill='#e35f34' cx='0' cy='0' r='1400' /><circle fill='#d85239' cx='0' cy='0' r='1300' /><circle fill='#cc453e' cx='0' cy='0' r='1200' /><circle fill='#be3941' cx='0' cy='0' r='1100' /><circle fill='#b02f43' cx='0' cy='0' r='1000' /><circle fill='#a02644' cx='0' cy='0' r='900' /><circle fill='#901e44' cx='0' cy='0' r='800' /><circle fill='#801843' cx='0' cy='0' r='700' /><circle fill='#6f1341' cx='0' cy='0' r='600' /><circle fill='#5e0f3d' cx='0' cy='0' r='500' /><circle fill='#4e0c38' cx='0' cy='0' r='400' /><circle fill='#3e0933' cx='0' cy='0' r='300' /><circle fill='#2e062c' cx='0' cy='0' r='200' /><circle fill='#210024' cx='0' cy='0' r='100' /></g>
                            </svg>
                        </div>

                        {/* Right Part */}
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">

                            {/* Error Message */}
                            {errorMessage && <div className="mx-auto">{errorMessage}</div>}

                            {/* Heading */}
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-5xl text-gray-900">Request Blood</h1>
                            </div>

                            {/* User Inputs */}
                            <form onSubmit={handleSubmit}>

                                {/* Location Error Message */}
                                <div className='text-deepBlue text-xl w-[100%]'>
                                    {locationError &&
                                        <p className='flex'>
                                            Location Error: {locationError}
                                            <img src='./images/location-error.png'
                                                className='w-10 h-10'
                                            />
                                        </p>
                                    }
                                </div>

                                {/* USER LOCATION */}
                                <div className='flex items-center justify-between'>

                                    {/* Input Fields */}
                                    <div className='mt-6'>

                                        {/* <!-- Latitude Input --> */}
                                        <div className="relative mb-6">
                                            <input
                                                type="text"
                                                id="latitude"
                                                value={latitude}
                                                onChange={(event) => setLatitude(event.target.value)} required disabled
                                                className="block placeholder:text-gray-400 text-black min-h-[auto] w-[102%] sm:w-[140%] md:w-[102%] lg:w-[140%] xl:w-[180%] rounded-xl border-4 px-3 py-2 outline-none transition-all duration-200 ease-linear"
                                                placeholder="Your latitude coordinate"
                                            />
                                        </div>

                                        {/* <!-- Longitude Input --> */}
                                        <div className="relative mb-6">
                                            <input
                                                type="text"
                                                id="longitude"
                                                value={longitude}
                                                onChange={(event) => setLongitude(event.target.value)} required disabled
                                                className="block placeholder:text-gray-400 text-black min-h-[auto] w-[102%] sm:w-[140%] md:w-[102%] lg:w-[140%] xl:w-[180%] rounded-xl border-4 px-3 py-2 outline-none transition-all duration-200 ease-linear"
                                                placeholder="Your longitude coordinate" />
                                        </div>

                                    </div>

                                    {/* Fetch Location Button */}
                                    <button type="button" onClick={updateLocation}>
                                        <img src='./images/location-icon.png' className="w-20 h-20 hover:scale-110" />
                                    </button>

                                </div>


                                {/*  Blood Type Input  */}
                                <div className="w-full px-2">

                                    <label className="text-2xl font-semibold hidden xl:block">
                                        Blood Type Required
                                    </label>

                                    <div className="relative mb-4 flex gap-4 font-semibold text-black tracking-wider">

                                        {/* <!-- Select dropdown for small screens --> */}
                                        <label htmlFor="bloodTypeSelect" className="xl:hidden font-semibold text-black tracking-wider">Blood Type:</label>
                                        <select id="bloodTypeSelect" name="bloodType" className="xl:hidden bg-gray-300 text-black" onChange={(event) => setBloodType(event.target.value)}>
                                            <option value="" className="bg-blue-500">Your Blood Type</option>
                                            <option value="A+" className="bg-blue-500">A+</option>
                                            <option value="A-" className="bg-blue-500">A-</option>
                                            <option value="B+" className="bg-blue-500">B+</option>
                                            <option value="B-" className="bg-blue-500">B-</option>
                                            <option value="AB+" className="bg-blue-500">AB+</option>
                                            <option value="AB-" className="bg-blue-500">AB-</option>
                                            <option value="O+" className="bg-blue-500">O+</option>
                                            <option value="O-" className="bg-blue-500">O-</option>
                                        </select>


                                        {/* <!-- Radio buttons for larger screens --> */}
                                        <label htmlFor="bloodTypeA+" className="hidden xl:inline-block">A+</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeA+"
                                            name="bloodType"
                                            value="A+"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeA-" className="hidden xl:inline-block">A-</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeA-"
                                            name="bloodType"
                                            value="A-"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeB+" className="hidden xl:inline-block">B+</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeB+"
                                            name="bloodType"
                                            value="B+"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeB-" className="hidden xl:inline-block">B-</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeB-"
                                            name="bloodType"
                                            value="B-"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeAB+" className="hidden xl:inline-block">AB+</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeAB+"
                                            name="bloodType"
                                            value="AB+"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeAB-" className="hidden xl:inline-block">AB-</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeAB-"
                                            name="bloodType"
                                            value="AB-"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeO+" className="hidden xl:inline-block">O+</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeO+"
                                            name="bloodType"
                                            value="O+"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />

                                        <label htmlFor="bloodTypeO-" className="hidden xl:inline-block">O-</label>
                                        <input
                                            type="radio"
                                            id="bloodTypeO-"
                                            name="bloodType"
                                            value="O-"
                                            onChange={(event) => setBloodType(event.target.value)}
                                            className="hidden xl:inline-block"
                                        />


                                    </div>

                                    {/* Request Button */}
                                    <div className="flex mt-8">
                                        <div className="w-full px-3 mb-5">
                                            <button disabled={isRequested} className="block w-full max-w-xs mx-auto bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold hover:transition-all duration-100 hover:scale-110">
                                                REQUEST BLOOD
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

            {/* POTENTIAL DONORS LIST */}
            {isRequested &&
                <section>

                    <PotentialDonorsChildComponent
                        potentialDonors={potentialDonors}
                        recipientData={recipientData}
                    />

                </section>
            }

        </section>

    )
}
