import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { Appbar } from "../components/Appbar"
import { MainCard } from "../components/MainCard"
import { accountAtom, initialBalanceAtom, userAtom } from "../store/atoms"
import { Spinner } from "@nextui-org/react"
import { AlertMessage } from "../components/AlertMessage"
import { useNavigate } from "react-router-dom"
import { AccountDataModel } from "../components/AccountDataModel"
import { useEffect, useMemo, useState } from "react"
import { BalanceCard } from "../components/BalanceCard"
import { RecentTransactions } from "../components/RecentTransactions"
import { AddExpenseButton } from "../components/AddExpenseButton"
import { TotalSpendCard } from "../components/TotalSpendCard"



export const Dashboard = () => {

    const userInfo = useRecoilValueLoadable(userAtom);
    const accountInfo = useRecoilValueLoadable(accountAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [initialBalance, setInitialBalance] = useRecoilState(initialBalanceAtom);
    useEffect(() => {
        if (accountInfo.state === "hasValue" && accountInfo.contents.hasData === true) {
            const timer = setTimeout(() => {
                setIsLoading(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [accountInfo]);

    const warningAndError = useMemo(() => {
        if (accountInfo.state === "hasValue") {
            const totalSpendPercentage = (accountInfo.contents.totalSpend / accountInfo.contents.budget) * 100;
            console.log(totalSpendPercentage)
            let obj = {};
            if(totalSpendPercentage >= 100){
                obj.totalSpendWarning = "You have exceeded your budget !";
                obj.warningColor = "danger";
                obj.svgFillCode = "#9f1239";
            } else if (totalSpendPercentage >= 95) {
                obj.totalSpendWarning = "Your Budget will exceed soon !";
                obj.warningColor = "danger";
                obj.svgFillCode = "#9f1239"
            } else if (totalSpendPercentage >= 85) {
                obj.totalSpendWarning = "Watch it! Budget is nearing !";
                obj.warningColor = "warning";
                obj.svgFillCode = "#facc15";
            } else if (totalSpendPercentage >= 75) {
                obj.totalSpendWarning = "Spend carefully, you'll reach the budget soon !";
                obj.warningColor = "default";
                obj.svgFillCode = "#FAFAFA";
            } 

            return obj;
        }
    }, [accountInfo.contents.totalSpend, accountInfo.contents.budget]);

    if (accountInfo.contents.hasData === true) {
        setInitialBalance(accountInfo.contents.initialBalance);
    }
    console.log(accountInfo.contents)


    const navigate = useNavigate();

    return (
        <div className={`flex w-screen h-screen bg-gradient-to-br from-dash-form  to-dash-to `}>
            <div className="flex flex-col w-full bg-inherit">
                {
                    userInfo.state === "loading" ? (
                        <div className=" flex flex-col justify-center w-full h-full">
                            <Spinner size="lg" />
                        </div>
                    ) : userInfo.state === "hasError" ? (
                        <div className="flex flex-col justify-center w-full h-full">
                            <AlertMessage type={"error"} message={userInfo.contents?.response?.data?.message || userInfo.contents.message} onClose={() => { navigate("/signin") }} />
                        </div>
                    ) : (
                        <div className="bg-inherit grid grid-rows-12 h-full" >
                            <div className=" row-span-2">
                                <Appbar name={userInfo.contents.name} email={userInfo.contents.email} />
                            </div>

                            <div className="row-span-10">
                                {
                                    userInfo.state === "hasValue" && (
                                        <div className="h-full">
                                            {
                                                accountInfo.state === "loading" ? (
                                                    <div className=" flex flex-col justify-center w-full h-full">
                                                        <Spinner size="lg" />
                                                    </div>
                                                ) : accountInfo.state === "hasError" ? (
                                                    <div className="flex flex-col justify-center w-full h-full">
                                                        <AlertMessage type={"error"} message={accountInfo.contents?.response?.data?.message} onClose={() => { navigate("/signin") }} />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {
                                                            accountInfo.contents.hasData === false ? (
                                                                <div className="w-full flex justify-center items-center">
                                                                    <div className=" flex felx-col w-full justify-center">
                                                                        <AccountDataModel />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className="p-2">
                                                                        <div className="p-2 rounded-2xl bg-default-100 bg-opacity-25">
                                                                            <BalanceCard
                                                                                balance={accountInfo.contents?.balance}
                                                                                budget={accountInfo.contents?.budget}
                                                                                totalSpend={accountInfo.contents?.totalSpend}
                                                                                isLoading={isLoading} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-2">
                                                                        <div className="p-2 rounded-2xl bg-default-100 bg-opacity-25">
                                                                            {warningAndError.totalSpendWarning && (
                                                                                <div className={`text-${warningAndError.warningColor} text-xs flex gap-2`}>
                                                                                <div className="flex justify-center items-center">
                                                                                        <svg
                                                                                            fill={warningAndError.svgFillCode}
                                                                                            version="1.1"
                                                                                            id="Capa_1"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                                            viewBox="0 0 478.125 478.125"
                                                                                            xml:space="preserve"
                                                                                            className="w-6 h-6"
                                                                                        >
                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                <g>
                                                                                                    <g>
                                                                                                        <g>
                                                                                                            <circle cx="239.904" cy="314.721" r="35.878"></circle>
                                                                                                            <path d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9 c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z"></path>
                                                                                                            <path d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062 S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595 s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z"></path>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="flex justify-center items-center">
                                                                                        <p>Warning! {warningAndError.totalSpendWarning}</p>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="px-2 md:w-1/4 bg-inherit">
                                                                        <MainCard
                                                                            income={accountInfo.contents?.income}
                                                                            balance={accountInfo.contents?.balance}
                                                                            budget={accountInfo.contents?.budget}
                                                                            totalSpend={accountInfo.contents?.totalSpend}
                                                                            isLoading={isLoading} />
                                                                    </div>
                                                                    <div className="p-2">
                                                                        <div className="p-2 rounded-2xl bg-default-100 bg-opacity-25">
                                                                            <TotalSpendCard
                                                                                budget={accountInfo.contents?.budget}
                                                                                totalSpend={accountInfo.contents?.totalSpend}
                                                                                isLoading={isLoading}
                    
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}