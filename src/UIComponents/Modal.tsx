import React from "react";
import { Modal } from "antd";

interface ShowPopUpProps {
  success?: boolean;
  error?: string;
  visible: boolean; // Pass visible state from parent
  onClose: () => void; // Function to close the modal
  flag: string | undefined;
}

const ShowPopUp: React.FC<ShowPopUpProps> = ({
  success,
  error,
  visible,
  onClose,
  flag,
}) => {
  return (
    <Modal
      title={success ? "Success" : "Error"}
      open={visible} // Control visibility through the visible prop
      onOk={onClose} // Trigger onClose when user clicks "Ok"
      onCancel={onClose} // Trigger onClose when user clicks "Cancel"
    >
      {success && flag === "register" && (
        <p className="text-green-500">User registered successfully</p>
      )}
      {error && flag === "register" && (
        <p className="text-red-500">Error registering user. Error: {error}</p>
      )}
      {success && flag === "login" && (
        <p className="text-green-500">User logged in successfully</p>
      )}
      {error && flag === "login" && (
        <p className="text-red-500">Error logging in user. Error: {error}</p>
      )}
      {success && flag === "sportsCreated" && (
        <p className="text-green-500">Sports Service Created Successfully</p>
      )}
      {error && flag === "sportsCreated" && (
        <p className="text-red-500">Sports Service Creation Failed</p>
      )}
    </Modal>
  );
};

export default ShowPopUp;
