import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import logout from "@/assets/signout_black.svg"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { logoutUser } from "@/lib/users.service"
import { useRouter } from "next/navigation";


const UserAvatar = () => {
    const router = useRouter()
    const handleLogout = async () => {
        try{
            const res = await logoutUser()
            if(res.success) {
                router.push('/login')
            }
            return res;            
        } catch (e) {
            console.error(e)
        }

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>UI</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px] bg-gray-800 mr-1 p-2 border-2 border-white">
                <button onClick={handleLogout} className="w-full flex items-center gap-x-1 hover:bg-[#0ea5e9] rounded-md p-1 px-2">
                    <Image src={logout} alt="logout" />
                    <p className="text-white font-medium">Logout</p>
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar