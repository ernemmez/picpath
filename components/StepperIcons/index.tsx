import Lock from "public/icons/lock.svg";
function index(props: {
  steps: Array<{ icon: any; title: string }>;
  activeIndex: number;
  isMobile?: boolean;
}) {
  return (
    <div className={`${props.isMobile ? "flex" : ""}`}>
      {props.steps.map((step: { icon: any }, index: number) => {
        if (index == 0)
          return (
            <div
              key={index}
              className="w-16 h-16 rounded-full bg-pp-secondary-green flex justify-center items-center"
            >
              {step.icon}
            </div>
          );
        else if (index !== props.steps.length)
          return (
            <>
              <div key={index} className="flex lg:flex-col items-center">
                <div
                  className={`border w-5 h-0 lg:w-0 lg:h-5 ${
                    props.activeIndex < index
                      ? "border-pp-pale-gray"
                      : "border-pp-secondary-green"
                  } `}
                />
                <div
                  className={`border-2 rounded-full ${
                    props.activeIndex < index
                      ? "border-pp-pale-gray"
                      : "border-pp-secondary-green"
                  } `}
                />
                <div
                  className={`border w-5 h-0 lg:w-0 lg:h-5 ${
                    props.activeIndex < index
                      ? "border-pp-pale-gray"
                      : "border-pp-secondary-green"
                  } `}
                />
              </div>
              <div
                className={`w-16 h-16 rounded-full flex justify-center items-center ${
                  props.activeIndex < index
                    ? "bg-pp-pale-gray"
                    : "bg-pp-secondary-green"
                }`}
              >
                {props.activeIndex < index ? <Lock /> : step.icon}
              </div>
            </>
          );
      })}
    </div>
  );
}

export default index;
