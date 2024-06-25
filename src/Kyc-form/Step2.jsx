import React, { useState } from 'react';
import * as yup from "yup";

const Step2 = ({ nextStep, prevStep, formData = {}, updateFormData }) => {
    const [selectedGender, setSelectedGender] = useState(formData.gender || '');
    const [errors, setErrors] = useState({});

    const validationSchema = yup.object({
        guardian: yup.string().required("Guardian is required"),
        mobileNumber: yup.string().required("Whatsapp Number is required"),
        aadharNo: yup.string().required("Aadhar Number is required"),
        nomineeName: yup.string().required("Nominee detail is required"),
        nomineeRelationship: yup.string().required("Nominee Relationship is required"),
        adharProof: yup.mixed().required("adhar proof is required"),
        photo: yup.mixed().required("photo is required"),
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
        // console.log(name ,":", value)
        updateFormData({
            ...formData,
            [name]: value
        });
        if (name === "gender") {
            setSelectedGender(value);
        }
        // Clear the error when the input value changes
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    return (
        <>
            <div className="w-full xl:w-[80%] flex justify-center items-center">
                <div className="w-full py-6">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
                        KYC Form
                    </h1>
                    <form onSubmit={handleSubmit} className='w-full p-3'>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='w-full md:w-1/2'>

                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Guardian Name"
                                        name="guardian"
                                        onChange={handleChange}
                                        value={formData.guardian}
                                    />
                                    {errors.guardian && <p className="text-red-500 text-left mb-1">{errors.guardian}</p>}
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
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        required
                                    />
                                    {errors.dob && <p className="text-red-500 text-left mb-1">{errors.dob}</p>}
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
                                    {errors.address && <p className="text-red-500 text-left mb-1">{errors.address}</p>}
                                </div>

                                <div className='mb-1'>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Whatsapp Number"
                                        name="mobileNumber"
                                        onChange={handleChange}
                                        value={formData.mobileNumber}
                                    />
                                    {errors.mobileNumber && <p className="text-red-500 text-left mb-1">{errors.mobileNumber}</p>}
                                </div>
                            </div>

                            <div className='w-full md:w-1/2'>

                                <div className="mb-4">
                                    <input
                                        type="number"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Alternate Mobile Number"
                                        name="alternateMobileNumber"
                                        onChange={handleChange}
                                        value={formData.alternateMobileNumber}
                                    />
                                    {errors.alternateMobileNumber && <p className="text-red-500 text-left mb-1">{errors.alternateMobileNumber}</p>}
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="number"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Aadhar Number"
                                        name="aadharNo"
                                        onChange={handleChange}
                                        value={formData.aadharNo}
                                    />
                                    {errors.aadharNo && <p className="text-red-500 text-left mb-1">{errors.aadharNo}</p>}
                                </div>

                                {/* Input field for address proof upload */}
                                <div className="mb-4">
                                    <label htmlFor="adharProof" className="block text-gray-700 font-semibold mb-1 text-left">
                                        Upload Aadhar proof:
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="adharProof"
                                        className="w-full bg-gray-200 rounded-lg py-0 px-4"
                                        name="adharProof"
                                        onChange={(event) => {
                                            updateFormData({
                                                ...formData,
                                                adharProof: event.currentTarget.files[0]
                                            });
                                        }}
                                    />
                                    {errors.adharProof && <p className="text-red-500 text-left mb-1">{errors.adharProof}</p>}
                                </div>

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
                                            updateFormData({
                                                ...formData,
                                                photo: event.currentTarget.files[0]
                                            });
                                        }}
                                    />
                                    {errors.photo && <p className="text-red-500 text-left mb-1">{errors.photo}</p>}
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-200 rounded-lg py-3 px-4"
                                        placeholder="Enter Nominee Name"
                                        name="nomineeName"
                                        onChange={handleChange}
                                        value={formData.nomineeName}
                                    />
                                    {errors.nomineeName && <p className="text-red-500 text-left mb-1">{errors.nomineeName}</p>}
                                </div>

                                <input
                                    type="text"
                                    className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                                    placeholder="Nominee Relationship"
                                    name="nomineeRelationship"
                                    onChange={handleChange}
                                    value={formData.nomineeRelationship}
                                />
                                {errors.nomineeRelationship && <p className="text-red-500 text-left mb-1">{errors.nomineeRelationship}</p>}

                            </div>
                        </div>

                        <div className='w-full flex justify-center items-center'>
                            <button onClick={prevStep} className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-12 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                            <button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step2;
