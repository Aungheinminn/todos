import Image from "next/image"
import notFound from "@/assets/lens.svg"

const NotFound = ({ context }: {
    context: string
}) => {
    return (
        <div className="w-full flex justify-center items-center py-8"> 
            <div className="flex justify-center items-center flex-col gap-y-3 ">
                <Image width={70} height={70} src={notFound} alt="not found icon" />
                <p className="text-gray-500 text-lg">{context}</p>
            </div>
        </div>
    )
}
export default NotFound