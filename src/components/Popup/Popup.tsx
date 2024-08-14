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
import React, { SetStateAction, useState } from "react";
import { Dropdown } from "react-day-picker";
import DropdownComponent from "../DropdownComponent/DropdownComponent";

type PopupComponentProps = {
    type: 'plan' | 'routine' | 'activity';
    process: (data: any) => void;
    trigger: string;
    items?: any;
}

type PlanPopupProps = {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
}

type RoutinePopupProps = {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
}

type ActivityPopupProps = {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
    items: any;
    onSelectRoutine: (value: string) => void;
}

const PlanPopup: React.FC<PlanPopupProps> = ({ name, setName }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Create a plan</AlertDialogTitle>
            <div className="flex flex-col justify-start">
                <label className="mb-2 text-start" htmlFor="name">Name</label>
                <input className="text-black p-1 py-2 rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        </AlertDialogHeader>
    )
}

const RoutinePopup: React.FC<RoutinePopupProps> = ({ name, setName }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Create a routine</AlertDialogTitle>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="name">Name</label>
                <input className="text-black py-2 px-3 rounded-md w-full focus:outline-[#0ea5e9]" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        </AlertDialogHeader>
    )
}

const ActivityPopup: React.FC<ActivityPopupProps> = ({ name, setName, items, onSelectRoutine }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Create an activity</AlertDialogTitle>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="name">Name</label>
                <input className="text-black py-2 px-3 rounded-md w-full focus:outline-[#0ea5e9]" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <DropdownComponent title="Select a Routine" items={items} onSelectItem={onSelectRoutine} />
        </AlertDialogHeader>
    )
}

const PopupComponent:React.FC<PopupComponentProps> = ({ type, process, trigger, items }) => {
    const [name, setName] = useState<string>('')
    const [selectedRoutine, setSelectedRoutine] = useState<string>('')

    const handleSelectRoutine = (value: string) => {
        setSelectedRoutine(value)
    }

    const handleProcess = () => {
        const data = {
            name: name,
            icon: '',
        }
        process(data)
        setName('')
    }
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className="w-[90px] h-[40px] bg-[#0ea5e9] border-0 rounded-lg p-2">{trigger}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[320px] bg-[#334155] rounded-lg">
            {type === 'plan' && <PlanPopup name={name} setName={setName} />}
            {type === 'routine' && <RoutinePopup name={name} setName={setName} />}
            {type === 'activity' && <ActivityPopup name={name} setName={setName} items={items} onSelectRoutine={handleSelectRoutine} />}
            <AlertDialogFooter className="w-full flex flex-row justify-ceter items-center gap-x-1">
                <AlertDialogCancel className="text-black w-1/2 m-0 p-0" onClick={() => setName('')}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="w-1/2 m-0 p-0" onClick={handleProcess}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
export default PopupComponent