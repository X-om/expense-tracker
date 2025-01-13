import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { Appbar } from "../components/Appbar"
import { MainCard } from "../components/MainCard"
import { accountAtom, blurAtom, initialBalanceAtom, userAtom } from "../store/atoms"
import { Spinner } from "@nextui-org/react"
import { AlertMessage } from "../components/AlertMessage"
import { useNavigate } from "react-router-dom"
import { AccountDataModel } from "../components/AccountDataModel"
import { useEffect, useState } from "react"
import { BalanceCard } from "../components/BalanceCard"
import { RecentTransactions } from "../components/RecentTransactions"
import { AddExpenseButton } from "../components/AddExpenseButton"



export const Dashboard = () => {

    const userInfo = useRecoilValueLoadable(userAtom);
    const accountInfo = useRecoilValueLoadable(accountAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [initialBalance,setInitialBalance] = useRecoilState(initialBalanceAtom);
    useEffect(()=>{
        if(accountInfo.state === "hasValue"  && accountInfo.contents.hasData === true){
            const timer = setTimeout(() => {
                setIsLoading(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    },[accountInfo]);

    if(accountInfo.contents.hasData === true){
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
                        <div className=" bg-inherit" >
                            <Appbar name={userInfo.contents.name} email={userInfo.contents.email} /> 
                            <div>
                                {
                                    userInfo.state === "hasValue" && (
                                        <div>
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
                                                                            <AccountDataModel/>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className="p-2">
                                                                        <div className="p-2 rounded-2xl bg-default-100 bg-opacity-25">
                                                                            <BalanceCard balance={accountInfo.contents?.balance} isLoading={isLoading}/>
                                                                        </div>
                                                                    </div>

                                                                    <div className="px-2 py-6 md:w-1/4 bg-inherit">
                                                                        <MainCard 
                                                                            income={accountInfo.contents?.income} 
                                                                            balance={accountInfo.contents?.balance}
                                                                            budget={accountInfo.contents?.budget}
                                                                            totalSpend={accountInfo.contents?.totalSpend}
                                                                            isLoading={isLoading} />
                                                                    </div>
                                                                    <div className="border p-2">
                                                                        <RecentTransactions/>
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