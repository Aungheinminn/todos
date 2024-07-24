import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type BadgeProps = {
    title: string;
    desc: string;
}
const Badge:React.FC<BadgeProps> = ({ title, desc }) => {
    return (
        <Alert className="w-[85%] bg-[#58ed18]">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="line-clamp-1">
                {desc}
            </AlertDescription>
        </Alert>
    )
}
export default Badge