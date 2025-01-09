import { Avatar } from "@nextui-org/react"
import { SideMenu } from "./SideMenu"

export const Appbar = ({name}) => {
    return (
        <div className="flex justify-between w-full px-2 py-2 shadow-sm shadow-default-200">
            <div className=" flex justify-center">
                <div className="flex flex-col justify-center items-center">
                    <SideMenu name={"Om"}/>
                </div>
                
            </div>

            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center py-1">
                    <Avatar className="cursor-pointer" showFallback isBordered name={name} size="md"/>     
                </div>
            </div>
            
        </div>
    )
}