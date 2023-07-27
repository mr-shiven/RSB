import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden font-mullish py-10 bg-gradient-to-tr from-purple-200 via-white to-indigo-200">

      <h1 className="text-center font-mullish font-bold text-[40px] lg:text-[55px] leading-[1.2] pt-10">
        Discover Our Vision
      </h1>

      <div className="text-deepRed font-bold mx-auto mb-6 text-lg lg:text-xl text-center pt-4">
        The journey towards a
        <span className="flex flex-wrap lg:inline">   " Rakht - Sashakt - Bharat "</span>
      </div>

      <div className="font-bold text-gray-600 text-center lg:mx-32 mx-8">
        Welcome to our real-time blood donation website! We connect donors with
        those in need in real-time, leveraging modern technology to save lives.
        Register, find nearby donors, and save lives. We prioritize
        safety, confidentiality, and timely transfusions. Join us in our mission
        to make a positive impact on lives.
        <br />
        <p className="font-serif font-[900] pt-4">Together, we can make a difference!</p>
      </div>

      {/* Cards*/}
      <div className="flex flex-wrap justify-center gap-20 mb-10">

        {/* Card 1 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-6 md:mx-0">
          <img
            src="./images/about-us-card-1.svg"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8"
          />
          <div className="text-center p-5">
            <h2 className="text-xl font-bold mb-4 group-hover:text-white">Our Mission</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300 ">
              To provide an end to end, real-time solution to help patients reach out to donors rapidly, efficienlty  and reliably, thus impacting a lot of lives
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="object-cover bg-red-400 shadow-2 hover:transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-6 md:mx-0">
          <img
            src="./images/about-us-card-2.svg"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8 "
          />

          <div className="text-center p-5">
            <h2 className="text-lg font-bold mb-4 group-hover:text-white">Our Vision</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300">
              We envision a future where blood donation is a simple, seamless, and reliable process, and where patients can quickly and easily connect with the community of donors
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="object-cover bg-red-400 shadow-2 hover: transform hover:scale-110 transition-all duration-300 rounded-md mt-10 item-center hover:bg-lightRed hover:text-white group w-96 mx-6 md:mx-0">
          <img
            src="./images/about-us-card-3.svg"
            alt="Card Image"
            className="bg-blue-100 rounded-md h-72 w-96 p-8 "
          />
          <div className="text-center p-5">
            <h2 className="text-lg font-bold mb-4 group-hover:text-white">Our Impact</h2>
            <p className="text-gray-700 font-bold group-hover:text-gray-300">
              We are reducing the time it takes to find a donor and we hope to contribute to a world where no patient has to suffer due to lack of blood
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AboutUs;
