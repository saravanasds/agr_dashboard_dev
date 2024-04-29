
import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const ProgressSteper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className='w-full flex justify-center items-center min-h-screen flex-col'>
      {currentStep === 1 && <Step1 nextStep={nextStep} />}
      {currentStep === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 4 && <Step4 nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 5 && <Step5 prevStep={prevStep} />}
    </div>
  );
};

export default ProgressSteper;
