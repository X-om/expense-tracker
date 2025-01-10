import { useRecoilValueLoadable } from "recoil"
import { Appbar } from "../components/Appbar"
import { MainCard } from "../components/MainCard"
import { accountAtom, userAtom } from "../store/atoms"
import { Spinner } from "@nextui-org/react"
import { AlertMessage } from "../components/AlertMessage"
import { useNavigate } from "react-router-dom"
import { AccountDataModel } from "../components/AccountDataModel"



export const Dashboard = () => {

    const userInfo = useRecoilValueLoadable(userAtom);
    const accountInfo = useRecoilValueLoadable(accountAtom);

    console.log(userInfo.contents)
    const navigate = useNavigate();

    return (
        <div className="flex w-screen h-screen">
            <div className="flex flex-col w-full">
                {
                    userInfo.state === "loading" ? (
                        <div className=" flex flex-col justify-center w-full h-full">
                            <Spinner size="lg" />
                        </div>
                    ) : userInfo.state === "hasError" ? (
                        <div className="flex flex-col justify-center w-full h-full">
                            <AlertMessage type={"error"} message={userInfo.contents.response.data.message} onClose={() => { navigate("/signin") }} />
                        </div>
                    ) : (
                        <div>
                            <Appbar name={"Om"} />
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
                                                        <AlertMessage type={"error"} message={accountInfo.contents.response.data.message} onClose={() => { navigate("/signin") }} />
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
                                                                <h1>
                                                                    <div className=" px-2 py-10 md:w-1/4">
                                                                        <MainCard income={"250000"} balance={"10000"} isLoading={true} />
                                                                    </div>
                                                                </h1>
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