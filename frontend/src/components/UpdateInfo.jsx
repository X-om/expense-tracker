import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import axios from "axios";
import { startTransition, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms";
import { Typewriter } from "./Typewriter";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const UpdateInfo = ({ setOpenUpdateInfo }) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [openPasswordFields, setOpenPasswordFields] = useState(false);
    const [errors, setErrors] = useState({})
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const navigate = useNavigate();
    const refresh =  useRecoilRefresher_UNSTABLE(userAtom);
    const [response,setResponse] = useState({
        status : null,
        message : ""
    })

    useEffect(() => {
        onOpen();
    }, [onOpen])

    const handleClose = () => {
        onClose();
        setOpenUpdateInfo(false);
    }

    const onSubmit = async (e) => {
        
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        if(data.name.length == 0 && data.currentPassword == 0 && data.newPassword == 0){
            onClose();
            setOpenUpdateInfo(false);
            return;
        }
        console.log(data);
        
        let reqPayload = {};

        if(data.name.length > 0){
            reqPayload.name = data.name;
        }

        if(data.currentPassword.length > 0 && data.newPassword.length > 0){
            reqPayload.password = {
                current_password : data.currentPassword,
                new_password : data.newPassword
            }
        }

        try{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/signin");
            }
            const response = await axios.put(`${backendUrl}/user/updateinfo`,reqPayload,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            console.log(response.data)
            if(response.status === 200){
                setResponse({
                    status: "success",
                    message: response.data.message,
                });
                refresh();
                setTimeout(()=>{
                    onClose();
                    setOpenUpdateInfo(false);
                },2000);
            }
            
        } catch(error){
            console.log(`error while updating information ${error}`);
            setResponse({
                status : "danger",
                message : error?.response?.data?.message
            })
            console.log(error)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
            backdrop="blur"
            size="lg"
            placement="center"
            className="bg-opacity-40"
        >
            <ModalContent>
                <ModalBody>
                    <ModalHeader className="text-default-600 font-semibold">Update user information.. !</ModalHeader>
                    {response.status && (
                        <Typewriter inputString={response.message} size={"md"} color={response.status}/>
                    )}
                    <Form
                        validationBehavior="native"
                        validationErrors={errors}
                        onSubmit={onSubmit}
                    >
                        <div className="flex flex-col gap-8 w-full">
                            <div className="flex flex-col gap-4">
                                <Input
                                    variant="underlined"
                                    placeholder="Enter new name !"
                                    label="Update name"
                                    labelPlacement="outside"
                                    type="text"
                                    name="name"
                                />
                                <div>
                                    <Button size="sm" variant="light" color={`${openPasswordFields ? "danger" : "default"}`} onPress={() => {
                                        let val = !openPasswordFields;
                                        setOpenPasswordFields(val)
                                    }}>
                                        {openPasswordFields ? (<>close update password</>) : (<>update password</>)}
                                    </Button>
                                </div>

                            </div>

                            <div className={`flex flex-col gap-4 w-full ${openPasswordFields ? 'visible' : 'hidden'}`}>
                                <Input
                                    ref={currentPasswordRef}
                                    variant="underlined"
                                    placeholder="Enter your current password !"
                                    label="Current password"
                                    type="password"
                                    name="currentPassword"
                                    validate={(value) => {
                                        if (!value && openPasswordFields) return "please enter the current password"
                                    }}
                                />
                                <Input
                                    ref={newPasswordRef}
                                    variant="underlined"
                                    placeholder="Enter your new password !"
                                    label="New password"
                                    type="password"
                                    name="newPassword"
                                    validate={(value) => {
                                        if (!value && openPasswordFields) return "please enter the new password"
                                        if ((value.match(/[A-Z]/g) || []).length < 1 && openPasswordFields) {
                                            return "Password needs at least 1 uppercase letter";
                                        }
                                        if ((value.match(/[a-z]/g) || []).length < 1 && openPasswordFields) {
                                            return "Password needs at least 1 lowercase letter";
                                        }
                                        if ((value.match(/[^a-z]/gi) || []).length < 1 && openPasswordFields) {
                                            return "Password needs at least 1 symbol";
                                        }
                                        if (value.length < 8 && openPasswordFields) {
                                            return "Password must be 8 characters long";
                                        }
                                    }}
                                />
                            </div>


                            <div>
                                <Button size="sm" type="submit" variant="ghost" color="success">Update</Button>
                            </div>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}