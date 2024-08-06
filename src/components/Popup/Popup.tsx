import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
//   AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RoutineType } from "@/lib/types/routine.type";
import { useCurrentUserStore } from "@/lib/userStore";
import { useState } from "react";

type PopupComponentProps = {
    process: (data: RoutineType) => void;
    trigger: string;
}

const PopupComponent:React.FC<PopupComponentProps> = ({ process, trigger}) => {
    const { currentUser } = useCurrentUserStore(state=> state) 
    const [name, setName] = useState<string>('')
    const handleProcess = () => {
        const data = {
            name: name,
            icon: '',
            userId: currentUser?._id ?? ''
        }
        process(data)
        setName('')
    }
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className="w-[90px] h-[40px] bg-[#0ea5e9] border-0 rounded-lg p-2">{trigger}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#334155] rounded-lg">
            <AlertDialogHeader>
                <AlertDialogTitle>Create a routine</AlertDialogTitle>
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="name">Name</label>
                    <input className="text-black p-1 py-2 rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="text-black" onClick={() => setName('')}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleProcess}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
export default PopupComponent