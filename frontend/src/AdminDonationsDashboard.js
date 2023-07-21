import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDonationsDashboard() {

    const [donationsData, setDonationsData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Call the handleGetdonationsData function automatically when the component mounts
        handleGetDonationsData();
    }, []);

    const handleGetDonationsData = () => {
        try {
            axios.get('http://localhost:4000/api/donation-data')
                .then(response => {
                    console.log(response.data);
                    setDonationsData(response.data);
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
        setDonationsData([]);

    };

    const convertDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };

        const formattedDate = date.toLocaleString('en-IN', options);
        return formattedDate;
    };

    return (

        <section>

            {errorMessage && <p className='my-4'>Error: {errorMessage}</p>}

            <div className="font-mullish font-bold text-[35px] leading-[1.2] text-center mt-4"> Donation Records</div>

            <div className='w-[90%] mx-auto h-[58.4vh] overflow-auto my-4'>

                <table className="w-full">
                    <thead className='sticky top-0'>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-300 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">Donation ID</th>
                            <th className="px-4 py-3">Recipient Email</th>
                            <th className="px-4 py-3">Request Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Donor Email</th>
                            <th className="px-4 py-3">Donation Date</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">

                        {donationsData &&
                            donationsData.map((donor) => (
                                <tr className="text-gray-700 hover:shadow-2 hover:font-semibold" key={donor.donation_id}>

                                    <td className="px-4 py-3 text-sm border">{donor.donation_id}</td>

                                    <td className="px-4 py-3 text-sm border">{donor.recipient_email}</td>

                                    <td className="px-4 py-3 text-sm border">{convertDate(donor.created_at)}</td>

                                    <td className="px-4 py-3 text-xs border">
                                        <span className={`px-2 py-1 font-semibold leading-tight text-white rounded-sm
                                     ${donor.status === 'accepted' ? 'bg-green-500' : donor.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'}`}>
                                            {donor.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-sm border">{donor.donor_email}</td>

                                    <td className="px-4 py-3 text-sm border">{donor.donation_date != null ? convertDate(donor.donation_date) : null}</td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </section>

    )

}
