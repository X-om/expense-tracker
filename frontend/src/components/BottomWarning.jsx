import { Link } from "@nextui-org/react"

export const BottomWarning = ({ label, bottomtext, to }) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center py-2 text-sm rounded-sm">
                <div className=" text-zink-300">{label}</div>
                <div>
                    <Link href={to} underline="hover" size="md">{bottomtext}</Link>
                </div>
            </div>
        </>
    )
}