import { Button as MuiButton } from "@material-tailwind/react";

export const Button = (props: any) => {
  return (
    <>
      <MuiButton
        ripple={props.rippleEffect}
        {...props}
      >
        {props.children}
      </MuiButton>
    </>
  );
};
