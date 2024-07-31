 import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useState } from "react"
import { useRouter } from 'next/navigation'



type SelectComponentProps = {
    defaultValue: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ defaultValue }) => {    
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState(defaultValue)

    return (
        <Select 
            value={selectedOption}
            onValueChange={(value) => {
                setSelectedOption(value)
                router.push(`/plans/${value}`)
            }}
        >
            <SelectTrigger className="w-[180px] border-2 border-gray-800 text-black">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="activePlans">Active Plans</SelectItem>
                    <SelectItem value="routines">Routines</SelectItem>                    
                    <SelectItem value="workouts">Workouts</SelectItem>
                    <SelectItem value="activitySnippets">Activity Snippets</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default SelectComponent;