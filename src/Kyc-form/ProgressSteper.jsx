import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Register from '../components/register'

const ProgressSteper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
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
      {currentStep === 4 && <Step4 nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />}
      {currentStep === 5 && <Step5 prevStep={prevStep} />}
      {/* Add Register component as a step */}
      {currentStep === 6 && <Register formData={{...formData}} />}
    </div>
  );
};

export default ProgressSteper;
