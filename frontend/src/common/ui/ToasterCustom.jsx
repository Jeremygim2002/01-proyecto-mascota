import { Toaster } from "sonner";

const ToasterCustom = () => {
  return (
    <Toaster position="bottom-right" theme="dark" toastOptions={{ duration: 4000 }} />
  );
};

export default ToasterCustom;
