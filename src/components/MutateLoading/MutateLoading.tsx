import { Skeleton } from "../ui/skeleton"

const MutateLoading = ({ loadingItemHeight }: {
    loadingItemHeight: string
}) => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-y-2 px-1">
            <Skeleton style={{
                height: loadingItemHeight
            }} className={`w-full bg-[#C0C0C0]`} />
            <Skeleton style={{
                height: loadingItemHeight
            }} className={`w-full bg-[#C0C0C0]`} />
            <Skeleton style={{
                height: loadingItemHeight
            }} className={`w-full bg-[#C0C0C0]`} />
        </div>
    )
}

export default MutateLoading;