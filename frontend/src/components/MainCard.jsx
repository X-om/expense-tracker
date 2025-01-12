import { Card, CardBody, Chip, Skeleton } from "@nextui-org/react";
import ProgressBar from "./ProgressBar";


export const MainCard = ({ income, balance, budget, totalSpend, isLoading}) => {
    


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
                        <div className="bg-zinc-400 bg-opacity-5 rounded-lg grid grid-cols-2 gap-2 w-full p-2">
                            <Chip className="w-full bg-inherit border-1 border-secondary-400 bg-opacity-80">income : ₹ {income}</Chip>
                            <Chip className="w-full bg-inherit border-1 border-success-400 bg-opacity-80">balance : ₹ {balance}</Chip>
                            <Chip className="w-full bg-inherit border-1 border-primary-400 bg-opacity-80">budget : ₹ {budget}</Chip>
                            <Chip className="w-full bg-inherit border-1 border-warning-400 bg-opacity-80">total spend : ₹ {totalSpend}</Chip>
                        </div>

                        <div className="bg-zinc-400 bg-opacity-5 rounded-lg">
                            <div className="flex justify-around py-1">
                                <div className="border-r-1 border-zinc-500 w-full flex justify-center">
                                    <ProgressBar color={"success"} label={"balance"} progress={70} progressColor={"success"} size={"lg"} />
                                </div>
                                <div className="w-full flex justify-center">
                                    <ProgressBar color={"warning"} label={"total spend"} progress={80} progressColor={"warning"} size={"lg"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

const LoadingCard = () => {

}