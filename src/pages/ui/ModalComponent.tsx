import { Modal } from "@mui/material";

const ModalComponent = ({
  children,
  show,
  onClose,
}: {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal
        open={show}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
