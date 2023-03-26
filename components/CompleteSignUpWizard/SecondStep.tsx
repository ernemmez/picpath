import { Button } from "@material-tailwind/react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
const SecondStep = (props: {
  phoneNumber: string;
  onChange: (val: string) => void;
  nextStep: () => void;
}) => {
  return (
    <div className="w-full lg:w-96">
      <p className="">Quisque tristique non sapien et sagittis.</p>
      <div className="mt-14 w-full">
        <Controller
          name="phoneNumber"
          render={({ field: { onChange } }) => (
            <PhoneInput
              country={"tr"}
              onChange={onChange}
              specialLabel="Phone Number"
              inputClass="rounded-xl w-full py-5"
            />
          )}
        />
      </div>
      <Button
        type="submit"
        variant="filled"
        className="w-full h-10 mt-8 bg-pp-secondary-green shadow-0 hover:shadow-0 capitalize font-jost font-medium text-sm"
        onClick={props.nextStep}
      >
        Send Me Verification Code
      </Button>
    </div>
  );
};

export default SecondStep;
