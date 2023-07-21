import { useEffect } from 'react';
import axios from 'axios';

import { Decrypt } from '../EncryptDecrypt';

const secretKey = '5a0d6b84072e0f18342e72e704251a6f041d3e6d4dbaece3d0db9d8906b5c422';

function useSendLocation() {
    useEffect(() => {
        const sendLocation = () => {
            const userRoleCookie = document.cookie.split('; ').find((cookie) => {
                return cookie.startsWith('userRole=');
            });
            const userRole = userRoleCookie ? Decrypt(userRoleCookie.split('=>')[1], secretKey) : '';

            const emailCookie = document.cookie.split('; ').find((cookie) => {
                return cookie.startsWith('email=');
            });
            const email = emailCookie ? Decrypt(emailCookie.split('=>')[1], secretKey) : '';

            if (!userRole || !email) {
                // User role or email cookie not found, do nothing
                return;
            }

            if (userRole !== 'Donor') {
                // Invalid user role
                return;
            }

            if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)) {
                // Invalid email address
                return;
            }

            // Get the user's location and send it to the server
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                axios.post('http://localhost:4000/api/update-donor-live-location', {
                    userRole,
                    email,
                    latitude,
                    longitude,
                })
                    .then((response) => {
                        // Handle the response
                        console.log('Location sent successfully:', response);
                    })
                    .catch((error) => {
                        // Handle the error
                        console.error('Error sending location:', error);
                    });
            });
        };

        // Run once on mount
        sendLocation();

        // Run again every 10 minutes
        // const intervalId = setInterval(sendLocation, 10 * 60 * 1000);

        // Clean up interval on unmount
        // return () => clearInterval(intervalId);
    }, []);
}

export default useSendLocation;
