import { Button, Modal, ModalBody, ModalContent, ModalHeader, Skeleton, useDisclosure } from "@nextui-org/react";
import { AddExpenseForm } from "./AddExpenseForm";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { initialBalanceAtom } from "../store/atoms";

export const BalanceCard = ({ balance,budget,isLoading,totalSpend }) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const initialBalance = useRecoilValue(initialBalanceAtom);
    const balancePercentage = (balance/initialBalance) * 100;

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();


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
                <div className=" text-sm font-thin">Balance</div>
                <div className={`text-3xl font-semibold ${balancePercentage <= 15 && `text-danger`}`}>
                    ₹ {balance} /-
                </div>
                <div className=" text-sm text-gray-400">for {month} {year}</div>
            </div>
            <div className="col-span-2 flex justify-center items-center">
                <Button color="default" variant="bordered" className="border-1" onPress={onOpen}>
                    Add Expense
                </Button>

                <Modal className="fixed inset-y-auto" isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                    <ModalContent className="bg-opacity-50 overflow-auto max-h-screen">
                        {
                            (onClose) => (
                                <>
                                <ModalHeader>Add Expense..!</ModalHeader>
                                <ModalBody>
                                    <AddExpenseForm balance={balance} budget={budget} totalSpend={totalSpend} onClose={onClose}/>
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