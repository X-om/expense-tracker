import { Button, Modal, ModalBody, ModalContent, ModalHeader, Skeleton, useDisclosure } from "@nextui-org/react";
import { AddExpenseForm } from "./AddExpenseForm";

export const BalanceCard = ({ balance, isLoading }) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();


    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    if (!isLoading) {
        return (
            <div className=" flex opacity-25">
                 <Skeleton className="w-full h-20 rounded-lg" />
            </div>
        )
    }
    return (
        <div className="grid grid-cols-5">
            <div className="col-span-3 flex flex-col gap-2">
                <div className=" text-sm font-thin">balance</div>
                <div className=" text-3xl font-semibold">
                    ₹ {balance} /-
                </div>
                <div className=" text-sm text-gray-400">for {month} {year}</div>
            </div>
            <div className="col-span-2 flex justify-center items-center">
                <Button color="default" variant="bordered" className="border-1" onPress={onOpen}>
                    Add Expense
                </Button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                    <ModalContent className="bg-opacity-50">
                        {
                            () => (
                                <>
                                <ModalHeader>Add Expense..!</ModalHeader>
                                <ModalBody>
                                    <AddExpenseForm/>
                                </ModalBody>
                            </>    
                            )
                        }
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}