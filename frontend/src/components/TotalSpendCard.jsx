import { Pagination, Skeleton, Spinner, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { sumOfCategoriesAtom } from "../store/atoms";
import { AlertMessage } from "./AlertMessage";



export const TotalSpendCard = ({ budget, isLoading, totalSpend }) => {

    const [totalSpendPercentage, setTotalSpendPercentage] = useState(0);
    const sumOfCategories = useRecoilValueLoadable(sumOfCategoriesAtom);
    const [pageNo, setPageNo] = useState(1);
    const [totalSpendColor, setTotalSpendColor] = useState("text-default");

    useEffect(() => {
        const value = (totalSpend / budget) * 100;
        setTotalSpendPercentage(value);
        if (value >= 95) {
            setTotalSpendColor("text-danger");
        } else if (value >= 75) {
            setTotalSpendColor("text-warning");
        } else {
            setTotalSpendColor("text-default");
        }

    }, [totalSpend, budget]);

    const categories = ['food', 'subscription', 'shopping', 'rent', 'bill', 'travel', 'other'];
    const category = categories[pageNo - 1];
    const sumValue = sumOfCategories.contents[categories[pageNo - 1]] || 0;

    if (!isLoading) {
        return (
            <div className=" flex opacity-25">
                <Skeleton className="w-full h-20 rounded-lg" />
            </div>
        )
    }
    return (
        <div className="grid grid-rows-5">
            <div className="row-span-3 grid grid-cols-5">
                <div className="col-span-2 flex flex-col gap-2 px-2 py-4 border-r-1 border-zinc-600">
                    <div className=" text-sm flex justify-center font-thin">Total Spend</div>
                    <div className={`text-2xl flex justify-center font-semibold ${totalSpendColor}`}>
                        ₹ {totalSpend} /-
                    </div>
                </div>
                <div className="col-span-3 flex flex-col pl-2 justify-center items-center w-full">
                    <div className="w-full">
                        {
                            sumOfCategories.state === "loading" ? (
                                <Spinner />
                            ) : sumOfCategories.state === "hasError" ? (
                                <AlertMessage type={"error"} message={sumOfCategories.contents?.response?.data?.message || "Internal server error"} />
                            ) : (
                                    <div className="w-full flex flex-col gap-2 bg-zinc-400 bg-opacity-5 rounded-lg py-2 border-zinc-700">
                                        <div className="flex w-full justify-center items-center text-2xl font-semibold text-zinc-300">{category}</div>
                                        <div className="flex w-full justify-center items-center text-xl font-thin"> ₹ {sumValue} /-</div>
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="row-span-2 flex flex-col gap-1 justify-center items-center overflow-x-scroll">
                <Pagination size="sm" radius="full" isCompact variant="light" color="default" total={7} initialPage={1}
                    onChange={(pageNumber) => {
                        setPageNo(pageNumber);
                    }}
                />
                <div className="text-sm border-t-1 font-thin animate-pulse">change categories here</div>
            </div>
        </div>
    )
}