import { Button, Form, Input } from "@nextui-org/react"
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../components/AlertMessage";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const Signin = () => {

    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("")
    const [serverErrors,setServerErrors] = useState(null);
    const [serverResonse,setServerResponse] = useState(null)
    const navigate = useNavigate();



    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const newErrors = {}
        if(data.password.length === 0){
            return setErrors({})
        }
        if(data.password.length < 3){
            newErrors.password = "Password cannot be this short"
        }
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return
        }
        setErrors({});

        try{    
            const response = await axios.post(`${backendUrl}/user/signin`,data)
            const token = response.data.token;
            if(response.status === 200 && token){
                localStorage.setItem("token", token);
                setServerResponse(response.data.message)
                setServerErrors(null);
                await new Promise(r => setTimeout(r,3000));
                navigate("/dashboard");
            }
        }catch(error){
            console.error("Error submitting the form:", error.response?.data || error.message);
            if(error.response.status !== 200){
                setServerErrors(error.response?.data?.message || "An unexpected error occured")
            }
        }
    }
    return (
        <div className="flex flex-col w-screen h-screen justify-center gap-4">
            <div>
                {
                    serverErrors && (
                        <AlertMessage
                            type={"error"}
                            message={serverErrors}
                            onClose={()=>{
                                setServerErrors(null);
                                setServerResponse(null);
                            }}
                        />
                    )
                }
                {
                    (serverResonse && !serverErrors) && (
                        <AlertMessage
                            type={"login"}
                            message={serverResonse}
                        />
                    )
                }
            </div>
            <div className=" flex justify-center w-full">
                <div className=" flex flex-col justify-center items-center w-full px-16 md:px-0 md:w-fit">
                    <Form
                        className="justify-center items-center w-full
                        border-1 border-zink-700 rounded-2xl flex flex-col p-4 md:p-10 md:w-80 gap-4"
                        validationBehavior="native"
                        validationErrors={errors}
                        onSubmit={onSubmit}
                    >

                        <Heading label={"Sign in"}/>

                        <Input
                            isRequired
                            label="Email"
                            labelPlacement="outside"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
                            size="sm"
                            errorMessage={({ validationDetails }) => {
                                if (validationDetails.valueMissing) return "Please enter your email"
                                if (validationDetails.typeMismatch) return "Please enter valid email"
                            }}
                        />

                        <Input
                            isRequired
                            errorMessage={errors.password || "Please enter your password"}
                            label="Password"
                            labelPlacement="outside"
                            placeholder="Enter your password"
                            size="sm"
                            type="password"
                            value={password}
                            name="password"
                            onValueChange={setPassword}
                        />

                        <div className="flex w-full justify-center py-2">
                            <Button color="primary" size="sm" type="submit">Login</Button>
                        </div>
                        
                        <BottomWarning label={"Don't have an account ? "} bottomtext={"sign up"} to={"/signup"}/>
                    </Form>
                </div>
            </div>
        </div>
    )
}