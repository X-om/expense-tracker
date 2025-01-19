export const ExpenseCard = ({expense}) => {
    return (
        <div>  
            <div className="border-b-1 border-default-300 flex justify-between pb-1 px-2">
                <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold">{expense.category.charAt(0).toUpperCase() + expense.category.slice(1).toLowerCase()}</div>
                        <div className="text-sm font-extralight text-default-500 overflow-hidden">{expense.description}</div>
                </div>
                <div className="flex flex-col gap-1 items-center">
                        <div className="text-lg font-semibold">₹ {expense.amount}</div>
                        <div className="text-sm font-extralight text-default-500">{expense.spendDate.split("T")[0]}</div>
                </div>
            </div>
        </div>
    )
}