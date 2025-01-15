import { Pagination, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";


export const TotalSpendCard = ({ budget, isLoading, totalSpend }) => {

    const [totalSpendPercentage, setTotalSpendPercentage] = useState(0);

    useEffect(() => {
        const value = (totalSpend / budget) * 100;
        setTotalSpendPercentage(value);
    }, [totalSpend, budget])



    if (!isLoading) {
        return (
            <div className=" flex opacity-25">
                <Skeleton className="w-full h-20 rounded-lg" />
            </div>
        )
    }
    return (
        <div className="grid grid-rows-6">
            <div className="row-span-4 grid grid-cols-5">
                <div className="col-span-2 flex flex-col gap-2 px-2 py-4">
                    <div className=" text-sm flex justify-center font-thin">Total Spend</div>
                    <div className={`text-2xl text-slate-300 flex justify-center font-semibold ${totalSpendPercentage >= 90 ? 'text-danger-400' : totalSpendPercentage >= 75 ? 'text-warning' : ' '}`}>
                        ₹ {totalSpend} /-
                    </div>
                </div>
                <div className="col-span-3 border-1 flex flex-col justify-center items-center w-full">
                        <div>
                            category
                        </div>
                        <div>
                            Spend
                        </div>
                </div>
            </div>
            <div className="row-span-2 flex justify-center items-center">
                <Pagination size="sm" radius="full" isCompact variant="light" color="default" total={7} initialPage={1}/>
            </div>
        </div>
    )
}