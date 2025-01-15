import { Input } from "@nextui-org/react"

export const RecentTransactions = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold text text-gray-400">
                Recent Transactions
            </div>
            <div>
                <Input
                    variant="underlined"
                    placeholder="Search Transactions"
                    size="md"
                />
            </div>
        </div>
    )
}