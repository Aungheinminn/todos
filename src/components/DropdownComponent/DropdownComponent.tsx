"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DropdownComponentProps = {
    title: string;
    items: any;
    onSelectItem: (value: string) => void;
}

const DropdownComponent:React.FC<DropdownComponentProps> = ({ title, items, onSelectItem }) => {
  const [label, setLabel] = React.useState<string>(title)
  
  const handleSelect = (value: string) => {
    setLabel(value)
    onSelectItem(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-[#0ea5e9] hover:text-[#0ea5e9]">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[270px]">
            {items.map((item: any, index: number) => (
                <DropdownMenuCheckboxItem
                    checked={label === item}
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="cursor-pointer w-full flex items-center text-[#0ea5e9] font-medium hover:bg-[#0ea5e9] hover:text-white"
                >
                  <p className="mb-1">
                    {item}
                  </p>
                </DropdownMenuCheckboxItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownComponent