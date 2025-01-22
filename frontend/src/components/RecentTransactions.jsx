import { Button, DateRangePicker, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Spinner } from "@nextui-org/react"
import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react"
import { getLocalTimeZone, today, startOfMonth } from "@internationalized/date";
import { ExpenseCard } from "./ExpenseCard";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const RecentTransactions = memo(({ renderTransaction }) => {

    const [transactions, setTransactions] = useState({});
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pageNo, setPageNo] = useState(1);
    const [description, setDescription] = useState("");
    const currentDate = today(getLocalTimeZone());
    const firstDay = startOfMonth(currentDate);
    const [isLoading, setIsLoading] = useState(false);
    const [responseError, setResponseError] = useState({
        status: false,
        message: ""
    })


    useEffect(() => {
        if (renderTransaction) {
            const timer = setTimeout(async () => {
                const token = localStorage.getItem("token");
                const categoryFilter = Array.from(selectedKeys);

                try {
                    const response = await axios.get(

                        `${backendUrl}/account/recentexpense?category=${categoryFilter}&startdate=${startDate}&enddate=${endDate}&page=${pageNo}&description=${description
                        }`

                        , {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                    console.log(response.data)
                    setResponseError({
                        status : false,
                        message : ""
                    })
                    setIsLoading(true);
                    setTransactions(response.data);
                } catch (error) {
                    console.log(error);
                    setIsLoading(true);
                    setResponseError({
                        status: true,
                        message: error?.response?.data?.message
                    })
                }

            }, 800);

            return () => clearTimeout(timer);
        }
    }, [selectedKeys, startDate, endDate, pageNo, description])




    const selectedValues = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " ")
        , [selectedKeys]
    );


    if (renderTransaction) {
        return (
            <div className="h-screen max-h-screen flex flex-col gap-4 overflow-hidden">
                <div className="flex flex-col gap-4 mt-2">
                    <div className="text-lg font-semibold text text-gray-400">
                        Recent Transactions
                    </div>
                    <div>
                        <Input
                            variant="underlined"
                            placeholder="Search by description..."
                            size="md"
                            onValueChange={setDescription}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex flex-col h-full justify-end">
                            <Dropdown backdrop="opaque">
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        size="sm"
                                        radius="sm"
                                    >category</Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    selectedKeys={selectedKeys}
                                    aria-label="multiple silection category"
                                    variant="flat"
                                    selectionMode="multiple"
                                    closeOnSelect={false}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    <DropdownItem key="food">Food</DropdownItem>
                                    <DropdownItem key="subscription">Subscription</DropdownItem>
                                    <DropdownItem key="shopping">Shopping</DropdownItem>
                                    <DropdownItem key="rent">Rent</DropdownItem>
                                    <DropdownItem key="bill">Bill</DropdownItem>
                                    <DropdownItem key="travel">Travel</DropdownItem>
                                    <DropdownItem key="other" className="text-secondary" color="secondary">Other</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div>
                            <DateRangePicker
                                label="start and end"
                                defaultValue={{
                                    start: firstDay,
                                    end: today(getLocalTimeZone())
                                }}
                                minValue={firstDay}
                                maxValue={today(getLocalTimeZone())}
                                variant="underlined"
                                onChange={(value) => {
                                    const sd = `${value.start.year}-${value.start.month}-${value.start.day}`;
                                    const ed = `${value.end.year}-${value.end.month}-${value.end.day}`;

                                    setStartDate(sd);
                                    setEndDate(ed);
                                }}
                            />
                        </div>
                    </div>
                    <div className={`text-sm text-default-400 ${selectedValues ? 'visible' : 'hidden'}`}>{selectedValues}</div>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto px-1 py-2 border-1 rounded-lg border-default-200">
                    {isLoading ? (
                        <>
                            {!responseError.status ? (
                                <>
                                    {transactions.transactions.map((expense) => (
                                        <>
                                            <ExpenseCard expense={expense} />
                                        </>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center text-medium text-danger font-semibold">{responseError.message}</div>
                                </>
                            )}

                        </>
                    ) : (
                        <>
                            <Spinner />
                        </>
                    )}
                </div>
                <div className="flex justify-center">
                    <Pagination size="sm" radius="sm" variant="flat" total={transactions.totalPages} initialPage={transactions.currentPage}
                        onChange={(pageNumber) => {
                            setPageNo(pageNumber)
                            setIsLoading(false);
                        }
                        }
                    />

                </div>
            </div>
        )
    } else{
        return (
            <div></div>
        )
    }
})

