import { Button, form, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertMessage } from "./AlertMessage";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { profileImageInfoAtom } from "../store/atoms";

const ClientID = import.meta.env.VITE_IMGUR_CLIENT_ID
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const ImageInput = ({ setOpenImageInput }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [image, setImage] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const refreshProfileImageAtom  = useRecoilRefresher_UNSTABLE(profileImageInfoAtom);
    const [successResponse, setSuccessResponse] = useState({
        status : false,
        message : ""
    });
    const [errorResponse, setErrorResponse] = useState({
        status : false,
        message : ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    const handleModalClose = () => {
        onClose();
        setOpenImageInput(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            setImage(file);
        } 
        
    }

    const handleUpload = async () => {
        if(!image){
            alert("Please select an image.. !");
            return;
        }

        const formData = new FormData();
        formData.append("image",image);

       try{
            setIsLoading(true);
            const response = await axios.post("https://api.imgur.com/3/image",formData,{
                headers : {
                    Authorization : `Client-ID ${ClientID}`
                }
            });

            const {link} = response.data.data;
            const data = {
                url : link
            }

            try{
                const token = localStorage.getItem("token");
                if(!token){
                    setErrorResponse({
                        status : true,
                        message : "unAuthorized user !"
                    });
                    navigate("/signin");
                }
                const res = await axios.put(`${backendUrl}/user/addprofileimage`,data,
                    {
                        headers : {
                            Authorization : `Bearer ${token}`
                        }
                    }
                );
                console.log(res.data);
                if(res.status === 200){
                    refreshProfileImageAtom();
                    setErrorResponse({
                        status : false,
                        message : ""

                    });
                }
            } catch(error){
                console.log(`error during storing the url in database !`);
                setErrorResponse({
                    status : true,
                    message : "Image upload failed to backend !"
                });
                return;
            }
           
            setSuccessResponse({
                status : true,
                message : "Profile picture updated.. !"
            });
            onClose();
        } catch(error){
            console.error("Error uploading image:", error);
            setErrorResponse({
                status : true,
                message : "Internal server error"
            });
        }

    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) handleModalClose();
            }}
            backdrop="blur"
            size="md"
            placement="center"
            className="bg-opacity-50"
            
        >
            <ModalContent>
                <ModalBody>
                    <ModalHeader>Uplaod profile image... !</ModalHeader>
                    {successResponse.status && (
                        <AlertMessage
                            message={successResponse.message}
                        />
                    )}
                    {errorResponse.status && (
                        <AlertMessage
                            type={"error"}
                            message={errorResponse.message}
                        />
                    )}
                    <div className="flex flex-col gap-4">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />                

                        <div className="flex gap-4 justify-start">
                            <Button
                                variant="flat"
                                color="success"
                                onPress={handleUpload}
                                isLoading={isLoading}
                            >
                                Upload
                            </Button>
                            <Button
                                onPress={handleModalClose}
                                variant="flat"
                                color="danger"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
