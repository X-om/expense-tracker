import { Alert } from "@nextui-org/react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
export const AlertMessage = ({ type, message, onClose }) => (
    <div className="flex w-full justify-center">
      <div className="flex justify-center px-4">
        <Alert
          mb-4
          description={message}
          color={type === 'error' ? 'danger' : 'success'}
          isClosable={type === 'error'}
          onClose={onClose}
          icon={type === 'error' ? <FiAlertCircle /> : <FiCheckCircle />}
        />
      </div>
    </div>
  );