import React, { useState } from 'react'

export default function DonatePage() {

  const [value, setValue] = useState(100);
  const [num, setNum] = useState(1);


  const handleClick = () => {
    setValue(value + 100);
    setNum(num + 1)

  }

  return (

    <section className="bg-gray-100 py-4 px-8 md:h-screen">

      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">

        {/* Left Part */}
        <div className="relative lg:col-span-2 lg:py-12 my-4">

          <div className='absolute top-0 left-0'>
            <a href='/' className="bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg hover:scale-110">
              Back to Home
            </a>
          </div>

          <div className="relative py-8 sm:max-w-xl sm:mx-auto hidden md:block">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div className="relative px-4 py-10 bg-gradient-to-r from-green-300 to-purple-400 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <p className="text-3xl font-bold text-gray-700">
                  Join us in giving hope and nourishment to children in need! Your donation can provide a warm meal and a smile to a child's face.
                  <span className='hidden xl:block'>
                    Together, we can make a difference in their lives. Every dollar counts, so donate now and be the change!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="rounded-lg bg-blue-200 p-2 shadow-lg lg:col-span-3 lg:p-12">
          <div className="relative px-2 sm:px-6 lg:px-8 max-w-lg mx-auto">
            <div className="bg-white px-2 sm:px-8 rounded-xl shadow-xl ">

              <div className="text-center mb-6">
                <div className="mb-2">
                  <img className="-mt-8 inline-flex rounded-full" src="./images/food-plate.png" width="100" height="100" alt="" />
                </div>
                <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">
                  You can create an impact right now!🔥
                </h1>
              </div>

              <div className="mb-6 mx-auto">
                <div className="flex justify-center sm:justify-between gap-6 p-1 bg-gray-50 rounded">

                  <div className="hidden sm:flex font-bold"> Pay for a meal
                  </div>

                  <button className="bg-yellow-500 hover:bg-green-500 shadow-xl border-2 text-white px-2 py-1 text-sm rounded" onClick={handleClick}>
                    Add meal
                  </button>

                  <div className="font-bold"> <span className='hidden sm:inline-block'>Total</span> Meals: {num}</div>
                </div>
              </div>

              <div>

                {/* Form */}
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-nr">Card Number <span className="text-red-500">*</span></label>
                    <input id="card-nr" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="1234 1234 1234 1234" />
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">Expiry Date <span className="text-red-500">*</span></label>
                      <input id="card-expiry" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="MM/YY" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">CVC <span className="text-red-500">*</span></label>
                      <input id="card-cvc" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="CVC" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-name">Name on Card <span className="text-red-500">*</span></label>
                    <input id="card-name" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="Your Name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-email">Email <span className="text-red-500">*</span></label>
                    <input id="card-email" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder="Your email" />
                  </div>

                </div>

                {/* Payment Button */}
                <div className="mt-6">
                  <div className="mb-4">
                    <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2 mb-3">Pay &#8377;{value}
                    </button>
                  </div>
                </div>

              </div>

              {/* Pay icons */}
              <div className="flex justify-center items-center gap-2 sm:gap-4 pb-4">
                <img src="./images/paytm.png" className="h-3 sm:h-4"></img>
                <img src="./images/phonepe.png" className="h-5 sm:h-8"></img>
                <img src="./images/gpay.png" className="h-3 sm:h-6"></img>
                <img src="./images/bhimupi.png" className="h-3 sm:h-6"></img>
                <img src="./images/paypal.png" className="h-3 sm:h-6"></img>
              </div>

            </div>
          </div>
        </div>

      </div>

    </section>

  )
}
