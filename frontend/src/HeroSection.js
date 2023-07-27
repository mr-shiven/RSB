import React, { useState } from "react";
import { Link } from "react-router-dom";

function HeroSection() {

    // const [videoVisible, setVideoVisible] = useState(true);

    // const handleVideoClose = () => {
    //     setVideoVisible(false);
    // };

    return (
        <section className="relative overflow-hidden h-auto bg-gradient-to-tr from-red-300 via-orange-200 to-pink-300">

            {/* Video */}
            {/* <div className={`${videoVisible ? 'animate-pop' : 'hidden'}`}>
                {videoVisible && (
                    <>
                        <button className="text-white text-xl" onClick={handleVideoClose}>
                            X
                        </button>
                        <video className="w-[20%] h-[20%]" autoPlay>
                            <source src="/BloodDonationVideo.mp4" type="video/mp4" />
                        </video>
                    </>
                )}
            </div> */}

            {/* Content */}
            <div className="w-9/12 xl:max-w-[auto] flex flex-col lg:flex-row items-center lg:justify-between mx-auto">

                {/*  LEFT PART */}
                <div className="text-black space-y-8 mt-16">

                    <h1 className="font-mullish font-bold text-[55px] leading-[1.2]">
                        Donate Blood,<br /> Save Lives
                    </h1>

                    <div className="w-6 h-1 bg-red-700"></div>

                    <p className="font-mullish text-[18px] leading-7 opacity-70">
                        By registering as a donor, you can save lives of many people.
                    </p>

                    <Link to={'/register'}>
                        <button className="bg-lightBlue mt-4 py-[14px] px-[18px] rounded-md font-mullish font-bold hover:bg-lightBlue500 transition-all duration-200 flex items-center">
                            Save Lives
                            <svg viewBox="0 0 24 24" focusable="false" className="w-[14px] h-[14px] ml-3">
                                <path fill="currentColor"
                                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z">
                                </path>
                            </svg>
                        </button>
                    </Link>

                </div>

                {/*  RIGHT PART  */}
                <div className="animate-bounce mt-12 pt-36 md:pt-32">

                    <img src="./images/love-icon.png" alt=""
                        className="w-full max-w-[680px]"
                    />

                </div>

            </div>

        </section>
    );
}

export default HeroSection;
