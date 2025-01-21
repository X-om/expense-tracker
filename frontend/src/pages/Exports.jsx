import { useRecoilValueLoadable } from "recoil"
import { Appbar } from "../components/Appbar"
import { userAtom } from "../store/atoms"
import { Heading } from "../components/Heading";
import { Typewriter } from "../components/Typewriter";
import { Dropdown, DropdownMenu, DropdownTrigger, Button, DropdownItem } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../components/AlertMessage";
import { useFileDownload } from "../hooks/useFileDownload";
const backendUrl = import.meta.env.VITE_BACKEND_URL


export const Exports = () => {
    const userInfo = useRecoilValueLoadable(userAtom);
    const [months,setMonths] = useState([]);
    const navigate = useNavigate();
    const [selectedKey,setSelectedKey] = useState(new Set([null]));
    const [aler,setAlert] = useState(false);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const downloadFile = useFileDownload();
    

    useEffect( ()=> {
        const fetchMonths = async ()=> {
            try{
                const token = localStorage.getItem("token");
                if(!token){
                    navigate('/signin');
                }
                const response = await axios.get(`${backendUrl}/account/allexportmonths`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
    
                setMonths(response.data);
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchMonths();
    },[]);

    const selectedValue = useMemo(
        () => Array.from(selectedKey).join(", ")
    ,[selectedKey])
    

    const date = useMemo(() => {
        const montName = selectedValue.split(" ")[0]; // Get the month name
        const year = selectedValue.split(" ")[1]; // Get the year
        const month = monthNames.indexOf(montName) + 1; // Get the month index and add 1 to make it 1-based
        const monthNumber = String(month).padStart(2, "0"); // Pad with leading zero if needed
        const date = new Date(`${year}-${monthNumber}-01`); // Correct the date format
        return date;
    }, [selectedValue]);
    



    const downloadXlsx = async () => {

        if(!selectedValue) {
            setAlert(true);
            return;
        }
        
        try{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/signin");
            }
            const response = await axios.get(`${backendUrl}/account/exportexpense/xlsx?month=${date.toISOString()}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                },
                responseType: "blob"
            });

            const blob = new Blob([response.data],{ type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            downloadFile(blob, `expenses-${selectedValue}.xlsx`);
        }catch (error) {
            console.log(error);
        }
    }

    const downloadCsv = async () => {
        if(!selectedValue){
            setAlert(true);
            return;
        }
        try{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/signin");
            }

            const response = await axios.get(`${backendUrl}/account/exportexpense/csv?month=${date.toISOString()}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                },
                responseType : "blob"
            });

            const blob = new Blob([response.data],{ttype: "text/csv"});
            downloadFile(blob, `expenses-${selectedValue}.csv`);
        } catch(error){
            console.log(error);
        }
    }


    return (
        <div className="grid grid-rows-10 h-screen bg-gradient-to-br from-dash-form  to-dash-to">
            <Appbar name={userInfo.contents.name} email={userInfo.contents.email} hideTransactions={true}/>
            <div className="row-span-3  flex flex-col gap-2">
                <div className="flex justify-center text-warning">
                    <Heading label={"Exports.."}/>
                </div>
                <div className="flex justify-center px-4 text-default-600 font-light">
                    <Typewriter
                        inputString={"Easily download your monthly transaction history in .xlsx or .csv format for streamlined tracking and analysis...."}
                    />
                </div>
            </div>
            <div className="row-span-6 py-2 flex flex-col gap-8">
                <div className="flex justify-center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button size="md" color="default" radius="sm" variant="bordered">{selectedValue || <>Select month</>}</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKey}
                            aria-label="single month selection"
                            onSelectionChange={setSelectedKey}
                        >
                            {
                                months.map(month => (
                                    <DropdownItem key={month}>{month}</DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex justify-around">
                        <Button size="md" radius="md" color="primary" variant="bordered" onPress={downloadXlsx}>.XLSX</Button>
                        <Button size="md" radius="md" color="secondary" variant="bordered" onPress={downloadCsv}>.CSV</Button>
                </div>
                {aler && (
                    <AlertMessage
                        message={"please select the month"}
                        type={"error"}
                        onClose={()=> setAlert(false)}
                    />
                )}
            </div>
        </div>
    )
}