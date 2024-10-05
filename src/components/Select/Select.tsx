 import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { SetStateAction, useState } from "react"
import { PlanType } from "@/lib/types/plan.type";



type SelectComponentProps = {
    selected: string;
    setSelected: React.Dispatch<SetStateAction<string>>;
    dropdownItems: PlanType[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({ selected, setSelected, dropdownItems }) => {    

    return (
        <Select 
            value={selected}
            onValueChange={(value) => {
                setSelected(value)
            }}
        >
            <SelectTrigger className="w-full border-2 border-gray-800 text-black">
                <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    { dropdownItems.map(item => <SelectItem className="cursor-pointer hover:bg-[#fae8ff]" key={item._id} value={item._id ?? ''} >{item.name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default SelectComponent;