"use client"
import Image from 'next/image';
import arrowDownWhite from '../../assets/arrow_down_white.svg';
import { useRef, useState } from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

type TopicsBadgeProps = {
  onToggle: () => void;
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

const TopicsBadge:React.FC<TopicsBadgeProps> = ({ onToggle }) => {

  const [checked, setChecked] = useState<number>(0)
  const [showStatusBar] = useState<Checked>(true)

    return (
      <div className='bg-[#3b82f6] w-[100px] rounded-md'>
            <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <div className='flex justify-between items-center gap-x-2 cursor-pointer px-2 py-1'>
          <span className="font-medium">Topics</span>
          <Image src={arrowDownWhite} alt={'arrow down'} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={checked === 0 && showStatusBar}
          onCheckedChange={() => setChecked(0)}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={ checked === 1 && showStatusBar}
          onCheckedChange={() => setChecked(1)}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={ checked === 2 && showStatusBar}
          onCheckedChange={() => setChecked(2)}
        >
          Panel
        </DropdownMenuCheckboxItem>
        <div onClick={onToggle} >
          <DropdownMenuItem>
            Expend to see all
          </DropdownMenuItem>    
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
      </div>

    );  
}

export default TopicsBadge;