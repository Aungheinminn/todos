"use client"
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
import React, { SetStateAction, useEffect, useState } from "react";
import { Dropdown } from "react-day-picker";
import DropdownComponent from "../DropdownComponent/DropdownComponent";
import { useEditPopupStore } from "@/lib/popupStore";

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

const EditPlanPopup: React.FC<PlanPopupProps> = ({ name, description, setName, setDescription }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Edit a plan</AlertDialogTitle>
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

const EditRoutinePopup: React.FC<RoutinePopupProps> = ({ name, description, setName, setDescription }) => {
    return(
        <AlertDialogHeader>
            <AlertDialogTitle>Edit a routine</AlertDialogTitle>
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

const EditPopupComponent:React.FC = () => {
    const { isOpen, closePopup, popupData } = useEditPopupStore(state => state)
    console.log(popupData, typeof popupData.name, typeof popupData.description)

    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string | undefined>('')

    useEffect(() => {
        setName(popupData.name)
        setDesc(popupData.description)
    }, [popupData.name, popupData.description])

    const handleProcess = () => {
        const data = {
            name: name,
            description: desc,
            user_id: popupData.userId,
            icon: '',
        }
        const id = popupData.id
        console.log(data, 'data')
        popupData.process({ id, data })
        setName('')
        setDesc('')
        closePopup()
    }

    const handleCancel = () => {
        popupData.name = ''
        popupData.description = ''
        closePopup()
    }
    return (
        <AlertDialog open={isOpen}>
        <AlertDialogContent className="w-[320px] bg-[#334155] border-2 border-[#fdba74] rounded-lg">
            {popupData.type === 'editPlan' && <EditPlanPopup name={name} description={desc} setName={setName} setDescription={setDesc} />}
            {popupData.type === 'editRoutine' && <EditRoutinePopup name={name} description={desc} setName={setName} setDescription={setDesc} />}
            <AlertDialogFooter className="w-full flex flex-row justify-ceter items-center gap-x-1">
                <AlertDialogCancel className="text-black w-1/2 m-0 p-0" onClick={handleCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="w-1/2 m-0 p-0" onClick={handleProcess}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
export default EditPopupComponent