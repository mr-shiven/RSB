import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {

    const [userRole, setUserRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [otpSentSuccess, setOtpSentSuccess] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [locationError, setLocationError] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Submit Form data to Register User
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isOtpValid) {
            alert('Please verify your OTP first!');
            return;
        }

        const data = {
            name,
            email,
            password,
            phone: phoneNumber,
            blood_type: bloodType,
            latitude,
            longitude
        };


        if (userRole === 'Donor') {
            axios.post('http://ec2-15-207-165-21.ap-south-1.compute.amazonaws.com:4000/api/donors', data)
                .then(response => {
                    console.log(response);
                    alert('Donor data saved successfully!');
                })
                .catch(error => {
                    console.error(error);
                    if (error.response && error.response.data) {
                        setErrorMessage('Donor email already registered');
                        alert('Error: Cannot create user in database!');
                    } else {
                        alert('Error saving donor data!');
                    }
                    setError(error.message);
                });
        }

        else if (userRole === 'Recipient') {
            axios.post('http://ec2-15-207-165-21.ap-south-1.compute.amazonaws.com:4000/api/recipients', data)
                .then(response => {
                    console.log(response);
                    alert('Recipient data saved successfully!');
                })
                .catch(error => {
                    console.error(error);
                    if (error.response && error.response.data) {
                        setErrorMessage('Recipient email already registered');
                        alert('Error: Cannot create user in database!');
                    } else {
                        alert('Error saving recipient data!');
                    }
                    setError(error.message);
                });

        }



        // Clear form data
        setUserRole('');
        setName('');
        setEmail('');
        setPassword('');
        setPasswordVisible(false)
        setPhoneNumber('');
        setOtpSentSuccess(false);
        sendOtp('');
        setIsOtpValid(false);
        setBloodType('');
        setLatitude('');
        setLongitude('');
        setError('');
        setErrorMessage('');
    }


    // API to Fetch User's Location Coordinates
    function updateLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude.toFixed(8));
                setLongitude(longitude.toFixed(8));
                setLocationError("");
            },
            (error) => {
                console.error(error);
                setLocationError(error.message);
            },
            { maximumAge: 0, timeout: 10000, enableHighAccuracy: true }
        );
    }


    // Password Visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

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


    // Send OTP to User Email
    async function sendOtp(email) {
        try {
            const response = await axios.post('http://ec2-15-207-165-21.ap-south-1.compute.amazonaws.com:4000/send-otp', { email });
            setOtpSentSuccess(true);
            alert('OTP sent successfully, please check your inbox');
            console.log(response.data);
        }
        catch (error) {
            alert('Failed to send OTP, try again');
            console.log(error);
        }
    }

    // Verify OTP sent to User Email
    async function validateOtp(otp) {
        try {
            const response = await axios.post('http://ec2-15-207-165-21.ap-south-1.compute.amazonaws.com:4000/validate-otp', { otp });
            if (response.data === 'OTP code is valid') {
                console.log('OTP code is valid');
                alert('OTP verified successfully');
                setIsOtpValid(true);
            }
            else if (response.data === 'Invalid OTP code') {
                console.log('OTP code is invalid');
                alert('OTP code is invalid');
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    return (
        <section className='bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-rose-900 via-amber-800 to-rose-400 h-auto xl:h-[130vh] py-16 overflow-hidden flex justify-center items-center'>

            <div className='grid md:grid-cols-2 sm:w-[80%] gap-10 p-4 sm:p-8 mx-8 lg:mx-auto border-4 rounded-2xl shadow-2'>

                {/* Left Part - Image */}
                <img
                    src="./images/register.png"
                    className="w-96 lg:w-full m-auto"
                    alt=""
                />

                {/* Right Part - Form */}
                <div className="flex flex-col justify-center xl:items-center">

                    {/* Error Message */}
                    <div className='mb-2 mx-auto'>
                        {error && <p>Error: {error}</p>}
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Social Media Login Icons*/}
                        <div className="flex items-center justify-center gap-4">

                            <p className="hidden sm:block text-lg text-gray-300">Sign up with</p>

                            {/*  Facebook  */}
                            <a href='#'>
                                <img src='./images/facebook.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>

                            {/*  Twitter  */}
                            <a href='#'>
                                <img src='./images/twitter.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>


                            {/*  Linkedin  */}
                            <a href='#'>
                                <img src='./images/linkedin.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>

                            {/*  Instagram  */}
                            <a href='#'>
                                <img src='./images/instagram.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>


                        </div>


                        {/*  Separator between Social Media Sign-in Icons & Email/Password Sign-in  */}
                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-y-2 before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-y-2 after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold dark:text-black">
                                OR
                            </p>
                        </div>


                        {/*  User Role Input  */}
                        <div className="relative mb-4 flex justify-center gap-4 sm:gap-8">

                            <div className='flex gap-4'>
                                <label htmlFor="userRoleDonor" className='font-bold text-white tracking-wider'>Donor</label>
                                <input
                                    type="radio"
                                    id="userRoleDonor"
                                    name="userRole"
                                    value="Donor"
                                    onChange={(event) => setUserRole(event.target.value)} required
                                />
                            </div>

                            <div className='flex gap-4'>
                                <label htmlFor="userRoleRecipient" className='font-bold text-white tracking-wider'>Recipient</label>
                                <input type="radio"
                                    id="userRoleRecipient"
                                    name="userRole"
                                    value="Recipient"
                                    onChange={(event) => setUserRole(event.target.value)} required
                                />
                            </div>

                        </div>


                        {/*  Name Input  */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                id="name"
                                value={name} onChange={(event) => setName(event.target.value)} required
                                className="block min-h-[auto] w-full rounded-xl border-4 bg-transparent px-3 py-2 outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                placeholder="Enter your full name" />
                        </div>


                        {/* Email Error Message */}
                        <div className='mb-2 mx-auto'>
                            {errorMessage && <p>Error: {errorMessage}</p>}
                        </div>


                        {/*  Email Input & Send OTP  */}
                        <div className="relative mb-4">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} required
                                className="block min-h-[auto] w-full rounded-xl border-4 bg-transparent px-3 py-2 outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                placeholder="Enter your email" />

                            {email.length > 0 && (
                                <div>
                                    <button type='button' onClick={() => sendOtp(email)} className='absolute top-1 right-4'>
                                        {!otpSentSuccess ? <img src='./images/send-otp.png' className='w-10' /> : ''}
                                    </button>
                                    {otpSentSuccess ? <img src='./images/thumbs-up.png' className='absolute top-0.5 right-4 w-10' /> : ''}
                                </div>
                            )}
                        </div>


                        {/* Enter OTP & Validate */}
                        {otpSentSuccess && (
                            <div className="relative mb-4">

                                <input
                                    type="otp"
                                    id="otp"
                                    value={otp} required
                                    onChange={(event) => setOtp(event.target.value)}
                                    className="block min-h-[auto] w-full rounded-xl border-4 bg-transparent px-3 py-2 outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                    placeholder="Enter OTP" />

                                {otp.length === 6 && (
                                    <div>
                                        <button type='button' onClick={() => validateOtp(otp)} className='absolute top-2.5 right-4 text-white italic'>
                                            {!isOtpValid ? 'Verify OTP' : ''}
                                        </button>
                                        {isOtpValid ? <img src='./images/verified-otp.png' className='w-8 h-8 absolute top-1.5 right-4' alt='Validated' /> : ''}
                                    </div>
                                )}

                            </div>
                        )}

                        {/*  Password Input  */}
                        <div className="relative mb-4">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} required
                                className="block min-h-[auto] w-full rounded-xl border-4 bg-transparent px-3 py-2 outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                placeholder="Enter your password" />

                            {password.length > 0 && (
                                <button type='button' onClick={togglePasswordVisibility} className='absolute top-3 right-4'>
                                    {!passwordVisible ? <img src='./images/eye-slash-solid.svg' className='w-7' /> : <img src='./images/eye-solid.svg' className='w-7' />}
                                </button>
                            )}
                        </div>


                        {/*  Phone No. Input  */}
                        <div className="relative mb-4">
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required
                                className="block min-h-[auto] w-full rounded-xl border-4 bg-transparent px-3 py-2 outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                placeholder="Enter your phone number" />
                        </div>


                        {/*  Blood Type Input  */}
                        <div className="relative mb-4 flex gap-2 font-bold text-white tracking-wider">

                            {/* <!-- Select dropdown for small screens --> */}
                            <label htmlFor="bloodTypeSelect" className="xl:hidden font-bold text-white tracking-wider">Blood Type:</label>
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

                            <div className='mt-6 w-[40%]'>

                                {/*  Latitude Input  */}
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        id="latitude"
                                        value={latitude}
                                        onChange={(event) => setLatitude(event.target.value)} disabled
                                        className="block placeholder:text-gray-400 text-white min-h-[auto] w-[140%] rounded-xl border-4 px-3 py-2 outline-none transition-all duration-200 ease-linear"
                                        placeholder="Your latitude coordinate" />
                                </div>

                                {/*  Longitude Input  */}
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        id="longitude"
                                        value={longitude}
                                        onChange={(event) => setLongitude(event.target.value)} disabled
                                        className="block placeholder:text-gray-400 text-white min-h-[auto] w-[140%] rounded-xl border-4 px-3 py-2 outline-none transition-all duration-200 ease-linear"
                                        placeholder="Your longitude coordinate" />
                                </div>

                            </div>

                            {/* Fetch Location Button */}
                            <button type="button" onClick={updateLocation}>
                                <img src='./images/location-icon.png' className="w-20 h-20 hover:scale-110 " />
                            </button>

                        </div>

                        {/* Register Button */}
                        <button className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xl mt-6 w-full flex justify-center items-center py-[14px] px-[18px] rounded-xl font-mullish font-bold hover:bg-green-700 hover:shadow-2 hover:scale-90 transition-all duration-200">
                            Register
                            <svg viewBox="0 0 24 24" focusable="false" className="w-[30px] h-[30px] ml-3">
                                <path fill="currentColor"
                                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z">
                                </path>
                            </svg>
                        </button>

                    </form>

                </div>

            </div>

        </section>
    )
}
