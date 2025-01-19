import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Form, Input, Textarea, DatePicker } from "@nextui-org/react";
import { useCallback, useRef, useState } from "react";
import { getLocalTimeZone, today, startOfMonth } from "@internationalized/date";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { accountAtom, sumOfCategoriesAtom } from "../store/atoms";
import { Typewriter } from "./Typewriter";
import debounce from "lodash.debounce";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AddExpenseForm = ({ balance, budget, onClose,totalSpend }) => {
    const [selectedKey, setSelectedKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const amountRef = useRef();
    const [message, setMessage] = useState();
    const [messageColor, setColor] = useState();
    const [statusCode,setStatusCode] = useState();
    const [warnings, setWarning] = useState({
        warningMessage: "",
        warningColor: ""
    })
    const refreshAccountInfo = useRecoilRefresher_UNSTABLE(accountAtom);
    const refreshSumOfCategories = useRecoilRefresher_UNSTABLE(sumOfCategoriesAtom);


    const currentDate = today(getLocalTimeZone());
    const firstDay = startOfMonth(currentDate);
    

    const validateAmount = useCallback(
        debounce((value) => {
            if ((parseInt(value) + parseInt(totalSpend)) > budget) {
                setWarning({
                    warningMessage: "This Expense will exceed your budget!",
                    warningColor: "warning"
                })
            }
            else{
                setWarning({
                    warningMessage : "",
                    warningColor : ""
                })
            }
        }, 300)
        , [budget])

    const handleAmountChange = (value) => {
        if (!value) return "Please enter the amount !";
        if (0 > value) return "Please enter the valid amount !";
        if (balance + 1 < value) return "Your Expense is greater than balance !"
        validateAmount(value);
        return null;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        data.amount = +data.amount;

        setIsLoading(true);
        console.log(data);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/signin");
            }

            const response = await axios.post(`${backendUrl}/account/addexpense`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)
            if (response.status === 200) {
                setMessage(response.data.message);
                setColor("text-green-400");
                setStatusCode(200);
                setTimeout(() => {
                    refreshAccountInfo();
                    refreshSumOfCategories();
                    onClose()
                }, 2000);
            }

        } catch (error) {
            if(error.response?.status == 404){
                setMessage(error.response?.data?.message || "Not Found")
                setColor("text-rose-800")
                setStatusCode(404);
                useNavigate("/signin")
            }else{
                setMessage(error.response?.data[0]?.message || "Internal Server error");
                setColor("text-rose-800");
                setStatusCode(500);
                setIsLoading(false);
            }
            console.log(error)
        }
    }


    return (
        <div className="flex  flex-col gap-4">
            {
                message && (
                    <div className={`${messageColor} font-light`}>
                    {
                        statusCode === 200 ? (
                            <Typewriter inputString={message} />
                        ) : (
                            <>
                            {message}
                            </>
                        )
                    }
                        
                    </div>
                )
            }
            <Form
                validationBehavior="native"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
            >
                <div className="w-full flex flex-col gap-2">
                    <Input
                        ref={amountRef}
                        className={`w-1/2 ${ warnings.warningMessage &&  `border-1 rounded-xl border-${warnings.warningColor}`}`}
                        name="amount"
                        label="Amount"
                        labelPlacement="outside"
                        variant="bordered"
                        isRequired
                        type="number"
                        size="md"
                        validate={handleAmountChange}
                        color={`${warnings.warningColor}`}
                    />
                    {warnings.warningMessage && (
                        <div className={`text-${warnings.warningColor} text-xs w-full`}>
                            {warnings.warningMessage}
                        </div>
                    )}
                </div>

                <Dropdown backdrop="opaque">
                    <DropdownTrigger>
                        <Button
                            className={`capitalize border-1 text-${selectedKey ? "secondary-500" : "default-500"}`}
                            variant="bordered"
                            size="sm"
                            radius="sm"
                        >
                            {selectedKey || "category"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Single selection example"
                        selectedKeys={new Set([selectedKey])}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={(keys) => setSelectedKey([...keys][0])}

                    >
                        <DropdownItem key="food">Food</DropdownItem>
                        <DropdownItem key="subscription">Subscription</DropdownItem>
                        <DropdownItem key="shopping">Shopping</DropdownItem>
                        <DropdownItem key="rent">Rent</DropdownItem>
                        <DropdownItem key="bill">Bill</DropdownItem>
                        <DropdownItem key="travel">Travel</DropdownItem>
                        <DropdownItem key="other" className="text-secondary" color="secondary">
                            Other
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <input type="hidden" name="category" value={selectedKey || ''} />
                <Textarea
                    className="max-w-xs"
                    label="Description"
                    placeholder="Enter your description"
                    variant="underlined"
                    name="description"
                />
                <div className="w-full grid grid-cols-5">
                    <div className="col-span-2">
                        <DatePicker
                            defaultValue={today(getLocalTimeZone())}
                            label="Date"
                            minValue={firstDay}
                            maxValue={today(getLocalTimeZone())}
                            variant="underlined"
                            name="spendDate"
                        />
                    </div>
                </div>


                <div className="mt-4 flex gap-2">
                    <Button isLoading={isLoading} color="primary" type="submit">
                        Add Expense
                    </Button>
                    <Button color="default" type="reset" variant="ghost">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};
