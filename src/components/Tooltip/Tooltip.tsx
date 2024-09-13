import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TooltipComponent = ({ text }: {
    text: string
}) => {
    return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <p className="text-lg font-medium text-[#0ea5e9] line-clamp-1">{text}</p>
            </TooltipTrigger>
            <TooltipContent className="bg-[#334155] text-white font-normal border-0">
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
export default TooltipComponent