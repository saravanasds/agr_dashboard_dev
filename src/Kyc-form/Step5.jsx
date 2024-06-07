import React, { useState } from 'react';
import * as yup from "yup";

const Step5 = ({ nextStep, prevStep, formData = {}, updateFormData, sendData }) => {
    const [errors, setErrors] = useState({});

    const validationSchema = yup.object({
        paymentDate: yup.string().required("Payment Date is required"),
        transactionId: yup.string().required("Transaction.no is required"),
        paymentScreenshot: yup.mixed().required("Payment screenshot is required"),
        referredBy: yup.string(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                // Proceed to next step if validation passes
                nextStep();
            })
            .catch((validationErrors) => {
                // Handle validation errors
                const newErrors = {};
                validationErrors.inner.forEach(error => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update form data
        updateFormData({
            ...formData,
            [name]: value
        });
        // Clear the error when the input value changes
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    return (
        <>
            <div className="mx-auto w-full flex justify-center items-center min-h-screen">
                <div className="bg-white w-full lg:w-3/4 pt-4 pb-4 mb-2 p-3">
                    <h1 className="text-3xl font-bold text-gray-800 mb-16 mt-8">
                        Payment Approval Form
                    </h1>
                    <form onSubmit={handleSubmit}>
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
                                        value={formData.paymentDate}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        required
                                    />
                                    {errors.paymentDate && <p className="text-red-500 text-left mb-1">{errors.paymentDate}</p>}
                                </div>

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
                                        value={formData.transactionId}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                    />
                                    {errors.transactionId && <p className="text-red-500 text-left mb-1">{errors.transactionId}</p>}
                                </div>
                            </div>

                            <div className='w-full sm:w-1/2 md:px-5'>
                                <div className="mb-4">
                                    <label
                                        htmlFor="referredBy"
                                        className="block text-gray-700 font-semibold mb-1"
                                    >
                                        Referral ID(If any)
                                    </label>
                                    <input
                                        type="text"
                                        id="referredBy"
                                        name="referredBy"
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
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
                                className="w-full bg-gray-200 rounded-lg py-0 px-4"
                                onChange={(event) => {
                                    updateFormData({
                                        ...formData,
                                        paymentScreenshot: event.currentTarget.files[0]
                                    });
                                }}
                                required
                            />
                            {errors.paymentScreenshot && <p className="text-red-500 text-left mb-1">{errors.paymentScreenshot}</p>}
                        </div>

                        <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3'>
                            <button onClick={prevStep} className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                            <button type="submit" onClick={sendData} className="w-full sm:w-auto bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Submit</button>
                            <button onClick={nextStep} className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Nxt</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step5;
