"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import TopicCard from "../TopicCard/TopicCard";
import { CommandDialog } from "cmdk";
import { useState } from "react";

type TopicCommandProps = {
    toggle: boolean;
    onToggle: () => void;
}   
const TopicsCommand: React.FC<TopicCommandProps> = ({ toggle, onToggle }) => {

    return (
      <Command className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rounded-lg border shadow-md w-[310px] h-[320px] bg-gray-800 ${toggle === true ? 'absolute' : 'hidden'}`}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Topics">
            <CommandItem className="bg-[#94a3b8] mb-1">
              <TopicCard />
            </CommandItem>
            <CommandItem>
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
}
export default TopicsCommand