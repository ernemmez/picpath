import { Button } from "@material-tailwind/react";
import StepperIcons from "components/StepperIcons";
import { useUserDevice } from "context/UserDeviceContext";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Edit from "public/icons/edit.svg";
import Phone from "public/icons/phone.svg";
import Verification from "public/icons/verification.svg";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

function CompleteSignUpWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isMobile } = useUserDevice();

  const steps: Array<{ icon: any; title: string }> = [
    { icon: <Verification />, title: "Mail Verification" },
    { icon: <Phone />, title: "Enter your phone number" },
    { icon: <Edit />, title: "Finish your account" },
  ];
  const FirstStep = () => {
    return (
      <div className="w-full lg:w-96">
        {!isMobile && (
          <p className="">
            You will use this address when logging in and if you need to reset
            your password.
          </p>
        )}
        <Button
          type="submit"
          variant="filled"
          className="w-full h-10 mt-8 bg-pp-secondary-green shadow-0 hover:shadow-0 capitalize font-jost font-medium text-sm"
          onClick={() => setActiveStep((prevState) => prevState + 1)}
        >
          Send Me Verification
        </Button>
        {isMobile && (
          <p className="mt-2 text-xs text-center px-14">
            You will use this address when logging in and if you need to reset
            your password.
          </p>
        )}
      </div>
    );
  };
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="lg:px-0 px-6 h-[500px]">
      <div className="flex w-full">
        <h2 className="lg:ml-56 mb-20 lg:text-4xl text-2xl font-medium w-full text-center lg:text-start">
          {steps[activeStep].title}
        </h2>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            className="flex gap-40"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {!isMobile && (
              <StepperIcons steps={steps} activeIndex={activeStep} />
            )}
            {activeStep == 0 && <FirstStep />}
            {activeStep == 1 && (
              <SecondStep
                phoneNumber={phoneNumber}
                onChange={(val: string) => setPhoneNumber(val)}
                nextStep={() => setActiveStep((prevState) => prevState + 1)}
              />
            )}
            {activeStep == 2 && <ThirdStep />}
          </form>
        </FormProvider>
      </div>
      <div className="flex justify-center absolute bottom-24 left-0 right-0">
        {isMobile && (
          <StepperIcons
            steps={steps}
            activeIndex={activeStep}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
}

export default CompleteSignUpWizard;
