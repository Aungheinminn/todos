type ItemCardComponentProps = {
    name: string;
    description?: string;
}

const ItemCardComponent:React.FC<ItemCardComponentProps> = ({ name, description }) => {
    return (
        <div className="p-2 px-4 pb-10 w-full h-[100px] flex flex-col items-start justify-start bg-[#fae8ff] gap-y-1 border-2 border-[#0ea5e9] rounded-xl cursor-pointer ">
            <p className="w-4/5 text-base text-[#0ea5e9] font-medium truncate">{name}</p>
            <span className="w-3/6 text-[#78717C] font-normal truncate">{description}</span>
        </div>
    )
}

export default ItemCardComponent