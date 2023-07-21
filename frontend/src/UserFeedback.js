import React, { useState } from 'react';
import axios from 'axios';

export default function UserFeedback() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:4000/api/submit-feedback', formData)
            .then((response) => {
                console.log(response);
                alert('Thank you for your feedback!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            })
            .catch((error) => {
                console.error(error);
                alert('Oops! Something went wrong. Please try again later.');
            });
    }

    return (
        <section className="w-full pb-10 bg-gradient-to-tr from-purple-200 via-white-200 to-indigo-200">

            <div className="flex flex-col items-center">

                <h1 className="text-center font-mullish font-bold text-[40px] md:text-[55px] leading-[1.2] pt-16">
                    Contact Us
                </h1>

                <h3 className="text-lg md:text-2xl capitalize text-center mx-6">
                    Feedback: Questions, thoughts, or suggestions.
                </h3>

                <div className="mt-[25px] flex justify-center items-center">

                    <form className="flex flex-col gap-[30px] w-[70%] my-2 mx-5" onSubmit={handleSubmit}>

                        {/* Input Boxes */}
                        <div className="w-full space-y-4">

                            {/* Name */}
                            <input
                                className="w-full h-[42px] px-[2rem] text-[18px] rounded-[5px] border-none shadow-2"
                                type="text"
                                name="name"
                                id=""
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {/* Email */}
                            <input
                                className="w-full h-[42px] px-[2rem] text-[18px] rounded-[5px] border-none shadow-2"
                                type="email"
                                name="email"
                                id=""
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {/* Subject */}
                            <input
                                className="w-full h-[42px] px-[2rem] text-[18px] rounded-[5px] border-none shadow-2"
                                type="text"
                                name="subject"
                                id=""
                                placeholder="Enter your subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />

                            {/* Message */}
                            <textarea
                                className="w-full px-[2rem] text-[18px] rounded-[5px] border-none h-auto pt-1 shadow-2"
                                name="message"
                                id=""
                                cols="30"
                                rows="10"
                                placeholder="Enter your message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        {/* Send Message Button */}
                        <button
                            type="submit"
                            className="btn mx-auto sm:mx-0 flex justify-center items-center gap-4 border-deepRed rounded-[5px] text-xl hover:scale-90"
                        >
                            <span className='hidden md:block'>Send Message</span>
                            <span className='md:hidden'>Submit</span>
                            <img src="./images/paper-plane.png" className="w-6 md:w-8" />
                        </button>

                    </form>

                </div>

            </div>

        </section>
    );
}
