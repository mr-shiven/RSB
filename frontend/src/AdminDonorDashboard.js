import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDonorDashboard() {

  const [donorData, setDonorData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Call the handleGetDonorData function automatically when the component mounts
    handleGetDonorData();
  }, []);

  const handleGetDonorData = () => {
    try {
      axios.get('http://localhost:4000/api/donor-data')
        .then(response => {
          console.log(response.data);
          setDonorData(response.data);
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
    setDonorData([]);
  };

  return (
    <section>

      {errorMessage && <p className='text-center text-lg text-red-900 my-4'>Error: {errorMessage}</p>}


      <div className="font-mullish font-bold text-[35px] leading-[1.2] text-center mt-4"> Donors Table</div>

      <div className='w-[90%] mx-auto h-[58.4vh] overflow-auto my-4'>

        <table className="w-full">
          <thead className='sticky top-0'>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-300 uppercase border-b border-gray-100">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Blood Type</th>
              <th className="px-4 py-3">Phone No.</th>
              <th className="px-4 py-3">Email ID</th>
              <th className="px-4 py-3">Latitude</th>
              <th className="px-4 py-3">Longitude</th>
            </tr>
          </thead>

          <tbody className="bg-white">

            {donorData &&
              donorData.map((donor) => (
                <tr className="text-gray-700 hover:shadow-2 hover:font-semibold" key={donor.donor_id}>

                  <td className="px-4 py-3 text-sm border">{donor.donor_id}</td>

                  <td className="px-4 py-3 text-sm border">{donor.name}</td>

                  <td className="px-4 py-3 text-sm border">{donor.blood_type}</td>

                  <td className="px-4 py-3 text-sm border">{donor.phone}</td>

                  <td className="px-4 py-3 text-sm border">{donor.email}</td>

                  <td className="px-4 py-3 text-sm border">{donor.latitude}</td>

                  <td className="px-4 py-3 text-sm border">{donor.longitude}</td>

                </tr>

              ))}

          </tbody>

        </table>
      </div>

    </section>
  )
}

