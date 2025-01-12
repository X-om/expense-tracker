import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Form, Input, Button } from "@nextui-org/react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AccountInfoForm = ({ setSuccessResponse,  }) => {
    const incomeRef = useRef();
    const balanceRef = useRef();
    const navigate = useNavigate();
    const [buttonLoader, setButtonLoader] = useState(false);

    const validateForm = (data) => {
        const income = parseInt(data.income);
        const balance = parseInt(data.balance);
        const budget = parseInt(data.budget);

        if (!income || income <= 0 || income > 250000) {
            return false;
        }
        if (!balance || balance < 0 || balance > income) {
            return false;
        }
        if (!budget || budget < 0 || budget > balance) {
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setButtonLoader(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (validateForm(data)) {

            const reqPayload = {
                income: +data.income,
                balance: +data.balance,
                budget: +data.budget
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                }

                await new Promise((resolve) => setTimeout(resolve, 2000));
                const response = await axios.post(`${backendUrl}/account/addaccountinfo`, reqPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setSuccessResponse(true);

                }
            } catch (error) {
                navigate("/signin");
            }
        }
    };

    return (
        <>
            <Form
                validationBehavior="native"
                onSubmit={onSubmit}
            >
                <Input
                    ref={incomeRef}
                    name="income"
                    label="Income"
                    labelPlacement="outside"
                    placeholder="Enter your income"
                    variant="bordered"
                    isRequired
                    type="number"
                    size="md"
                    validate={(value) => {
                        if (!value) return "Please enter the income !"
                        if (250000 < value) return "Income cannot exceed 2,50,000";
                        if (0 > value) return "Please enter valid amount"
                    }}
                />
                <Input
                    ref={balanceRef}
                    name="balance"
                    label="Balance"
                    labelPlacement="outside"
                    placeholder="Enter your balance"
                    variant="bordered"
                    isRequired
                    type="number"
                    size="md"
                    validate={(value) => {
                        if (!value) return "Please enter the balance !";
                        if (value < 0) return "Please enter valid amount"
                        if (value > parseInt(incomeRef.current.value))
                            return "Balance cannot exceed income !"
                    }}
                />
                <Input
                    name="budget"
                    label="Budget"
                    labelPlacement="outside"
                    placeholder="Enter your budget"
                    variant="bordered"
                    isRequired
                    type="number"
                    size="md"
                    validate={(value) => {
                        if (!value) return "Please enter the budget !";
                        if (value < 0) return "Please enter the valid amount";
                        if (value > parseInt(balanceRef.current.value))
                            return "Budget cannot exceed balance";
                    }}
                />
                <div className="mt-4 flex gap-2">
                    <Button isLoading={buttonLoader} color="primary" type="submit">
                        Add Information
                    </Button>
                    <Button color="default" type="reset" variant="ghost">
                        Reset
                    </Button>
                </div>

            </Form>
        </>
    )
}