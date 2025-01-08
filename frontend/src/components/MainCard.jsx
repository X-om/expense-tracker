import { Card, CardBody, Chip, CircularProgress } from "@nextui-org/react"
import { style } from "framer-motion/client"

export const MainCard = ({ income, balance }) => {
    return <div>
        <Card>
            <CardBody className="p-1">
                <div className="flex flex-row p-0 gap-2">
                    <div className="flex flex-col bg-default-100 w-full h-full rounded-lg p-2 gap-1">
                        <div className="bg-default-50 rounded-lg flex flex-col gap-2 w-full p-2">
                            <Chip className="w-full">income : {income}</Chip>
                            <Chip className="w-full">balance : {balance}</Chip>
                        </div>
                        <div className="bg-default-50 rounded-lg flex flex-col gap-2 w-full">
                            <div>
                                <CircularProgress label=""/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-default-100 w-full h-full rounded-lg">div2</div>
                </div>
            </CardBody>
            {/* <div>
                <CircularProgress label="Loading.."/>
            </div> */}
        </Card>
    </div>
}