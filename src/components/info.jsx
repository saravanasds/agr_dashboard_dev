import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export default function Info() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 3000; // 3 seconds delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const delay = 4000; // 4 seconds delay
    const timeout = setTimeout(() => {
      navigate("/register");
    }, delay);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-5 md:py-0">
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg">
          <div className="md:w-full bg-white-500">
            <div className="text-center p-5">
              <img
                src="/applogo.png"
                alt="Your Logo"
                className="mt-0 mb-5 mx-auto"
                width="350"
                height="350"
              />
              <h1 className="text-main font-bold text-blue-900 text-3xl">
                Welcome to AGR Group of Companies!
              </h1>
              <br></br>
              <p className="mb-4">
                AGR Group of Companies, founded by Ln. Adalur G. Ramamoorthy,
                aims to uplift the community by fulfilling the dreams and goals
                of its members while emphasizing the importance of humanity in
                building a good community. The company's mission to eradicate
                poverty aligns with its vision of creating opportunities for
                individuals to improve their financial status.
              </p>
              {loading ? (
                <div className="flex justify-center">
                  <Oval
                    height={30}
                    width={30}
                    color="#fff"
                    visible={true}
                    secondaryColor="#86b7fe"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              ) : (
                <p className="text-green-500 text-3xl">Earn More!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
