import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button, } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AccountInfoForm } from "./AccountInfoForm";
import { Typewriter } from "./Typewriter";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { accountAtom } from "../store/atoms";

const subHeading = "Enter your account information for this month... !";


export const AccountDataModel = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [successResponse, setSuccessResponse] = useState(false);
  const refreshAccountInfo = useRecoilRefresher_UNSTABLE(accountAtom);
  const { month, year } = getMonthNameAndYear();

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (successResponse) {
        refreshAccountInfo();
        onClose();
      }
  }, [successResponse, refreshAccountInfo, onClose])

  return (
    <>
          <div className=" flex w-full h-96 justify-center">
            <div className=" flex flex-col justify-center gap-2">
              <div className="flex justify-center">
                <Typewriter
                  inputString={`${month} ${year}`}
                  size={"sm"}
                />
              </div>
              <Button variant="flat" color="primary" onPress={onOpen}>
                <Typewriter
                  inputString={"Add your account information"}
                  size={"sm"}
                />
              </Button>
            </div>
          </div>

      <Modal
        isOpen={isOpen}
        placement={successResponse ? "center" : "bottom"}
        size="2xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        classNames={{
          backdrop: "",
        }}
      >
        <ModalContent>  
              <div>
                <ModalHeader className="flex flex-col gap-1">
                  <Typewriter inputString={"Welcome.."} size={"2xl"} />
                  <Typewriter inputString={subHeading} size={"sm"} />
                </ModalHeader>
                <ModalBody>
                  <AccountInfoForm setSuccessResponse={setSuccessResponse} />
                </ModalBody>
              </div>
        </ModalContent>
      </Modal>
    </>
  );
}
const getMonthNameAndYear = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // Returns 0-11
  const year = currentDate.getFullYear();
  return {
    month: monthNames[currentMonthIndex],
    year
  }
};