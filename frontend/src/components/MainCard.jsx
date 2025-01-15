import { Card, CardBody, Chip, Skeleton } from "@nextui-org/react";
import ProgressBar from "./ProgressBar";
import { useRecoilValue } from "recoil";
import { initialBalanceAtom } from "../store/atoms";


export const MainCard = ({ income, balance, budget, totalSpend, isLoading}) => {
    const initialBalance = useRecoilValue(initialBalanceAtom);
    const balancePercentage = (balance / initialBalance) * 100;
    const totalSpendPercentage = (totalSpend/budget) * 100;

    if (!isLoading) {
        return (
            <div>
                <Card className=" bg-inherit">
                    <CardBody>
                            <div className="flex flex-col  bg-zinc-800 bg-opacity-20 w-full h-full rounded-lg p-2 gap-1">
                                <div className="bg-default-50 rounded-lg grid grid-cols-2 gap-2 w-full p-2">
                                    <Skeleton className="w-full h-8 rounded-lg" />
                                    <Skeleton className="w-full h-8 rounded-lg" />
                                    <Skeleton className="w-full h-8 rounded-lg" />
                                    <Skeleton className="w-full h-8 rounded-lg" />

                                </div>

                                <div className="bg-default-50 rounded-lg">
                                    <div className="flex justify-around gap-2 p-4">
                                        <Skeleton className="w-1/2 h-6 rounded-lg" />
                                        <Skeleton className="w-1/2 h-6 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <Card className=" bg-inherit">
                <CardBody>
                    <div className="flex flex-col bg-zinc-800 bg-opacity-20 w-full h-full rounded-lg p-2 gap-1">
                        <div className="bg-zinc-400 bg-opacity-5 rounded-lg grid grid-cols-2 gap-2 w-full p-2 overflow-scroll">
                            <Chip className="w-full bg-inherit border-1 border-secondary-400 bg-opacity-80">Income: ₹ {income}</Chip>
                            <Chip className={`w-full bg-inherit border-1 border-${balancePercentage < 15 ? "danger" : "success"} bg-${balancePercentage < 15 && "danger"} bg-opacity-30`}>Balance: ₹ {balance}</Chip>
                            <Chip className="w-full bg-inherit border-1 border-primary-400 bg-opacity-80">Budget: ₹ {budget}</Chip>
                            <Chip className={`w-full bg-inherit border-1 border-${totalSpendPercentage >= 90 ? "danger" : "warning"} bg-${totalSpendPercentage >= 90 && "danger"} bg-opacity-30`}>Spends: ₹ {totalSpend}</Chip>
                        </div>

                        <div className="bg-zinc-400 bg-opacity-5 rounded-lg">
                            <div className="flex justify-around py-1">
                                <div className="border-r-1 border-zinc-500 w-full flex justify-center">
                                    <ProgressBar color={`${balancePercentage < 15 ? "danger" : "success"}`} label={"Balance"} progress={balancePercentage} progressColor={`${balancePercentage < 15 ? "danger" : "success"}`} size={"lg"} />
                                </div>
                                <div className="w-full flex justify-center">
                                    <ProgressBar color={`${totalSpendPercentage >= 90 ? "danger" : "warning"}`} label={"Total spend"} progress={totalSpendPercentage} progressColor={`${totalSpendPercentage >= 90 ? "danger" : "warning"}`} size={"lg"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
