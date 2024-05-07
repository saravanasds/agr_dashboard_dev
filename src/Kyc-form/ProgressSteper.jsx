import React, { useState } from 'react';
import axios from 'axios';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './step6'


const ProgressSteper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    guardian: "",
    dob: "",
    gender: "",
    address: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    adharno: "",
    adharProof: null,
    photo: null,
    nomineeName: "",
    nomineeRelationshipship: "",
    bankAcno: "",
    bankName: "",
    branch: "",
    ifsc: "",
    upiId: "",
    paymentDate: "",
    transactionId: "",
    referralId: "",
    amount: "5000",
    paymentScreenshot: ""
  });

  async function sendData() {
    setLoading(true);
    try {
      // Flatten the nested formData object
      // const flattenedFormData = Object.keys(formData).reduce((acc, key) => {
      //   return { ...acc, ...formData[key] };
      // }, {});
      console.log(formData)
      const response = await axios.post(
        `https://localhost:9000/api/auth/register`,
        // 
        formData
      );
      const data = response.data;
      setLoading(false);
      console.log(response.data); // Log response data
      // Handle successful response
    } catch (err) {
      // Handle errors
      setLoading(false);
      const errorMessage = err.response?.data?.error || "Internal Server Error";
      console.error(errorMessage); // Log error message
      // You can handle the error response here if needed
    }
  }
  


  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormData = (data) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      ...data
    }));
  };

  return (
    <div className='w-full flex justify-center items-center min-h-screen flex-col'>
      {currentStep === 1 && <Step1 nextStep={nextStep} formData={formData} updateFormData={updateFormData} />}
      {currentStep === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />}
      {currentStep === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />}
      {currentStep === 4 && <Step4 nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData}/>}
      {currentStep === 5 && <Step5 nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} sendData={sendData} />}
      {currentStep === 6 && <Step6 prevStep={prevStep} />}
    </div>
  );
};

export default ProgressSteper;