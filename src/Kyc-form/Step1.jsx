

import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Step1 = ({ nextStep }) => {


    const [selectedGender, setSelectedGender] = useState('');
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        amount: "5000", // Default Amount
        screenshot: null,
    });

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        guardian: yup.string().required("Guardian is required"),
        addressProof: yup.string().required("Address proof is required"),
        photo: yup.string().required("Photo upload is required"),
        mobileNumber: yup.number().required("Mobile Number is required"),
        nomineeDetail: yup.string().required("Nominee detail is required"),
    });

    const formik = useFormik({
        initialValues: {
            referenceId: "Ref123456",
            name: "",
            guardian: "",
            dob: "",
            address: "",
            mobileNumber: "",
            alternateMobileNumber: "",
            addressProof: "",
            photo: "",
            nomineeDetail: "",
        },
        validationSchema,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.handleChange(e);
        setSelectedGender(value);
    };

    const handleNext = (e) => {
        e.preventDefault();
        formik.handleSubmit();
        if (formik.isValid) {
            nextStep();
        }
    };



    return (
        <>
            <div className="w-full xl:w-[80%] flex justify-center items-center">
                <div className="w-full py-6">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
                        KYC Form
                    </h1>
                    <form onSubmit={handleNext} className='w-full p-3'>
                        {error && (
                            <p className="text-center text-red-500 mb-4">{error}</p>
                        )}
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='w-full md:w-1/2'>

                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Enter Name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {/* Display error message if touched and there's an error */}
                                    {formik.touched.name && formik.errors.name && (
                                        <p className="text-red-500 text-left mb-4">
                                            {formik.errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Guardian Name"
                                        name="guardian"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.guardian}
                                    />
                                    {/* Display error message if touched and there's an error */}
                                    {formik.touched.guardian && formik.errors.guardian && (
                                        <p className="text-red-500 text-left mb-4">
                                            {formik.errors.guardian}
                                        </p>
                                    )}
                                </div>

                                <div className='py-1 flex items-center gap-5 text-left mb-1'>
                                    <label className="block text-gray-700 font-semibold">Gender:</label>
                                    <div className='w-full flex justify-around items-center'>
                                        <label className='flex justify-around items-center gap-1'>
                                            <input
                                                type="radio"
                                                value="male"
                                                checked={selectedGender === 'male'}
                                                onChange={handleChange}
                                            />
                                            Male
                                        </label>
                                        <label className='flex justify-around items-center gap-1'>
                                            <input
                                                type="radio"
                                                value="female"
                                                checked={selectedGender === 'female'}
                                                onChange={handleChange}
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="dob"
                                        className="block text-gray-700 font-semibold mb-1 text-left"
                                    >
                                        Date Of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        required
                                    />
                                </div>


                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-gray-700 font-semibold mb-1 text-left"
                                    >
                                        Address For Communication
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        required
                                    />
                                </div>

                                <div className='mb-1'>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Mobile Number"
                                        name="mobileNumber"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.mobileNumber}
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                    <p className="text-red-500 mb-4">
                                        {formik.errors.mobileNumber}
                                    </p>
                                )}

                            </div>

                            {/* Input field for Mobile Number upload */}
                            <div className='w-full md:w-1/2'>

                                <div className="mb-4">
                                    <input
                                        type="number"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Alternate Mobile Number"
                                        name="alternateMobileNumber"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.alternateMobileNumber}
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="number"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Aadhar Number"
                                        name="aadharNo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.aadharNo}
                                    />
                                </div>

                                {/* Input field for address proof upload */}
                                <div className="mb-4">
                                    <label htmlFor="addressProof" className="block text-gray-700 font-semibold mb-1 text-left">
                                        Upload Aadhar proof:
                                    </label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        id="addressProof"
                                        className="w-full bg-gray-200 rounded-lg py-0 px-4"
                                        name="addressProof"
                                        onChange={(event) => {
                                            formik.setFieldValue(
                                                "addressProof",
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.addressProof && formik.errors.addressProof && (
                                    <p className="text-red-500 mb-4">
                                        {formik.errors.addressProof}
                                    </p>
                                )}

                                {/* Input field for Photo upload */}
                                <div className="mb-4">
                                    <label htmlFor="photo" className="block text-gray-700 font-semibold mb-1 text-left">
                                        Upload Photo:
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="photo"
                                        className="w-full bg-gray-200 rounded-lg py-0 px-4"
                                        name="photo"
                                        onChange={(event) => {
                                            formik.setFieldValue("photo", event.currentTarget.files[0]);
                                        }}
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.photo && formik.errors.photo && (
                                    <p className="text-red-500 mb-4">{formik.errors.photo}</p>
                                )}

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Enter Nominee Name"
                                        name="nomineeDetail"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nomineeDetail}
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.nomineeDetail && formik.errors.nomineeDetail && (
                                    <p className="text-red-500 mb-4">
                                        {formik.errors.nomineeDetail}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                                    placeholder="Nominee Relationship"
                                    name="relation"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.relation}
                                />

                            </div>
                        </div>

                        {/* <div className='flex justify-center items-center'>
                                            {currentStep < steps.length && (
                                                <button
                                                    type="submit"
                                                    onClick={handleNext}
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:shadow-outline -mt-3"
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
                                                        "Next"
                                                    )}
                                                </button>
                                            )}
                                        </div> */}

                        {/* Agreement Checkbox */}
                        <label className="flex items-center py-3">
                            <input
                                type="checkbox"
                                name="agree"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.agree}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">
                                I certify that above details are correct
                            </span>
                        </label>

                        <div className='w-full flex justify-center items-center'>
                            <button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Next</button>
                            <button type="submit" onClick={nextStep} className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Nxt</button>
                        </div>
                    </form>
                </div>
            </div>





        </>
    );
};

export default Step1;
