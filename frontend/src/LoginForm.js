import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Encrypt, Decrypt } from './EncryptDecrypt.js';


export default function LoginForm() {

    const [userRole, setUserRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const secretKey = '5a0d6b84072e0f18342e72e704251a6f041d3e6d4dbaece3d0db9d8906b5c422';

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    // Set required attribute for radio buttons on larger screens
    function setRequiredForRadioButtons() {
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        const isSmallScreen = window.innerWidth <= 640;

        radioButtons.forEach((radioButton) => {
            radioButton.required = !isSmallScreen;
        });
    }

    // Call the function initially and on window resize
    setRequiredForRadioButtons();
    window.addEventListener('resize', setRequiredForRadioButtons);



    // Retrieve cookie & automatically login if "remember-me" is set

    useEffect(() => {
        // const rememberMeCookie = document.cookie.split('; ').find(cookie => {
        //     return cookie.startsWith('remember_me=') && cookie.split('=')[1] === 'true';
        // });
        const rememberMeCookie = document.cookie.split('; ').find(cookie => {
            const cookieValue = cookie.split('=')[1];
            return cookie.startsWith('remember_me=') && (cookieValue === 'true' || cookieValue === 'false');
        });

        if (rememberMeCookie) {
            // Extract the userRole and email from the "remember me" cookie
            const userRoleCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userRole='));
            // console.log(userRoleCookie);
            const userRole = userRoleCookie ? Decrypt(userRoleCookie.split('=>')[1], secretKey) : '';
            // console.log(userRole);

            const emailCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('email='));
            const email = emailCookie ? Decrypt(emailCookie.split('=>')[1], secretKey) : '';
            // console.log(email);

            // Verify that the email is valid to prevent injection attacks
            if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)) {
                // Invalid email address
                return;
            }

            // Log the user in automatically and redirect to the dashboard
            const redirectUrl =
                userRole === 'Donor'
                    ? '/donordashboard'
                    : userRole === 'Recipient'
                        ? '/bloodrequest'
                        : userRole === 'Admin'
                            ? '/admindashboard'
                            : '';
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
    }, []);


    // Login Button Click
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const url =
                userRole === 'Donor'
                    ? 'https://rsb.onrender.com/api/donor/login'
                    : userRole === 'Recipient'
                        ? 'https://rsb.onrender.com/api/recipient/login'
                        : userRole === 'Admin'
                            ? 'https://rsb.onrender.com/api/admin/login'
                            : '';

            if (!url) {
                throw new Error('Invalid user role');
            }

            const response = await axios.post(url, { email, password });
            // console.log(response.data);

            // Redirect the user to the dashboard page
            const redirectUrl =
                userRole === 'Donor'
                    ? '/donordashboard'
                    : userRole === 'Recipient'
                        ? '/bloodrequest'
                        : userRole === 'Admin'
                            ? '/admindashboard'
                            : '';


            // COOKIE SETTINGS

            const defaultExpiration = new Date();

            // Create a cookie that expires in 5 years
            defaultExpiration.setFullYear(defaultExpiration.getFullYear() + 5);
            // console.log('defaultExpiration', defaultExpiration)


            // Check if "remember me" checkbox is checked
            if (rememberMe) {
                const expires = defaultExpiration.toUTCString();

                // Encrypt the cookie data
                const encryptedUserRole = Encrypt(userRole, secretKey);
                const encryptedEmail = Encrypt(email, secretKey);

                document.cookie = `remember_me=true; SameSite=Strict; Secure; expires=${expires}; path=/`;
                document.cookie = `userRole=>${encryptedUserRole}; Secure; expires=${expires}; path=/`;
                document.cookie = `email=>${encryptedEmail}; Secure; expires=${expires}; path=/`;
            }
            // "remember me" not checked
            else {
                const expires = defaultExpiration.toUTCString();

                // Encrypt the cookie data
                const encryptedUserRole = Encrypt(userRole, secretKey);
                const encryptedEmail = Encrypt(email, secretKey);

                document.cookie = `remember_me=false; SameSite=Strict; Secure; expires=${expires}; path=/`;
                document.cookie = `userRole=>${encryptedUserRole}; Secure; expires=${expires}; path=/`;
                document.cookie = `email=>${encryptedEmail}; Secure; expires=${expires}; path=/`;
            }



            // Redirect the user to the dashboard
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
            // console.log('Login Successful');
            // alert('Login Successful');

        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
            alert('Login Failed');
        }
    };


    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }


    return (
        <section className='flex md:h-[100vh] overflow-hidden py-16 justify-center items-center bg-gradient-to-r from-rose-700 to-pink-600'>

            <div className='grid md:grid-cols-2 gap-20 p-4 sm:p-16 mx-8 lg:mx-auto border-4 rounded-2xl shadow-2'>

                {/* Left Part - Image */}
                <img
                    src="./images/login.png"
                    className="w-96 m-auto"
                    alt=""
                />

                {/* Right Part - Form */}
                <div className="flex flex-col">

                    <form onSubmit={handleSubmit}>

                        {/* General Error Message */}
                        {errorMessage && <div className="error">{errorMessage}</div>}

                        {/* Social Media Login Icons*/}
                        <div className="flex items-center justify-center gap-4">

                            <p className="hidden sm:block text-lg">Sign in with</p>

                            {/* <!-- Facebook --> */}
                            <a href='#'>
                                <img src='./images/facebook.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>

                            {/* <!-- Twitter --> */}
                            <a href='#'>
                                <img src='./images/twitter.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>


                            {/* <!-- Linkedin --> */}
                            <a href='#'>
                                <img src='./images/linkedin.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>

                            {/* <!-- Instagram --> */}
                            <a href='#'>
                                <img src='./images/instagram.png'
                                    className='w-[38px] hover:scale-150'
                                />
                            </a>


                        </div>

                        {/* <!-- Separator between Social Media Sign-in Icons & Email/Password Sign-in --> */}
                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-y-2 before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-y-2 after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold dark:text-black">
                                OR
                            </p>
                        </div>

                        {/* <!-- User Role Input --> */}
                        <div className="relative mb-4 flex justify-evenly">

                            {/* <!-- Select dropdown for small screens --> */}
                            <label htmlFor="userRoleSelect" className="sm:hidden text-xl">Select Role:</label>
                            <select id="userRoleSelect" name="userRole" className="sm:hidden bg-gray-300 text-black" onChange={(event) => setUserRole(event.target.value)}>
                                <option value="" className="bg-blue-500">Choose Role</option>
                                <option value="Donor" className="bg-blue-500">Donor</option>
                                <option value="Recipient" className="bg-blue-500">Recipient</option>
                                <option value="Admin" className="bg-blue-500">Admin</option>
                            </select>

                            {/* <!-- Radio buttons for larger screens --> */}
                            <label htmlFor="userRoleDonor" className="hidden sm:inline-block">Donor</label>
                            <input
                                type="radio"
                                id="userRoleDonor"
                                className="hidden sm:inline-block"
                                name="userRole"
                                value="Donor"
                                onChange={(event) => setUserRole(event.target.value)} />

                            <label htmlFor="userRoleRecipient" className="hidden sm:inline-block">Recipient</label>
                            <input
                                type="radio"
                                id="userRoleRecipient"
                                className="hidden sm:inline-block"
                                name="userRole"
                                value="Recipient"
                                onChange={(event) => setUserRole(event.target.value)} />

                            <label htmlFor="userRoleAdmin" className="hidden sm:inline-block">Admin</label>
                            <input
                                type="radio"
                                id="userRoleAdmin"
                                className="hidden sm:inline-block"
                                name="userRole"
                                value="Admin"
                                onChange={(event) => setUserRole(event.target.value)} />

                        </div>

                        {/* <!-- Email Input --> */}
                        <div className="relative mb-6">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block min-h-[auto] w-full rounded-xl border-4  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                placeholder="Enter your email" />
                        </div>

                        {/* <!-- Password Input --> */}
                        <div className="relative mb-6">

                            <div className='relative'>

                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block min-h-[auto] w-full rounded-xl border-4 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear placeholder:text-gray-300 text-white hover:border-black"
                                    placeholder="Enter your password" />

                                {password.length > 0 && (
                                    <button type='button' onClick={togglePasswordVisibility} className='absolute top-3 right-4'>
                                        {!passwordVisible ? <img src='./images/eye-slash-solid.svg' className='w-7' /> : <img src='./images/eye-solid.svg' className='w-7' />}
                                    </button>
                                )}

                            </div>

                        </div>

                        {/* Remember Me Checkbox */}
                        <div className='pb-2'>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                            />

                            <label htmlFor="rememberMe" className="ml-1 text-gray-200">
                                Remember Me
                            </label>
                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={!validateForm()}
                            className="bg-gradient-to-r from-sky-400 to-blue-500 mt-2 text-white w-full flex justify-center items-center py-[14px] px-[18px] rounded-xl font-mullish font-bold hover:bg-lightBlue500 hover:shadow-2 hover:scale-90 transition-all duration-200">
                            Login
                            <svg viewBox="0 0 24 24" focusable="false" className="w-[14px] h-[14px] ml-3">
                                <path fill="currentColor"
                                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z">
                                </path>
                            </svg>
                        </button>


                        {/* Forgot Password */}
                        <Link to={'/resetpassword'}>
                            <div className='text-center my-5'>
                                <span className='text-lg text-gray-100 hover:text-white hover:font-bold hover:tracking-wider transition-all duration-300'>
                                    Forgot password?
                                </span>
                            </div>
                        </Link>


                        {/* Separator between Login & Register */}
                        <div className="w-full h-[2px] bg-white">
                        </div>


                        {/* Register Button */}
                        <Link to="/register">
                            <button className="bg-gradient-to-r from-green-400 to-green-500 text-white mt-6 w-full flex justify-center items-center py-[14px] px-[18px] rounded-xl font-mullish font-bold hover:bg-green-700 hover:shadow-2 hover:scale-90 transition-all duration-200">
                                <span className='hidden sm:flex'>Register Now</span>
                                <span className='flex sm:hidden'>Register</span>
                                <svg viewBox="0 0 24 24" focusable="false" className="w-[14px] h-[14px] ml-3">
                                    <path fill="currentColor"
                                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z">
                                    </path>
                                </svg>
                            </button>
                        </Link>

                    </form>

                </div>

            </div>

        </section>
    )
}
