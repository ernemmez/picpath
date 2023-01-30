import { toast } from "react-toastify";

interface IToast {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const showToast = (err: IToast) => {
  switch (err.type) {
    case "success":
      return toast.success(err.message);
    case "error":
      return toast.error(err.message);
    case "info":
      return toast.info(err.message);
    case "warning":
      return toast.warning(err.message);
  }
};

export { showToast };
