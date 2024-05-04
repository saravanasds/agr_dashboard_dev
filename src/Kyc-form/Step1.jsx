

import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";


    
const Step1 = ({ nextStep, formData = {}, updateFormData }) => {
    const [selectedGender, setSelectedGender] = useState(formData.gender || '');
    const [error, setError] = useState("");

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        guardian: yup.string().required("Guardian is required"),
        adharProof: yup.string().required("Address proof is required"),
        photo: yup.string().required("Photo upload is required"),
        mobileNumber: yup.number().required("Mobile Number is required"),
        aadharNo: yup.number().required("Aadhar Number is required"),
        nomineeName: yup.string().required("Nominee detail is required"),
        nomineeRelationship: yup.string().required("Nominee Relationship is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: formData.name || "",
            guardian: formData.guardian || "",
            dob: formData.dob || "",
            gender: formData.gender || "",
            address: formData.address || "",
            mobileNumber: formData.mobileNumber || "",
            alternateMobileNumber: formData.alternateMobileNumber || "",
            aadharNo: formData.aadharNo || "",
            adharProof: formData.adharProof || "",
            photo: formData.photo || "",
            nomineeName: formData.nomineeName || "",
            nomineeRelationship: formData.nomineeRelationship || "",
            agree: formData.agree || false, // Add this line for agreement checkbox
        },
        validationSchema,
        onSubmit: values => {
            updateFormData(values);
            nextStep();
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.handleChange(e);
        if (name === "gender") {
            setSelectedGender(value);
        }
    };


    return (
        <>
            <div className="w-full xl:w-[80%] flex justify-center items-center">
                <div className="w-full py-6">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
                        KYC Form
                    </h1>
                    <form onSubmit={formik.handleSubmit} className='w-full p-3'>
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
                                                name='gender'
                                                checked={selectedGender === 'male'}
                                                onChange={handleChange}
                                            />
                                            Male
                                        </label>
                                        <label className='flex justify-around items-center gap-1'>
                                            <input
                                                type="radio"
                                                value="female"
                                                name='gender'
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
                                        value={formik.values.dob}
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
                                        value={formik.values.address}
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
                                    <label htmlFor="adharProof" className="block text-gray-700 font-semibold mb-1 text-left">
                                        Upload Aadhar proof:
                                    </label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        id="adharProof"
                                        className="w-full bg-gray-200 rounded-lg py-0 px-4"
                                        name="adharProof"
                                        onChange={(event) => {
                                            formik.setFieldValue(
                                                "adharProof",
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.adharProof && formik.errors.adharProof && (
                                    <p className="text-red-500 mb-4">
                                        {formik.errors.adharProof}
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
                                        name="nomineeName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nomineeName}
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.nomineeName && formik.errors.nomineeName && (
                                    <p className="text-red-500 mb-4">
                                        {formik.errors.nomineeName}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                                    placeholder="Nominee Relationship"
                                    name="nomineeRelationship"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.relation}
                                />

                            </div>
                        </div>


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
