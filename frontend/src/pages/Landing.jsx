import { Button, Link } from "@nextui-org/react"
import { Reveal } from "../components/Reveal"
import { RevealButtons } from "../components/RevealButtons"
import { Typewriter } from "../components/Typewriter"
import { DiscordIcon, GitHubIcon, LinkDinIcon, TwitterIcon } from "../components/Icons"
export const Landing = () => {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-dash-form  to-dash-to">
            <div className="grid grid-rows-10 h-full w-full">
                <div className="row-span-4 flex flex-col gap-4 justify-center items-center w-full">
                    <div className="flex justify-start px-4 w-full">
                        <Reveal>
                            <h1 className="text-3xl font-bold">
                                Track Your <span className="text-yellow-400">Expenses</span>, Take Control of Your <span className="text-yellow-400">Finances</span>
                            </h1>
                        </Reveal>
                    </div>
                    <div className="flex justify-start px-4 w-full">
                        <Reveal>
                            <h2 className="text-xl font-semibold text-default-500">
                                Simplify your budgeting, visualize your spending, and achieve your financial goals with ease
                            </h2>
                        </Reveal>
                    </div>
                </div>
                <div className="row-span-4 w-full   flex flex-col justify-center gap-4 items-center">
                    <div className="flex w-full text-default-400 justify-center">
                        <div className="border-b-1 border-gray-600 py-2">
                            <div className=" animate-bounce">
                                <Typewriter inputString={"Take charge of your finances today!"} />
                            </div>
                        </div>
                    </div>
                    <div className="flex  w-full justify-center">
                        <RevealButtons>
                            <div className="flex w-full justify-center">
                                <div className=" flex w-full justify-end px-4 border-r-1 border-gray-600">
                                    <Button size="lg" radius="md" variant="ghost" color="primary" onPress={() => { window.location.href = "/signin" }}>Sign in</Button>
                                </div>
                                <div className=" flex w-full justify-start px-4">
                                    <Button size="lg" radius="md" variant="ghost" onPress={() => { window.location.href = "/signup" }} >Sign up</Button>
                                </div>
                            </div>
                        </RevealButtons>
                    </div>
                </div>
                <div className="row-span-2 flex flex-col items-center">
                    <div className="flex w-full justify-center">
                        <RevealButtons>
                            <div className="flex flex-col justify-center text-gray-500 font-semibold text-sm py-2">
                                <p className="flex justify-center">Created by Om Argade.</p>
                                <p className="flex justify-center">Get in touch : <Link underline="focus" className="font-light" size="sm" showAnchorIcon href="mailto:omargade2208@gmail.com"> omargade2208@gmail.com</Link></p>
                            </div>
                        </RevealButtons>
                    </div>
                    <div className="w-full h-full flex justify-center gap-4 items-center animate-pulse hover:animate-none ">
                        <RevealButtons>
                            <div className="flex gap-4 group">
                                <GitHubIcon
                                    size={40}
                                    fill={"#52525B"}
                                    className={"transition-transform transform hover:scale-150 group-hover:animate-none"}
                                    onClick={()=>{window.open("https://github.com/X-om","__blank")}}
                                />
                                <LinkDinIcon
                                    size={40}
                                    fill={"#52525B"}
                                    className={"transition-transform transform hover:scale-150 group-hover:animate-none"}
                                    onClick={()=>{window.open("https://www.linkedin.com/in/om-argade-694038259/","__blank")}}
                                />
                                <TwitterIcon
                                    size={40}
                                    fill={"#52525B"}
                                    className={"transition-transform transform hover:scale-150 group-hover:animate-none"}
                                    onClick={()=>{window.open("https://x.com/OmArgade22","__blank")}}
                                />
                                <DiscordIcon
                                    size={40}
                                    fill={"#52525B"}
                                    className={"transition-transform transform hover:scale-150 group-hover:animate-none"}
                                />
                            </div>
                        </RevealButtons>
                    </div>

                </div>
            </div>
        </div>
    )
}