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
import { useActionPopupStore } from "@/lib/popupStore";

type PopupComponentProps = {
    title?: string;
    type: 'plan' | 'routine' | 'activity';
    process: (data: any) => void;
    trigger: string;
    items?: any;
    className?: string;
}

type PlanPopupProps = {
    name: string;
    description: string;
    setName: React.Dispatch<SetStateAction<string>>;
    setDescription: React.Dispatch<SetStateAction<string>>;
}

type RoutinePopupProps = {
    name: string;
    description: string;
    setName: React.Dispatch<SetStateAction<string>>;
    setDescription: React.Dispatch<SetStateAction<string>>;
}

type ActivityPopupProps = {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
    items: any;
    onSelectRoutine: (value: string) => void;
}

const PlanPopup: React.FC<PlanPopupProps> = ({ name, description, setName, setDescription }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Create a plan</AlertDialogTitle>
            <div className="flex flex-col justify-start">
                <label className="mb-2 text-start" htmlFor="name">Name *</label>
                <input className="text-black p-2 rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col justify-start">
                <label className="mb-2 text-start" htmlFor="description">Description</label>
                <input className="text-black p-2 rounded-md" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
        </AlertDialogHeader>
    )
}

const RoutinePopup: React.FC<RoutinePopupProps> = ({ name, description, setName, setDescription }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Create a routine</AlertDialogTitle>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="name">Name</label>
                <input className="text-black py-2 px-3 rounded-md w-full focus:outline-[#0ea5e9]" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col justify-start">
                <label className="mb-2 text-start" htmlFor="description">Description</label>
                <input className="text-black p-2 rounded-md" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
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

const PopupComponent:React.FC = () => {
    const { isOpen, closePopup, popupData } = useActionPopupStore(state => state)
    const [name, setName] = useState<string>(popupData.name)
    const [desc, setDesc] = useState<string>(popupData.description ? popupData.description : '')
    const [items, setItems] = useState(popupData.items ? popupData.items : [])

    const handleSelectRoutine = (value: string) => {
        setItems(value)
    }

    const handleProcess = () => {
        const data = {
            name: name,
            description: desc,
            icon: '',
        }
        console.log(data, 'data')
        popupData.process(data)
        setName('')
        setDesc('')
        closePopup()
    }

    const handleCancel = () => {
        setName('')
        setDesc('')
        closePopup()
    }
    return (
        <AlertDialog open={isOpen}>
        <AlertDialogContent className="w-[320px] bg-[#334155] rounded-lg">
        {popupData.type === 'plan' && <PlanPopup name={name} description={desc} setName={setName} setDescription={setDesc} />}
            {popupData.type === 'routine' && <RoutinePopup name={name} description={desc} setName={setName} setDescription={setDesc} />}
            {popupData.type === 'activity' && <ActivityPopup name={name} setName={setName} items={items} onSelectRoutine={handleSelectRoutine} />}
            <AlertDialogFooter className="w-full flex flex-row justify-ceter items-center gap-x-1">
                <AlertDialogCancel className="text-black w-1/2 m-0 p-0" onClick={handleCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="w-1/2 m-0 p-0" onClick={handleProcess}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
export default PopupComponent