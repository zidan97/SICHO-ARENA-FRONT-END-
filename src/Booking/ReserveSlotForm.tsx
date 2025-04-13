import React, { useState } from "react";
import SportsAndPerson from "./SportsAndPerson";
import DateTime from "./DateTime";
import PersonalInformation from "./PersonalInformation";
import TimeLine from "./TimeLine";
import OrderSummary from "./BookingSummery";

const ReserveSlotForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const getStepClass = (currentStep: number) =>
    step === currentStep
      ? " text-white text-2xl p-2 font-bold"
      : "text-gray-400";
  return (
    <div className="flex items-start justify-center ">
      <div className="border-blue-300 px-4 py-6 rounded-s-3xl border-l-2 border-t-2 border-b-2 font-semibold text-xl grid grid-cols-1 divide-y divide-blue-600 space-y-4 mt-20 min-h-64 bg-[#17295A]">
        <h1 className={getStepClass(1)}>1. Sports and Person</h1>
        <h1 className={getStepClass(2)}>2. Date And Time</h1>
        <h1 className={getStepClass(3)}>3. Personal Information</h1>
        <h1 className={getStepClass(4)}>4. Payment</h1>
      </div>
      <div className="mt-6 w-1/2  mr-14">
        <h1 className="text-center mb-4 text-3xl font-semibold">
          Book Your Slot
        </h1>

        {step === 1 && <SportsAndPerson></SportsAndPerson>}
        {step === 2 && <DateTime></DateTime>}
        {step === 3 && <PersonalInformation></PersonalInformation>}
        {step === 4 && <OrderSummary></OrderSummary>}
        {
          <div className="space-x-6 mt-4 flex items-center justify-center">
            {step > 1 && (
              <button
                className="px-4 py-2 border rounded-md bg-black text-white"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                className="px-4 py-2 border rounded-md bg-black text-white"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default ReserveSlotForm;
