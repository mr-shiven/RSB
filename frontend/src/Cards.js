import React from "react";

export default function Cards() {
  return (
    <section className="bg-gradient-to-tr from-red-300 via-orange-200 to-pink-300">

      {/* Heading */}
      <div className="text-center font-mullish font-bold text-[40px] lg:text-[55px] leading-[1.2] pt-24">
        What Sets Us Apart
      </div>

      {/* Card Section */}
      <div className="flex flex-wrap justify-center items-center gap-20 py-10">

        {/* Card 1 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-2 md:mx-0">
          <img
            src="./images/card-11.png"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Real Time Help</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              Rakht-Sashakt brings donors and recipients together in a matter of seconds, giving hope and saving lives with every click
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-2 md:mx-0">
          <img
            src="./images/card-22.png"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Creates Awareness</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              Rakht-Sashakt creates awareness and significantly increases blood donations, potentially saving countless lives
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-2 md:mx-0">
          <img
            src="./images/card-33.png"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Strong Network of Donors</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              Our website boasts a powerful network of blood donors, ready to give the gift of life at a moment's notice</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-2 md:mx-0">
          <img
            src="./images/card-44.png"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Completely Free!</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              Best of all, it's completely free. Anyone and everyone can request for blood - join our community of donors today!</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-2 md:mx-0">
          <img
            src="./images/card-55.png"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Save Lives</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              Join our website and become a lifesaver. Register now to make a huge impact by donating blood and saving lives!</p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-2 md:mx-0">
          <img
            src="./images/card-66.png"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Get Notified in Real-time</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              Our platform ensures that donors receive real-time notifications to donate blood, making it easier than ever to serve as a lifeline for those in need</p></div>
        </div>

      </div>

    </section>
  );
}
