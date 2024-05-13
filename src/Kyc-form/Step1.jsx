import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../utils/utils";

export default function Step1({ nextStep, formData = {}, updateFormData }) {
    const [error, setError] = useState("");
    const [emailExistError, setEmailExistError] = useState("");

    const validation = yup.object({
        firstName: yup.string().required("Enter First Name"),
        email: yup
            .string()
            .required("Email is required")
            .email("Email is not valid"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: formData.name || "",
            email: formData.email || "",
            password: formData.password || "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            updateFormData(values);
            nextStep();
        },
    });

    const checkEmailExistence = async (email) => {
        try {
            const response = await fetch("http://localhost:9000/api/auth/userExist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                // If response status is 200 OK, email does not exist
                setEmailExistError("");
            } else {
                // If response status is not 200 OK, email already exists
                setEmailExistError("Email already exists");
            }
        } catch (error) {
            console.error("Error checking email existence:", error);
        }
    };

    const handleEmailChange = async (e) => {
        const email = e.target.value;
        formik.handleChange(e);
        await checkEmailExistence(email);
    };

    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center m-auto" style={{ background: 'linear-gradient(to right, #3B82F6, #4C1D95' }}>
                <div className="w-full flex flex-col items-center justify-start py-5 md:py-0">
                    <div className="container mx-auto flex justify-center">
                        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg">
                            <div className="px-8 py-8">
                                <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
                                    Register New Account
                                </h1>

                                <form onSubmit={formik.handleSubmit}>
                                    {error ? (
                                        <p className="text-center text-red-500 mb-4">{error}</p>
                                    ) : (
                                        ""
                                    )}
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                                        placeholder="Enter Your Name"
                                        name="firstName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstName}
                                    />
                                    {error ? (
                                        <p className="text-center text-red-500 mb-4">{error}</p>
                                    ) : (
                                        ""
                                    )}
                                    <input
                                        type="email"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                                        placeholder="Enter Email"
                                        name="email"
                                        onChange={handleEmailChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.errors.email && formik.touched.email ? (
                                        <p className="text-red-500 mb-4">{formik.errors.email}</p>
                                    ) : (
                                        ""
                                    )}
                                    {emailExistError && <p className="text-red-500 mb-4">{emailExistError}</p>}
                                    <div className="relative">
                                        <input
                                            id="password-input"
                                            type="password"
                                            className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                                            placeholder="Enter Password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        <i
                                            onClick={() => togglePasswordVisibility()}
                                            className="absolute top-0 right-0 mt-3 mr-4 cursor-pointer fas fa-eye-slash"
                                        ></i>
                                    </div>
                                    {formik.errors.password && formik.touched.password ? (
                                        <p className="text-red-500 mb-4">{formik.errors.password}</p>
                                    ) : (
                                        ""
                                    )}
                                    <button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Register</button>
                                    <button type="submit" onClick={nextStep} className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Nxt</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-white mt-4">
                        <p>
                            Already Have An Account?{" "}
                            <Link to="/login" className="font-bold hover:underline">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
