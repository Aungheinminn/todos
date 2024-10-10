import { Skeleton } from "../ui/skeleton"

const MutateLoading = ({ loadingItemHeight, marginTop }: {
    loadingItemHeight: string;
    marginTop: string
}) => {
    return (
        <div 
            style={{
                marginTop: marginTop
            }} 
            className="w-full h-full grid grid-cols-1 gap-y-2 px-1"
        >
            <Skeleton style={{
                height: loadingItemHeight
            }} className={`w-full bg-[#CBD5E1]`} />
            <Skeleton style={{
                height: loadingItemHeight
            }} className={`w-full bg-[#CBD5E1]`} />
            <Skeleton style={{
                height: loadingItemHeight
            }} className={`w-full bg-[#CBD5E1]`} />
        </div>
    )
}

export default MutateLoading;