import { Appbar } from "../components/Appbar";
import { useRecoilValueLoadable } from "recoil";
import { categoriesInfoAtom, userAtom } from "../store/atoms";
import { PieChart } from "../components/PieChart";
import { Tab, Tabs } from "@nextui-org/react";
import {BarChart3D} from "../components/BarChart3D";
import { BarChart2D } from "../components/BArChart2D";


export const Analytics = () => {

    const userInfo = useRecoilValueLoadable(userAtom);
    const categoriesInfo = useRecoilValueLoadable(categoriesInfoAtom);



    return (
        <div className="h-screen w-screen bg-gradient-to-br from-dash-form to-dash-to">
            <div className="grid grid-rows-10  h-full">
                <div className="row-span-1 ">
                    <Appbar name={userInfo.contents.name} email={userInfo.contents.email} />
                </div>

                <div className="row-span-8  p-4">
                    {categoriesInfo.state === "loading" && <p className="text-center text-gray-500">Loading analytics...</p>}
                    {categoriesInfo.state === "hasError" && <p className="text-center text-red-500">{categoriesInfo.contents?.response?.data?.message || "Internal server error"}</p>}
                    {categoriesInfo.state === "hasValue" && (
                        <div className="flex flex-col h-full justify-center items-center">
                            <h2 className="text-center text-xl font-semibold mb-4">Category Analytics</h2>

                            <div className="w-full h-full flex justify-center items-center">
                                <Tabs aria-label="visualise options" placement="bottom" className="justify-center">
                                    <Tab key="pie-chart" title="Pie chart">
                                        <PieChart categoriesInfo={categoriesInfo.contents} />
                                    </Tab>
                                    <Tab key="2d-bar-chart" title="Bar chart">
                                        <BarChart2D categoriesInfo={categoriesInfo.contents}/>
                                    </Tab>
                                    <Tab key="3d-bar-chart" title="Bar chart (3D) ">
                                        <BarChart3D categoriesInfo={categoriesInfo.contents}/>
                                    </Tab>
                                    
                                </Tabs>
                                
                            </div>
                        </div>
                    )}
                </div>


                <div className="row-span-1  flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Analytics Dashboard © 2025</p>
                </div>
            </div>
        </div>
    );
};
