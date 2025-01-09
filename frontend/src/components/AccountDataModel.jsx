import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
  } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import splitStringUsingRegex from "../utils/spltStringUsingRegex";

const heading = "Welcome !";
const subHeading = "Enter your account information for this month";

const charVariants = {
  hidden : { opacity : 0},
  reveal : { opacity : 1}
}

export const AccountDataModel = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const headingChars = splitStringUsingRegex(heading);
  const subHeadingChars = splitStringUsingRegex(subHeading);

  console.log(headingChars);
  console.log(subHeadingChars);

  useEffect(()=>{
    onOpen();
  },[])
  return (
    <div>
      <Modal isOpen={isOpen} placement="bottom" size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => ( 
            <>
              <ModalHeader className="flex flex-col gap-1">
                
                <motion.h1
                  initial="hidden"
                  whileInView="reveal"
                  transition={{staggerChildren :  .02 }}
                >{headingChars.map((char,index) => (
                    <motion.span
                      key={index}
                      transition={{duration : 1.5}}
                      variants={charVariants}
                    >{char}</motion.span>                  
                ))}</motion.h1>

                <motion.h3
                  initial="hidden"
                  whileInView="reveal"
                  transition={{staggerChildren : .02}}
                >{subHeadingChars.map((char,index)=> (
                  <motion.span
                    key={index}
                    transition={{duration : 1.5}}
                    variants={charVariants}
                  >{char}</motion.span>  
                ))}
                </motion.h3>

              </ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}