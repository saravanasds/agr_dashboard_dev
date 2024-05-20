import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../utils/utils";

export default function AdminRegister() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validation = yup.object({
        name: yup.string().required("Enter Name"),
        email: yup
            .string()
            .required("Email is required")
            .email("Email is not valid"),
        password: yup.string().required("Password is required"),
    });
    async function sendData(values) {
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:9000/api/admin/register`,
                values
            );
            const data = response.data;

            setLoading(false);

            // Handle successful registration
            toast.success("Register Successfull. Reset Email Send.", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            navigate("/adminLogin");
        } catch (err) {
            // Handle errors
            setLoading(false);
            const errorMessage = err.response?.data?.error || "Internal Server Error";
            setError(errorMessage);

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: validation,
        onSubmit: sendData,
    });
    function changeBgRegister() {
        document.getElementById("changeR").classList.add("auth");
    }
    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center m-auto" style={{ background: 'linear-gradient(to right, #3B82F6, #4C1D95' }}>
                <div className="w-full flex flex-col items-center justify-start py-5 md:py-0">
                    <div className="container mx-auto flex justify-center">
                        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg">
                            <div className="px-8 py-8">
                                <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
                                    Admin Register
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
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
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
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.errors.email && formik.touched.email ? (
                                        <p className="text-red-500 mb-4">{formik.errors.email}</p>
                                    ) : (
                                        ""
                                    )}
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
                                    <button
                                        onClick={() => changeBgLogin()}
                                        id="change"
                                        type="submit"
                                        className="w-full bg-blue-500 rounded-lg text-white py-3 font-bold transition duration-300 ease-in-out hover:bg-blue-600 mb-4"
                                    >
                                        {loading ? (
                                            <div className="flex justify-center">
                                                <Oval
                                                    height={30}
                                                    width={30}
                                                    color="#fff"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                    ariaLabel="oval-loading"
                                                    secondaryColor="#86b7fe"
                                                    strokeWidth={2}
                                                    strokeWidthSecondary={2}
                                                />
                                            </div>
                                        ) : (
                                            "Register"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-white mt-4">
                        <p>
                            Already Have An Account?{" "}
                            <Link to="/AdminLogin" className="font-bold hover:underline">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
