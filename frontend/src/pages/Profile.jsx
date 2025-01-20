import { Avatar, Button, Spinner } from "@nextui-org/react"
import { Appbar } from "../components/Appbar"
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { profileImageInfoAtom, userAtom } from "../store/atoms"
import { memo } from "react"

export const Profile = () => {

    const userInfo = useRecoilValue(userAtom);
    const profileImage = useRecoilValueLoadable(profileImageInfoAtom);
    return (
        <div className="flex w-screen h-screen bg-gradient-to-br from-dash-form  to-dash-to">
            <div className="grid grid-rows-10 w-full h-full">
                <Appbar name={userInfo.name} email={userInfo.email} hideNavAvtar={true} />

                <div className="row-span-4  flex justify-center items-center">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="w-24 h-24 flex flex-col justify-center items-center">
                            {
                                profileImage.state === "loading" ? (
                                    <>
                                        <Spinner color="primary" size="lg"/>
                                    </>
                                ) : profileImage.state === "hasError" ? (
                                    <>
                                        <Avatar

                                            isBordered
                                            showFallback
                                            className="w-full h-full"
                                            fallback={
                                                <CameraIcon
                                                    className="animate-pulse w-full h-full text-default-500"
                                                    fill="currentColor"
                                                    size={20}
                                                />
                                            }
                                            aria-label="Profile Picture"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Avatar
                                            className="w-full h-full"
                                            isBordered
                                            src={profileImage.contents.imageUrl}
                                            showFallback
                                            fallback={
                                                <CameraIcon
                                                    className="animate-pulse w-full h-full text-default-500"
                                                    fill="currentColor"
                                                    size={50}
                                                />
                                            }
                                            aria-label="Profile Picture"
                                        />
                                    </>
                                )
                            } 
                        </div>
                        <div className="text-4xl font-semibold">
                            {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 row-span-6">
                        <div className=" flex flex-col gap-2 w-full px-2">
                            <div className="font-extralight border-b-1 py-2 border-default-300 px-2">
                                Name : {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1).toLowerCase()}
                            </div>
                            <div className="font-extralight border-b-1 pb-2 border-default-300 pl-2">
                                Email : {userInfo.email}
                            </div>
                        </div>
                        <div className="px-2">
                            <Button
                                size="md"
                                variant="light"
                                radius="full"
                                color="primary"
                                className="border-1 border-primary-300 font-light text-primary-300"
                            >
                                Update information
                            </Button>
                        </div>
                        <div className="px-2">
                            <Button
                                size="md"
                                variant="light"
                                radius="full"
                                color="primary"
                                className="border-1 border-primary-300 font-light text-primary-300"
                            >
                               {profileImage.contents.hasImage ? <>Change profile picture</> : <>Add profile picture</>}
                            </Button>
                        </div>
                        <div className="px-2">
                            <Button
                                size="md"
                                variant="light"
                                radius="full"
                                color="danger"
                                className="border-1 border-danger-300 font-light text-danger-300"
                            >
                               Remove profile picture
                            </Button>
                        </div>
                </div>
            </div>
        </div>
    )
}


const CameraIcon = memo(({ fill, size, height, width, ...props }) => (
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
)); 