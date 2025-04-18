import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./ui/toast";

function ToastMessage({
  toastOpen,
  setToastOpen,
  message = "Acción realizada con éxito",
  isError = false,
}: {
  toastOpen: boolean;
  setToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  isError?: boolean;
}) {
  return (
    <ToastProvider>
      <Toast open={toastOpen} onOpenChange={setToastOpen}>
        <div className="grid gap-1">
          <ToastTitle>{isError ? "Error" : "Éxito"}</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export default ToastMessage;
