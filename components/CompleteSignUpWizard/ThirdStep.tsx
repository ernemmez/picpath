import { Button } from "@material-tailwind/react";
import Textarea from "components/Textarea";
import Cross from "public/icons/cross.svg";
import { Controller } from "react-hook-form";

function ThirdStep() {
  return (
    <div className="w-full lg:w-96">
      <div className="w-full lg:w-96 bg-pp-skypale-green rounded-2xl p-8 pt-0 flex flex-col items-center">
        <div className="bg-white rounded-xl w-20 -m-8 mb-8 relative">
          <div className="absolute bg-pp-secondary-green p-2 rounded-full border border-white -right-2 -top-4 font-bold">
            <Cross />
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/6386/6386976.png" />
        </div>
        <Controller
          name={"biography"}
          render={({ field: { onChange, value } }) => (
            <Textarea
              placeholder="Your Biography..."
              onChange={onChange}
              maxLength={100}
              value={value}
            />
          )}
        />
      </div>
      <Button
        type="submit"
        variant="filled"
        className="w-full h-10 mt-8 bg-pp-secondary-green shadow-0 hover:shadow-0 capitalize font-jost font-medium text-sm"
      >
        Submit
      </Button>
    </div>
  );
}

export default ThirdStep;
