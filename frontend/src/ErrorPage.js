import React from 'react';
import './index.css';

export default function ErrorPage() {
  return (

    <div className="flex overflow-hidden items-center justify-center min-h-screen bg-indigo-500 bg-fixed bg-cover bg-bottom error-bg relative">

      <img src='./images/rocket.svg'
        className='animate-rocket absolute bottom-0 left-0 w-32 h-32'
      />

      <img src='./images/astronaut.svg'
        className='absolute bottom-0 right-0 w-32 h-32 animate-pulse animate-bounce animate-astronaut'
      />

      {/* BIRD ANIMATION */}
      <div>

        <div className="bird-container bird-container--one">
          <div className="bird bird--one"></div>
        </div>

        <div className="bird-container bird-container--two">
          <div className="bird bird--two"></div>
        </div>

        <div className="bird-container bird-container--three">
          <div className="bird bird--three"></div>
        </div>

        <div className="bird-container bird-container--four">
          <div className="bird bird--four"></div>
        </div>

      </div>

      <div className="container">

        <div className="row">

          <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">

            <div className="relative">

              <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold animate-bounce">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>

              <span className="absolute -top-14 -ml-12 text-gray-300 font-semibold text-3xl">Oops!</span>

            </div>

            <div className='mb-10'>
              <h5 className="text-gray-300 font-semibold -mr-10 -mt-3">Page not found</h5>

              <p className="text-gray-100 mt-2 mb-6">we are sorry, but the page you requested was not found</p>

              <a href='/' className="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg hover:scale-110">
                Back to Home
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
