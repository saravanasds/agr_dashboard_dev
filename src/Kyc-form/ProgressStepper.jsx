import React, { useState } from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { togglePasswordVisibility } from "../utils/utils";

const steps = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
  { id: 4, label: 'Step 4' },
  { id: 5, label: 'Step 5' },
];

const ProgressStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    guardian: yup.string().required("Guardian is required"),
    addressProof: yup.string().required("Address proof is required"),
    photo: yup.string().required("Photo upload is required"),
    mobileNumber: yup.number().required("Mobile Number is required"),
    nomineeDetail: yup.string().required("Nominee detail is required"),
    accountDetail: yup.string().required("Account detail is required"),
    bankName: yup.string().required("Bank Name is required"),
    panNo: yup.string().required("PAN number is required"),
    agree: yup.boolean().oneOf([true], "You must agree to continue"),
  });

  async function submitKYCForm(values) {
    setLoading(true);
    try {
      // You can send form data to your backend API endpoint here
      // Example:
      // const response = await axios.post("/api/kyc", values);
      // Handle response accordingly

      toast.success("KYC submitted successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Redirect to success page or home page
      navigate("/payment", {
        state: { message: "KYC submitted successfully" },
      });
    } catch (err) {
      setLoading(false);
      setError("Error submitting KYC");
      toast.error("Error submitting KYC", {
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
      accountDetail: "",
      bankName: "",
      panNo: "",
      agree: false,
    },
    validationSchema,
    onSubmit: submitKYCForm,
  });

  const [formData, setFormData] = useState({
    amount: "5000", // Default Amount
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSelectedGender(e.target.value);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, screenshot: e.target.files[0] });
  };

  const handleSubmited = (e) => {
    e.preventDefault();
    // Submit form data or perform validation here
    console.log(formData);

    // Redirect to success page
    // history.push("/success");
  };

  const [selectedGender, setSelectedGender] = useState('');

  return (
    <div className="mx-auto w-full flex justify-center items-center min-h-screen">
      <div className="bg-white w-full lg:w-3/4 pt-4 pb-4 mb-2">
        <div>
          {/* <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">
            Step {currentStep} of {steps.length}
          </div> */}
          <div className="flex items-center mt-1 justify-around">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex px-2 lg:px-14 py-1 rounded ${step.id === currentStep
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 font-bold text-white'
                  : 'text-gray-400 font-bold'
                  } text-center`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} action='/login'>
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center justify-start py-4 md:py-0">
              <div className="container mx-auto flex justify-center">
                <div className="w-full bg-white">
                  <div className="px-8 py-6">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
                      KYC Form
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                      {error && (
                        <p className="text-center text-red-500 mb-4">{error}</p>
                      )}
                      {/* Default Reference ID */}
                      <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-1/2 p-5'>
                          {/* <input
                            type="text"
                            className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                            placeholder="Reference ID"
                            name="referenceId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.referenceId}
                            disabled // Make it disabled
                          /> */}
                          {/* Display error message if touched and there's an error */}
                          {/* {formik.touched.referenceId && formik.errors.referenceId && (
                            <p className="text-red-500 mb-4">{formik.errors.referenceId}</p>
                          )} */}

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

                        </div>

                        {/* Input field for Mobile Number upload */}
                        <div className='w-full md:w-1/2 p-5'>

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

                      <div className='flex justify-center items-center'>
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (

            <div className="flex flex-col items-center justify-center py-5 md:py-0">
              <div className="container mx-auto flex items-center justify-start">
                <div className=" w-full bg-white p-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-16">
                    Account Details
                  </h1>
                  <form onSubmit={handleSubmited}>
                    <div className='flex flex-col items-center justify-center sm:flex-row w-full text-start'>
                      <div className='w-full lg:w-1/2 px-2 md:px-5'>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="w-full bg-gray-200 rounded-lg py-3 px-4"
                            placeholder="Enter Bank Account No"
                            name="accountDetail"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.accountDetail}
                          />
                        </div>
                        {formik.touched.accountDetail && formik.errors.accountDetail && (
                          <p className="text-red-500 mb-4">
                            {formik.errors.accountDetail}
                          </p>
                        )}

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
                        </div>
                        {/* Display error message if touched and there's an error */}
                        {formik.touched.bankName && formik.errors.bankName && (
                          <p className="text-red-500 mb-4">
                            {formik.errors.bankName}
                          </p>
                        )}

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
                        </div>
                        {/* Display error message if touched and there's an error */}
                        {formik.touched.ifsc && formik.errors.ifsc && (
                          <p className="text-red-500 mb-4">
                            {formik.errors.ifsc}
                          </p>
                        )}


                      </div>

                    </div>

                    <div className='flex justify-center items-center mt-20'>
                      <div>
                        {currentStep !== 1 && (
                          <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-12 rounded-lg focus:outline-none focus:shadow-outline"
                            onClick={handlePrevious}
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <div>
                        {currentStep < steps.length && (
                          <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:shadow-outline ml-4"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (

            <div className="w-full flex flex-col items-center justify-center py-5 mt-10 md:py-0">
              <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="w-full flex justify-center items-center bg-white p-8">
                  <div className="flex flex-col md:flex-row justify-center mb-4 border-2">
                    <img
                      src="./QR.jpeg"
                      alt="Sample QR Code"
                      className="w-80"
                    />
                    <div className='border-2 p-10 text-left leading-10'>
                      <h1 className='text-2xl font-bold text-gray-800 mb-8'>Account Details</h1>
                      <span><span className='font-bold mr-3'>Name:</span> Aandhakumar</span><br />
                      <span><span className='font-bold mr-3'>Bank:</span> State Bank Of India</span><br />
                      <span><span className='font-bold mr-3'>Ac.no:</span> 8457962145</span><br />
                      <span><span className='font-bold mr-3'>Branch:</span> Palani</span><br />
                      <span><span className='font-bold mr-3'>IFSC Code:</span> SBIN0002240</span>
                    </div>
                  </div>


                </div>
                <div className='flex justify-center items-center'>
                  <div>
                    {currentStep !== 1 && (
                      <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-12 rounded-lg focus:outline-none focus:shadow-outline mb-4"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                    )}
                  </div>
                  <div>
                    {currentStep < steps.length && (
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:shadow-outline mb-4 ml-4"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-5 md:py-0">
              <div className="container mx-auto flex items-center justify-start">
                <div className=" w-full bg-white p-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-16 mt-8">
                    Payment Approval Form
                  </h1>
                  <form onSubmit={handleSubmited}>
                    <div className='flex flex-col sm:flex-row w-full text-start'>
                      <div className='w-full sm:w-1/2 px-2 md:px-5'>
                        <div className="mb-4">
                          <label
                            htmlFor="date"
                            className="block text-gray-700 font-semibold mb-1"
                          >
                            Payment Date
                          </label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-gray-200 rounded-lg py-3 px-4"
                            required
                          />
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
                            onChange={handleChange}
                            className="w-full bg-gray-200 rounded-lg py-3 px-4"
                          // Make it read-only
                          />
                        </div>
                      </div>

                      <div className='w-full sm:w-1/2 px-2 md:px-5'>
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

                    <div className="mb-4 w-full md:w-1/2 px-2 md:px-5 text-start">
                      <label
                        htmlFor="screenshot"
                        className="block text-gray-700 font-semibold mb-1"
                      >
                        Payment Screenshot
                      </label>
                      <input
                        type="file"
                        id="screenshot"
                        name="screenshot"
                        onChange={handleFileChange}
                        className="w-full bg-gray-200 rounded-lg py-0 px-4"
                        required
                      />
                    </div>

                    {/* Display error message if touched and there's an error */}
                    {formik.touched.agree && formik.errors.agree && (
                      <p className="text-red-500 mb-4">{formik.errors.agree}</p>
                    )}

                    <div className='flex justify-center items-center mt-20'>
                      <div>
                        {currentStep !== 1 && (
                          <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-12 rounded-lg focus:outline-none focus:shadow-outline"
                            onClick={handlePrevious}
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      {/* <div>
                        {currentStep === steps.length && (
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline ml-4"
                          >
                            Submit
                          </button>
                        )}
                      </div> */}
                      <div>
                        {currentStep < steps.length && (
                          <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:shadow-outline ml-4"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
              <h2 className='text-3xl font-bold text-green-500 mb-10'>Your details has been submited successfull</h2>

              <div>
                {currentStep !== 1 && (
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-12 rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}
              </div>
              <Link to={'/login'}>
                ok
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProgressStepper;
