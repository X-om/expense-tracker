import { CircularProgress } from "@nextui-org/react"


export default function ProgressBar({color,progress,progressColor,label,size}){
    return (
        <div className="flex flex-col w-fit justify-center">
            <CircularProgress
                className="p-2"
                aria-label="somethig"
                classNames={{
                    value : `text-${progressColor}`
                }}
                value={progress}
                size={size}
                showValueLabel={true}
                color={color}
            />
            <div className="text-sm flex justify-center">
                {label}
            </div>
        </div>
    )
}



