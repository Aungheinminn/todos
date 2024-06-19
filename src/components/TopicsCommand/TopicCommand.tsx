import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import Link from "next/link"
type TopicCommandProps = {
    toggle: boolean;
    onToggle: () => void;
}
const TopicsCommand:React.FC<TopicCommandProps> = ({ toggle, onToggle }) => {
    const handleRedirect = () => {
        onToggle()
    }
    return (
        <Command className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rounded-lg border shadow-md w-[300px] h-[320px] bg-gray-800 ${toggle === true ? 'absolute' : 'hidden'}`}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Topics">
                    <CommandItem>Item 0</CommandItem>
                    <CommandItem>Item 1</CommandItem>
                    <CommandItem>Item 2</CommandItem>
                    <CommandItem>Item 3</CommandItem>
                    <CommandItem>Item 4</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="More">
                    <Link href={'/topics'} onClick={handleRedirect}>
                        <CommandItem>Click for more</CommandItem>
                    </Link>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
export default TopicsCommand