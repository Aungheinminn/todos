import Image from "next/image"
import noTopic from '@/assets/no_topic_found.svg'

const NoTopic = () => {
    return (
        <div className="text-black w-full min-h-screen flex justify-center items-center flex-col">
            <Image src={noTopic} alt={""} width={300} height={300} />
            <h1 className="text-[#fbbf24] text-lg font-bold">No Topics are found</h1>
            <p className="text-[#22c55e] font-medium">Try Creating and Getting Started</p>
            <p className="text-[#22c55e] font-medium">On Your Amazing Streaks</p>
        </div>
    )
}
export default NoTopic