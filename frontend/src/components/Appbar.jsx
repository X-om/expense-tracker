import {
    Button,
    Navbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    Divider,
    Modal,
    ModalHeader,
    ModalContent,
    ModalBody,
    useDisclosure

} from "@nextui-org/react"
import { memo, useState } from "react"
import { RecentTransactions } from "./RecentTransactions";



export const Appbar = ({ name, email }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "Log Out",
    ];

    return (
        <div>
            <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isBordered isBlurred className="bg-inherit">
                
                <NavbarContent className="flex">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? 'close menu' : 'open menu'}
                        className="md:hidden"
                    />
                    <Divider orientation="vertical" className={`${isMenuOpen ? 'hidden' : 'visible'}`}/>
                    <div className={`p-2 flex justify-center items-center ${isMenuOpen ? 'hidden' : 'visible'}`} onClick={onOpen}>
                        <TransactionsIcon fill={"#71717A"} />
                    </div>
                </NavbarContent>
                

                <NavbarContent as="div" className="items-center" justify="end">
                    <Dropdown placement="bottom-end" className="bg-opacity-20" backdrop="blur" >
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className={`transition-transform text-white ${isMenuOpen ? "hidden" : "visible"}`}
                                showFallback
                                fallback={
                                    <CameraIcon className=" animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={20} />
                                }
                                size="md"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Prpfile action" variant="flat" className="bg-inherit">
                            <DropdownItem key="profile" className="h-14 gap-4 p-2">
                                <p className="font-bold text-xl">{name}</p>
                                <p className="from-content2-foreground text-zinc-500">{email}</p>
                            </DropdownItem>
                            <DropdownItem key="addPhoto" className="text-secondary" color="secondary" >Add profile</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>

                <NavbarMenu className="bg-inherit grid grid-rows-5 h-full gap-3">
                    <div className="row-span-3 flex flex-col gap-4">
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                {
                                    index !== menuItems.length - 1 && (
                                        <Link
                                            className=" text-zinc-300"
                                            href="#"
                                            size="lg"
                                        >
                                            {item}
                                        </Link>
                                    )
                                }

                            </NavbarMenuItem>
                        ))}
                    </div>
                    <div className="row-span-1 self-end">
                        <NavbarMenuItem>
                            <Button color="danger" variant="ghost" size="md" className=" rounded-full">
                                Log out
                            </Button>
                        </NavbarMenuItem>
                    </div>

                </NavbarMenu>
            </Navbar>

            <Modal className="fixed inset-0"
            isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="full" shouldBlockScroll>
            <ModalContent className="bg-opacity-50 overflow-auto max-h-screen">
                        {
                            (onClose) => (
                                <>
                                <ModalHeader>Transactions</ModalHeader>
                                <ModalBody>
                                    <RecentTransactions/>
                                </ModalBody>
                            </>    
                            )
                        }
                    </ModalContent>
            </Modal>

        </div>
    )
}

const CameraIcon = memo(( { fill, size, height, width, ...props }) => {
        return (
            <svg
                fill="none"
                height={size || height || 24}
                viewBox="0 0 24 24"
                width={size || width || 24}
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    clipRule="evenodd"
                    d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
                    fill={fill}
                    fillRule="evenodd"
                />
            </svg>
        )
    }
)

const TransactionsIcon = memo(({fill,size = 24,height,width}) => {
    return (
        <svg fill={fill} height={size} width={size} version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Transaction-Filled"> <path d="M14,11V8H1V4h13V1l7,5L14,11z M3,18l7,5v-3h13v-4H10v-3L3,18z"></path> </g> </g></svg>
    )
})