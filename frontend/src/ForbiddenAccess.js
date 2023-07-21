import React from 'react';
import './index.css';

export default function ForbiddenAccess() {
  return (
    <div className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden bg-[#1A2238]">

      {/* Home Button */}
      <div className='absolute top-6 left-4'>
        <a href='/' className="bg-lightBlue px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-white hover:text-lightBlue500 transition-colors duration-200">
          Back to Home
        </a>
      </div>

      <img src='./images/earth.svg' className='absolute top-20 left-10 w-80 h-80 animate-earth' />

      <img src='./images/moon.svg' className='absolute top-20 right-20 w-60 h-60 animate-earth' />

      <img src='./images/stars.svg' className='absolute top-5 right-50 animate-pulse' />

      <img src='./images/stars.svg' className='absolute top-10 right-0 animate-pulse' />

      <img src='./images/stars.svg' className='absolute top-40 right-30 animate-pulse' />

      <img src='./images/rocket.svg' className='animate-rocket absolute bottom-0 left-0 w-32 h-32' />

      <img src='./images/astronaut.svg' className='absolute bottom-0 right-0 w-32 h-32 animate-pulse animate-bounce animate-astronaut' />

      <div className="text-center">

        <h1 className="text-4xl sm:text-7xl mt-20 font-extrabold text-white tracking-widest animate-bounce">403</h1>

        <h1 className="text-4xl sm:text-7xl mb-20 font-extrabold text-white tracking-widest animate-bounce">Access Forbidden</h1>

        <div className="bg-yellow-400 text-center w-full rounded rotate-12  ">
          Not this time!! No Access
        </div>

        <div className="bg-yellow-400 text-center mt-[-25px] rounded -rotate-12">
          Not this time!! No Access
        </div>

      </div>

      <img className="mx-auto h-auto max-h-[55vh]" src="./images/HauntedHouseForeground.png" alt="Haunted House" />

    </div>
  )
}
