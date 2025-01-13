import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Form, Input, Textarea } from "@nextui-org/react"
import { useMemo, useState } from "react"

export const AddExpenseForm = () => {
    const [selectedKeys, setSelectedKeys] = useState();

    console.log(typeof (selectedValue))
    return (
        <>
            <Form
                validationBehavior="native"
            >
                <Input
                    name="amount"
                    label="Amount"
                    labelPlacement="outside"
                    placeholder="Enter your amount"
                    variant="bordered"
                    isRequired
                    type="number"
                    size="md"
                />
                <Dropdown>
                    <DropdownTrigger>
                        <Button className={`capitalize border-1 text-${selectedKeys ? "secondary-500" : "default-500"}`} variant="bordered" size="sm" radius="sm">
                            {selectedKeys || "category"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Single selection example"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="food">Food</DropdownItem>
                        <DropdownItem key="subscription">Subscription</DropdownItem>
                        <DropdownItem key="shopping">Shopping</DropdownItem>
                        <DropdownItem key="rent">Rent</DropdownItem>
                        <DropdownItem key="bill">Bill</DropdownItem>
                        <DropdownItem key="travel">Travel</DropdownItem>
                        <DropdownItem key="other" className="text-secondary" color="secondary">Other</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Textarea 
                    className="max-w-xs"
                    label="Description" 
                    placeholder="Enter your description"
                />
                {/* <Input
                    name="budget"
                    label="Budget"
                    labelPlacement="outside"
                    placeholder="Enter your budget"
                    variant="bordered"
                    isRequired
                    type="number"
                    size="md"
                /> */}
                <div className="mt-4 flex gap-2">
                    <Button color="primary" type="submit">
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