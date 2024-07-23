import Image from "next/image"
import remove from '@/assets/remove.svg'

type CardProps = {
    onFollow: (id: string) => void;
    onRemove: (id: string) => void;
}
const Card:React.FC<CardProps> = ({ onFollow, onRemove }) => {
    const handleFollow = () => {
        onFollow('asd')
    }
    const handleRemove = () => {
        onRemove('asdf')
    }
    return (
        <div className="w-full flex flex-col justify-center items-center border border-[#E4E5E6] relative">
            <Image onClick={() => onRemove} src={remove} alt="remove" className="absolute rotate-45 top-0 right-0" />
            <div className="rounded-full w-[50px] h-[50px] bg-blue-500"></div>
            <h1 className="font-bold line-clamp-1">Name</h1>
            <button className="w-full bg-blue-500 text-white font-medium" onClick={() => handleFollow}>Follow</button>
        </div>
    )
}

export default Card