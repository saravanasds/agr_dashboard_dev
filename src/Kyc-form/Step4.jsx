
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const Step4 = ({ nextStep, prevStep }) => {

    const [formData, setFormData] = useState({
        amount: "5000", // Default Amount
        screenshot: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setSelectedGender(e.target.value);
    };

    const validationSchema = yup.object({
        paymentDate: yup.string().required("Payment Date is required"),
        transactionId: yup.string().required("Transaction.no is required"),
        paymentScreenshot: yup.string().required("Payment Screenshot is required"),
    });

    const formik = useFormik({
        initialValues: {
            paymentDate: '',
            transactionId: '',
            referralId: '',
            paymentScreenshot: ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            nextStep();
        }
    });



    const handleFileChange = (e) => {
        setFormData({ ...formData, screenshot: e.target.files[0] });
    };


    return (
        <>
            <div className="mx-auto w-full flex justify-center items-center min-h-screen">
                <div className="bg-white w-full lg:w-3/4 pt-4 pb-4 mb-2 p-3">
                    <h1 className="text-3xl font-bold text-gray-800 mb-16 mt-8">
                        Payment Approval Form
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col sm:flex-row w-full text-start gap-3'>
                            <div className='w-full sm:w-1/2 md:px-5'>

                                <div className="mb-4">
                                    <label
                                        htmlFor="paymentDate"
                                        className="block text-gray-700 font-semibold mb-1"
                                    >
                                        Payment Date
                                    </label>
                                    <input
                                        type="date"
                                        id="paymentDate"
                                        name="paymentDate"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        required
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.paymentDate && formik.errors.paymentDate && (
                                    <p className="text-red-500 mb-4">{formik.errors.paymentDate}</p>
                                )}

                                <div className="mb-4">
                                    <label
                                        htmlFor="transactionId"
                                        className="block text-gray-700 font-semibold mb-1"
                                    >
                                        Transaction Id
                                    </label>
                                    <input
                                        type="text"
                                        id="transactionId"
                                        name="transactionId"
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                    // Make it read-only
                                    />
                                </div>
                                {/* Display error message if touched and there's an error */}
                                {formik.touched.transactionId && formik.errors.transactionId && (
                                    <p className="text-red-500 mb-4">{formik.errors.transactionId}</p>
                                )}
                            </div>

                            <div className='w-full sm:w-1/2 md:px-5'>
                                <div className="mb-4">
                                    <label
                                        htmlFor="referenceId"
                                        className="block text-gray-700 font-semibold mb-1"
                                    >
                                        Referral ID(If any)
                                    </label>
                                    <input
                                        type="text"
                                        id="referenceId"
                                        name="referenceId"
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                    // Make it read-only
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="amount"
                                        className="block text-gray-700 font-semibold mb-1"
                                    >
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        readOnly // Make it read-only
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 w-full md:w-1/2 md:px-5 text-start">
                            <label
                                htmlFor="paymentScreenshot"
                                className="block text-gray-700 font-semibold mb-1"
                            >
                                Payment Screenshot
                            </label>
                            <input
                                type="file"
                                id="paymentScreenshot"
                                name="paymentScreenshot"
                                onChange={handleFileChange}
                                className="w-full bg-gray-200 rounded-lg py-0 px-4"
                                required
                            />
                        </div>

                        {/* Display error message if touched and there's an error */}
                        {formik.touched.paymentScreenshot && formik.errors.paymentScreenshot && (
                            <p className="text-red-500 mb-4">{formik.errors.paymentScreenshot}</p>
                        )}

                        <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3'>
                            <button onClick={prevStep} className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                            <button type="submit" className="w-full sm:w-auto bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Submit</button>
                            <button type="submit" onClick={nextStep} className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Nxt</button>
                        </div>
                    </form>
                </div>



            </div>
        </>
    );
};

export default Step4;
