import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-5 md:py-0">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-5xl mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Success!</h1>
          </div>
          <p className="text-gray-700 mb-8 text-center">{message}</p>
          <Link
            to="/"
            className="block bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
