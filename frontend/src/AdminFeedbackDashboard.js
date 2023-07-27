import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminFeedbackDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Call the handleGetRecipientData function automatically when the component mounts
    handleGetFeedbackData();
  }, []);


  const handleGetFeedbackData = () => {
    axios.get("https://rsb.onrender.com/api/feedback-data")
      .then((response) => {
        setFeedbackData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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


  const handleMarkAsRead = (id) => {
    axios.put(`https://rsb.onrender.com/api/mark-feedback-as-read/${id}`)
      .then(() => {
        const updatedFeedbackData = feedbackData.map((feedback) => {
          if (feedback.id === id) {
            feedback.is_read = 1;
          }
          return feedback;
        });
        setFeedbackData(updatedFeedbackData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const feedbackGroups = feedbackData.reduce(
    (groups, feedback) => {
      if (feedback.is_read === 1) {
        groups.read.push(feedback);
      } else {
        groups.unread.push(feedback);
      }
      return groups;
    },
    { read: [], unread: [] }
  );


  return (

    <section className="w-full flex flex-col gap-4 py-10 bg-gradient-to-r from-orange-400 to-rose-400">

      <div className="w-[80%] mx-auto">

        {/* Heading */}
        <div className="text-center mx-auto">

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 text-gray-600">User Feedbacks</h2>

          {/* Separator */}
          <div className="text-center mb-10">
            <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span className="inline-block w-40 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
          </div>

        </div>

        {/* UNREAD FEEDBACK GROUP */}
        {feedbackGroups.unread.length > 0 && (

          <div>

            <h2 className="text-center text-3xl mb-4 text-white">Unread Feedback</h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

              {feedbackGroups.unread.map((feedback) => (
                <div key={feedback.id}>

                  {/* CARD */}
                  <div className="w-full h-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light flex flex-col justify-around">

                    {/* Name */}
                    <div className="w-full flex justify-center">
                      <h6 className="text-center font-bold uppercase">{feedback.name}</h6>
                    </div>

                    {/* Separator */}
                    <hr className="inline-block w-full h-1 rounded-full my-4 bg-gray-200" />

                    {/* Subject */}
                    <p className="leading-relaxed italic font-bold text-gray-800 mx-1">
                      {feedback.subject}
                    </p>

                    {/* Message */}
                    <div className="h-[92px] overflow-auto">
                      <p className="leading-relaxed mt-2 text-gray-900 mx-1">
                        {feedback.message}
                      </p>
                    </div>

                    {/* Button */}
                    <center className="py-2">
                      <button onClick={() => handleMarkAsRead(feedback.id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border py-1 px-2 border-blue-500 hover:border-transparent rounded-full hover:shadow-2">
                        Mark As Read
                      </button>
                    </center>

                    {/*Separator*/}
                    <hr className="inline-block w-full h-1 rounded-full my-4 bg-gray-200" />

                    {/* Date */}
                    <div className="text-center text-gray-700">
                      {convertDate(feedback.created_at)}
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        )}

        {/* READ FEEDBACK GROUP */}
        {feedbackGroups.read.length > 0 && (

          <div className="mt-28">

            <h2 className="text-center text-3xl mb-4 text-white">Read Feedback</h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

              {feedbackGroups.read.map((feedback) => (
                <div key={feedback.id}>

                  {/* CARD */}
                  <div className="w-full h-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light flex flex-col justify-around">

                    {/* Name */}
                    <div className="w-full flex justify-center">
                      <h6 className="text-center font-bold uppercase">{feedback.name}</h6>
                    </div>

                    {/* Separator */}
                    <hr className="inline-block w-full h-1 rounded-full my-4 bg-gray-200" />

                    {/* Subject */}
                    <p className="leading-relaxed italic font-bold text-gray-800 mx-1">
                      {feedback.subject}
                    </p>

                    {/* Message */}
                    <div className="h-[92px] overflow-auto">
                      <p className="leading-relaxed mt-2 text-gray-900 mx-1">
                        {feedback.message}
                      </p>
                    </div>

                    {/*Separator*/}
                    <hr className="inline-block w-full h-1 rounded-full my-4 bg-gray-200" />

                    {/* Date */}
                    <div className="text-center text-gray-700">
                      {convertDate(feedback.created_at)}
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        )}

      </div>

    </section>

  );
};
