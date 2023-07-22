import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {

    const [userRole, setUserRole] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSentSuccess, setOtpSentSuccess] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
    const [showResetButton, setShowResetButton] = useState(false);


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
                // setShowNewPasswordFields(true);
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

    // Password Visibility
    const togglePasswordVisibility = (fieldId) => {
        if (fieldId === 'newPassword') {
            setNewPasswordVisible(prevState => !prevState);
        } else if (fieldId === 'confirmNewPassword') {
            setConfirmNewPasswordVisible(prevState => !prevState);
        }
    };


    // Submitting Form to Reset Password in Database

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put('http://ec2-15-207-165-21.ap-south-1.compute.amazonaws.com:4000/change-password', { userRole, email, newPassword });
            console.log(response.data);
            alert('Password reset successful');
            window.location.href = '/login';
        }
        catch (error) {
            console.error(error);
            alert('Failed to reset password');
            window.location.href = '/resetpassword';
        }

    }



    return (

        <section className='w-full h-[100vh] relative flex justify-center items-center bg-gradient-to-r from-green-200 via-green-400 to-green-500'>

            {/* Back to Home Button */}
            <a href='/' className="bg-deepBlue px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:text-black hover:bg-white transition-colors duration-200 absolute top-4 left-4">
                Back to Home
            </a>

            {/* Reset Card */}
            <div className="w-[80%] sm:w-[60%] space-y-6 bg-white border-2 rounded-xl p-8 sm:p-16">

                <h1 className="mb-6 text-3xl font-bold text-center">
                    Reset Account Password
                </h1>

                <p className="text-center mx-auto">
                    Enter the email address you used when you joined and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit}>

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


                    {/* Email Input & Send OTP */}
                    <div className="relative mb-4">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} required
                            className="block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                            placeholder="Enter your email" />

                        {email.length > 0 && (
                            <div>
                                <button type='button' onClick={() => sendOtp(email)} className='absolute top-1 right-4'>
                                    {!otpSentSuccess ? <img src='./images/send-otp.png' className='w-10' /> : ''}
                                </button>
                                {otpSentSuccess ? <img src='./images/thumbs-up.png' className='absolute top-1 right-4 w-10' /> : ''}
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
                                className="block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                                placeholder="Enter OTP"
                            />

                            {otp.length === 6 && (
                                <div>
                                    {isOtpValid ? (
                                        <img
                                            src="./images/verified-otp.png"
                                            alt="Validated"
                                            className="absolute top-2.5 right-4 w-8 h-8"
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => validateOtp(otp)}
                                            className="absolute top-2.5 right-4 text-blue-600 italic"
                                        >
                                            Verify OTP
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    )}


                    {/* New Password Fields */}
                    {isOtpValid &&
                        <div>
                            {/* New Password */}
                            <div className="relative mb-4">
                                <input
                                    type={newPasswordVisible ? "text" : "password"}
                                    id="newPassword"
                                    value={newPassword} required
                                    onChange={(event) => {
                                        setNewPassword(event.target.value);
                                        setShowResetButton(event.target.value === confirmNewPassword);
                                    }}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100 leading-[2.15] outline-none transition-all duration-200 ease-linear"
                                    placeholder="Enter new password"
                                />

                                {/* Password visibility toggle */}
                                {newPassword.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('newPassword')}
                                        className="absolute top-3 right-4"
                                    >
                                        {!newPasswordVisible ? (
                                            <img src="./images/eye-slash-solid.svg" className="w-7" />
                                        ) : (
                                            <img src="./images/eye-solid.svg" className="w-7" />
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Confirm New Password */}
                            <div className="relative mb-4">
                                <input
                                    type={confirmNewPasswordVisible ? "text" : "password"}
                                    id="confirmNewPassword"
                                    value={confirmNewPassword} required
                                    onChange={(event) => {
                                        setConfirmNewPassword(event.target.value);
                                        setShowResetButton(event.target.value === newPassword);
                                    }}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100 leading-[2.15] outline-none transition-all duration-200 ease-linear"
                                    placeholder="Confirm new password"
                                />

                                {/* Password visibility toggle */}
                                {confirmNewPassword.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirmNewPassword')}
                                        className="absolute top-3 right-4"
                                    >
                                        {!confirmNewPasswordVisible ? (
                                            <img src="./images/eye-slash-solid.svg" className="w-7" />
                                        ) : (
                                            <img src="./images/eye-solid.svg" className="w-7" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    }


                    {/* Check if passwords match, then show Reset Button */}
                    {showResetButton &&
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                        >
                            Change Password
                        </button>
                    }


                </form>

            </div>

        </section>

    )
}