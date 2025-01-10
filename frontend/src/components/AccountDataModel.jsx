import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, } from "@nextui-org/react";
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

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (successResponse) {
      const timeoutId = setTimeout(() => {
        refreshAccountInfo();
        onClose();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [successResponse, refreshAccountInfo, onClose])

  return (
    <div>
      <Modal
        isOpen={isOpen}
        placement={ successResponse ? "center" : "bottom"}
        size="2xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-gradient-to-t from-default-800/70 to-zinc-900/50 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {() => (
            successResponse ? (
              <ModalHeader>
                <Typewriter
                  inputString={"Account info added.... !"}
                  size={"3xl"}
                  color={"zinc-100"}
                />
              </ModalHeader>
            ) : (
              <div>
                <ModalHeader className="flex flex-col gap-1">
                  <Typewriter inputString={"Welcome.."} size={"2xl"} />
                  <Typewriter inputString={subHeading} size={"sm"} />
                </ModalHeader>
                <ModalBody>
                  <AccountInfoForm setSuccessResponse={setSuccessResponse}/>
                </ModalBody>
              </div>
            )

          )}
        </ModalContent>
      </Modal>
    </div>
  );
}