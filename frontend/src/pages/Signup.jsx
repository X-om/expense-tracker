import { Form, Button, Input } from "@nextui-org/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

import { AlertMessage } from "../components/AlertMessage";
import { Heading } from "../components/Heading";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const Signup = () => {
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState(null);
    const [serverResonse, setServerResponse] = useState(null);
    const nameRef = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus()
        }
    }, [])

    const getPasswordError = (value) => {
        if (!value || value.length === 0) {
            return "Please enter a password";
        }

        if ((value.match(/[A-Z]/g) || []).length < 1) {
            return "Password needs at least 1 uppercase letter";
        }
        if ((value.match(/[a-z]/g) || []).length < 1) {
            return "Password needs at least 1 lowercase letter";
        }
        if ((value.match(/[^a-z]/gi) || []).length < 1) {
            return "Password needs at least 1 symbol";
        }
        if (value.length < 8) {
            return "Password must be 8 characters long";
        }

        return null;
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log("Form data submitted:", data);

        const newErrors = {};
        if (!data.password) {
            newErrors.password = "Please enter password";
        } else {
            const passwordErrors = getPasswordError(data.password);
            if (passwordErrors) {
                newErrors.password = passwordErrors;
            }
        }

        if (data.name === "admin") {
            newErrors.name = "Nice try! Choose a different name.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitted(data);

        try {
            const response = await axios.post(`${backendUrl}/user/signup`, data);
            console.log("Response:", response.data);
            if (response.status === 200) {
                setServerResponse(response.data.message)
                setServerErrors(null)
                await new Promise(r => setTimeout(r, 2000))
                navigate("/signin")
            }

        } catch (error) {
            console.error("Error submitting the form:", error.response?.data || error.message);
            if (error.response.status !== 200) {
                setServerErrors(error.response?.data?.message || "An unexpected error occured")
            }
        }
    };




    return (
        <div className="flex flex-col h-screen w-screen justify-center gap-4 bg-gradient-to-br from-dash-form   to-dash-to ">
            <div>
                {serverErrors && (
                    <AlertMessage type="error" message={serverErrors} onClose={() => {
                        setServerErrors(null);
                        setServerResponse(null);
                    }} />
                )}
                {(serverResonse && !serverErrors) && (
                    <AlertMessage type="success" message={serverResonse} />
                )}
            </div>
            <div className=" flex justify-center w-full">
                <div className=" flex flex-col justify-center w-full px-16 md:px-0 md:w-fit">

                    <Form
                        className="justify-center items-center w-full border-1 border-zinc-700 rounded-2xl flex flex-col p-4 md:p-10 md:w-80"
                        validationBehavior="native"
                        validationErrors={errors}
                        onReset={() => {
                            setSubmitted(null);
                            setPassword("");
                            }}
                        onSubmit={onSubmit}
                    >

                        <Heading label={"Sign up"} />

                        <Input
                            ref={nameRef}
                            isRequired
                            label="Name"
                            labelPlacement="outside"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            errorMessage={({ validationDetails }) => {
                                validationDetails.valueMissing ? "Please enter your name" : errors.name
                            }}
                            size="sm"
                        />


                        <Input
                            isRequired
                            label="Email"
                            labelPlacement="outside"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            errorMessage={({ validationDetails }) => {
                                if (validationDetails.valueMissing) return "Please enter your email";
                                if (validationDetails.typeMismatch) return "Please enter a valid email address";
                            }}
                            size="sm"
                        />

                        <Input
                            isRequired
                            errorMessage={getPasswordError(password)}
                            isInvalid={getPasswordError(password) !== null}
                            label="Password"
                            labelPlacement="outside"
                            placeholder="Enter your password"
                            size="sm"
                            type="password"
                            value={password}
                            name="password"
                            onValueChange={setPassword}
                        />

                        <div className="flex gap-4 justify-center my-2">
                            <Button color="primary" size="sm" type="submit">
                                Submit
                            </Button>
                            <Button
                                variant="bordered"
                                size="sm"
                                type="reset"
                            >
                                Reset
                            </Button>
                        </div>
                        <BottomWarning label={"Already have an account"} bottomtext={"sign in"} to={"/signin"} />
                    </Form>
                </div>
            </div>

        </div>
    )
}