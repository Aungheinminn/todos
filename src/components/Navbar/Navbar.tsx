import TopicsBadge from "../TopicsBadge/TopicsBadge"
type MobileNavbarProps = {
    onToggle: () => void;
}

export const MobileNavbar:React.FC<MobileNavbarProps> = ({ onToggle }) => {
    return (
        <div className="w-full bg-gray-800 flex justify-between items-center lg:hidden px-8 py-3">
            <h1 className="">Logo</h1>
            <TopicsBadge onToggle={onToggle} />
        </div>
    )
}

export const WebNavbar = () => {
    return (
        <div className="w-full flex justify-between items-center hidden lg:flex">
            <h1>Logo</h1>
            <div>
                <p></p>
            </div>
        </div>
    )
}