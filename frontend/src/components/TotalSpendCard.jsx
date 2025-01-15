import { Pagination, Skeleton, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { sumOfCategoriesAtom } from "../store/atoms";
import { AlertMessage } from "./AlertMessage";
import { useNavigate } from "react-router-dom";



export const TotalSpendCard = ({ budget, isLoading, totalSpend }) => {

    const [totalSpendPercentage, setTotalSpendPercentage] = useState(0);
    const sumOfCategories = useRecoilValueLoadable(sumOfCategoriesAtom);
    const [pageNo, setPageNo] = useState(1);
    const [pageTrigger, setPageTrigger] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const value = (totalSpend / budget) * 100;
        setTotalSpendPercentage(value);
    }, [totalSpend, budget])

    const categories = ['food', 'subscription', 'shopping', 'rent', 'bill', 'travel', 'other'];

    const variant = {
        hidden: { x: "-100vw" },
        visible: { x: 0 }
    }

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
        <div className="grid grid-rows-6">
            <div className="row-span-4 grid grid-cols-5">
                <div className="col-span-2 flex flex-col gap-2 px-2 py-4 border-r-1 border-zinc-600">
                    <div className=" text-sm flex justify-center font-thin">Total Spend</div>
                    <div className={`text-2xl text-slate-300 flex justify-center font-semibold ${totalSpendPercentage >= 90 ? 'text-danger-400' : totalSpendPercentage >= 75 ? 'text-warning' : ' '}`}>
                        ₹ {totalSpend} /-
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-center items-center w-full">
                    <div>
                        {
                            sumOfCategories.state === "loading" ? (
                                <Spinner />
                            ) : sumOfCategories.state === "hasError" ? (
                                <AlertMessage type={"error"} message={sumOfCategories.contents?.response?.data?.message || "Internal server error"} onClose={() => navigate("/signin")} />
                            ) : (
                                    <div>
                                        <h1>{category}</h1>
                                        <h2>{sumValue}</h2>
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="row-span-2 flex justify-center items-center">
                <Pagination size="sm" radius="full" isCompact variant="light" color="default" total={7} initialPage={1}
                    onChange={(pageNumber) => {
                        setPageNo(pageNumber);
                        setPageTrigger(true);
                    }}
                />
            </div>
        </div>
    )
}