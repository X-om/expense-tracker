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
import { WarningIcon } from "../components/WarningIcon"



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
                        <div className="bg-inherit flex flex-col gap-4 h-full" >
                            <div >
                                <Appbar name={userInfo.contents.name} email={userInfo.contents.email} />
                            </div>

                            <div>
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
                                                                                        <WarningIcon svgFillCode={warningAndError.svgFillCode}/>    
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