import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const Step3 = ({ nextStep, prevStep, formData = {}, updateFormData }) => {

    const validationSchema = yup.object({
        bankAcno: yup.string().required("Account number is required"),
        bankName: yup.string().required("Bank Name is required"),
        branch: yup.string().required("Branch is required"),
        ifsc: yup.string().required("IFSC code is required"),
        gpayNumber: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            bankAcno: formData.bankAcno || '',
            bankName: formData.bankName || '',
            branch: formData.branch || '',
            ifsc: formData.ifsc || '',
            gpayNumber: formData.ifsc || ''
        },
        validationSchema,
        onSubmit: values => {
            updateFormData(values);
            nextStep();
        }
    });

    return (
        <>
            <div className="mx-auto w-full flex justify-center items-center min-h-screen">
                <div className="w-[90%] px-3 py-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-16 text-center">
                        Account Details
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col items-center justify-center sm:flex-row w-full text-start'>
                            <div className='w-full lg:w-2/3  md:px-5'>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Enter Bank Account No"
                                        name="bankAcno"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.bankAcno} 
                                    />
                                    {formik.touched.bankAcno && formik.errors.bankAcno && (
                                        <p className="text-red-500 mb-4">
                                            {formik.errors.bankAcno}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Bank Name"
                                        name="bankName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.bankName}
                                    />
                                    {formik.touched.bankName && formik.errors.bankName && (
                                        <p className="text-red-500 mb-4">
                                            {formik.errors.bankName}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Branch"
                                        name="branch"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.branch}
                                    />
                                    {formik.touched.branch && formik.errors.branch && (
                                        <p className="text-red-500 mb-4">
                                            {formik.errors.branch}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="IFSC Code"
                                        name="ifsc"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.ifsc}
                                    />
                                    {formik.touched.ifsc && formik.errors.ifsc && (
                                        <p className="text-red-500 mb-4">
                                            {formik.errors.ifsc}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Gpay Number"
                                        name="gpayNumber"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gpayNumber}
                                    />
                                    {formik.touched.gpayNumber && formik.errors.gpayNumber && (
                                        <p className="text-red-500 mb-4">
                                            {formik.errors.gpayNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3'>
                            <button onClick={prevStep} className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                            <button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step3;
