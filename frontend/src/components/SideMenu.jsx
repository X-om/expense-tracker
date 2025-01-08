import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from "@nextui-org/react"
export const SideMenu = ({name}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    return (
        <div>
            <Button 
                size="md"
                className=" bg-darkbg hover:bg-dark-800"
                onPress={onOpen}
            >menu</Button>
            <Drawer isOpen={isOpen} backdrop="blur" size="xs" placement="left" onOpenChange={onOpenChange}>
                <DrawerContent className=" bg-darkBg text-zink-300">
                    {
                        (onclose)=>(
                            <div>
                                <DrawerHeader className="text-4xl">{name}</DrawerHeader>
                                <DrawerBody>
                                    <div className="flex flex-col gap-4 py-4 px-2">
                                        <div className="border-b-1 border-zink-300  pb-2">
                                            <Button className="text-zink-300 justify-start py-2 text-lg w-full bg-darkBg hover:bg-dark-800" size="sm">option A</Button>
                                        </div>
                                        <div className="border-b-1 border-zink-300 pb-2">
                                            <Button className="text-zink-300 justify-start py-2 text-lg w-full bg-darkBg hover:bg-dark-800" size="sm">option A</Button>
                                        </div>
                                        <div className="border-b-1 border-zink-300 pb-2">
                                            <Button className="text-zink-300 justify-start py-2 text-lg w-full bg-darkBg hover:bg-dark-800" size="sm">option A</Button>
                                        </div>
                                        <div className="border-b-1 border-zink-300 pb-2">
                                            <Button className="text-zink-300 justify-start py-2 text-lg w-full bg-darkBg hover:bg-dark-800" size="sm">option A</Button>
                                        </div>
                                        <div className="border-b-1 border-zink-300 pb-2">
                                            <Button className="text-zink-300 justify-start py-2 text-lg w-full bg-darkBg hover:bg-dark-800" size="sm">option A</Button>
                                        </div>                
                                    </div>
                                </DrawerBody>
                                <DrawerFooter className="pl-8 justify-start">
                                    <Button color="danger" variant="light" size="lg" className=" rounded-full">
                                        Log out
                                    </Button>
                                </DrawerFooter>
                            </div>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </div>
    )
}