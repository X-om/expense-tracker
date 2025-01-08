import { Appbar } from "../components/Appbar"
import { MainCard } from "../components/MainCard"

export const Dashboard = () => {
    return (
        <div className="flex w-screen h-screen">
            <div className="flex flex-col w-full">
                <Appbar name={"Om"}/>
                <MainCard income={"250000"} balance={"10000"}/>
            </div>
        </div>
    )
}