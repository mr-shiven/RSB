import React, { useState } from 'react';
import axios from 'axios';


const PotentialDonorsChildComponent = ({ potentialDonors, recipientData }) => {

    const [userNotifiedMessage, setUserNotifiedMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [messageLoading, setMessageLoading] = useState(false);


    // SAVE DONATION DATA, SEND EMAIL AUTOMATICALLY TO POTENTIAL DONOR
    const requestDonorNotify = () => {

        if (potentialDonors && potentialDonors.length > 0) {

            setButtonClicked(true);
            setMessageLoading(true);

            axios.post("http://localhost:4000/api/donations", { recipient_email: recipientData.email })
                .then((response) => {
                    console.log(response.data);
                    const donation_id = response.data.donation_id;

                    const requests = potentialDonors.map((donor) =>
                        axios.post("http://localhost:4000/api/requested-donors", { donation_id, donor_email: donor.email })
                    );

                    Promise.all(requests)
                        .then((responses) => {
                            axios.post("http://localhost:4000/api/send-mail", { donation_id, potentialDonors, recipientData })
                                .then((response) => {
                                    console.log(response.data);
                                    setUserNotifiedMessage(response.data);
                                    setMessageLoading(false); // Set messageLoading to false here
                                })
                                .catch((error) => {
                                    console.error(error);
                                    setErrorMessage(error);
                                    setMessageLoading(false); // Set messageLoading to false here as well
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                            setMessageLoading(false);
                        });
                })
                .catch((error) => {
                    console.error(error);
                    setMessageLoading(false);
                });
        }
        else {
            alert('No donors in your locality');
        }
    };


    // SEND EMAIL MANUALLY TO DONOR
    const handleSendEmail = (donorData) => {
        const recipient = donorData.email;
        const subject = 'Requesting Blood through Rakht Sashakt Bharat';
        const body =
            `Dear ${donorData.name},
        Thank you for your consideration, and we look forward to hearing back from you soon.`;


        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    };


    return (

        <section className='bg-gradient-to-r from-orange-400 to-rose-400'>

            {potentialDonors.length > 0 ?
                (
                    <section className='flex flex-col gap-8 '>

                        {/* Notify Button */}
                        <button
                            onClick={requestDonorNotify}
                            disabled={buttonClicked || messageLoading} // disable button when it's clicked or when message is loading
                            className="block w-fit sm:w-full max-w-xs my-10 mx-auto bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold hover:transition-all duration-100 hover:scale-110">
                            {!buttonClicked && !messageLoading ? "NOTIFY ALL DONORS" : ''}
                            {buttonClicked && messageLoading ? "SENDING..." : ''}
                            {buttonClicked && !messageLoading ? "ALL DONORS NOTIFIED" : ''}
                        </button>

                        {/* Success Message */}
                        <div className='text-center text-lg sm:text-2xl text-white font-extrabold'>
                            {userNotifiedMessage && <p className='flex justify-center'><img src='./images/check-green.svg' className='w-10 h-10 mx-2' /> {userNotifiedMessage}</p>}
                        </div>

                        {/* Error Message */}
                        <div className='text-center text-2xl text-white font-extrabold'>
                            {errorMessage && <p className='flex justify-center'><img src='./images/cross-red.svg' className='w-10 h-10 mr-4' /> {errorMessage}</p>}
                        </div>

                        {/* Potential Donor Data Cards */}
                        <div className="w-[95%] mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 pb-16 gap-10">

                            {potentialDonors.map((donor) => (
                                <div key={donor.donor_id}>

                                    {/* CARD */}
                                    <div className="w-[80%] sm:w-[60%] md:w-full h-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light flex flex-col justify-around overflow-y-scroll sm:overflow-hidden">

                                        {/* Name */}
                                        <div className="w-full flex justify-center">
                                            <h6 className="text-center font-bold uppercase">{donor.name}</h6>
                                        </div>

                                        {/* Separator */}
                                        <hr className="inline-block w-full h-1 rounded-full my-4 bg-gray-200" />

                                        {/* Donor Data */}
                                        <span className="leading-relaxed font-bold text-gray-600 mx-4">
                                            <div>Blood Type: {donor.blood_type}</div>
                                            <div>Phone: {donor.phone}</div>
                                            <div>Email: {donor.email}</div>
                                            <div>Latitude: {donor.latitude}</div>
                                            <div>Longitude: {donor.longitude}</div>
                                            <div>Distance: {(donor.distance).toFixed(2)} km</div>
                                        </span>


                                        {/*Separator*/}
                                        <hr className="inline-block w-full h-1 rounded-full my-4 bg-gray-200" />

                                        {/* Button group*/}
                                        <section className="flex mx-auto items-center justify-around gap-4">

                                            {/* Email Button */}
                                            <div className="flex gap-2 items-center rounded-md overflow-hidden border py-1 px-2 border-blue-500 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white hover:border-transparent hover:shadow-2 group">

                                                <button
                                                    onClick={() => {
                                                        handleSendEmail({
                                                            name: donor.name,
                                                            email: donor.email,
                                                            distance: donor.distance.toFixed(2)
                                                        });
                                                    }}
                                                    className=""
                                                >
                                                    Email
                                                </button>

                                                <div className="h-5 w-5">
                                                    <svg className="fill-current group-hover:text-white text-blue-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z" /></svg>
                                                </div>

                                            </div>

                                            {/* Call Button */}
                                            <div className="flex gap-2 items-center rounded-md overflow-hidden border py-1 px-2 border-green-500 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  hover:border-transparent hover:shadow-2 group">

                                                <button
                                                    onClick={() => window.location.href = `tel:${donor.phone}`}
                                                    className=""
                                                >
                                                    Call
                                                </button>

                                                <div className="h-5 w-5">
                                                    <svg className=" text-green-500 group-hover:text-white rotate-[90deg] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>
                                                </div>

                                            </div>

                                        </section>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </section>
                )
                :
                (
                    <div className='text-center text-3xl text-bold py-8 space-y-2 text-red-900'>
                        <p>No potential donors found in your locality.</p>
                        <p>We're sorry for not being able to help you this time.</p>
                    </div>
                )
            }

        </section>

    );
};

export default PotentialDonorsChildComponent;