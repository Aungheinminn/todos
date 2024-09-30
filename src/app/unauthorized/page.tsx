import { Suspense } from "react"
import UnauthorizedLoading from "./loading"
import Link from "next/link"
import Image from "next/image"
import unauthorized from "@/assets/unauthorized.svg"

const Unauthorized = () => {
    return (
        <Suspense fallback={<UnauthorizedLoading />}>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-[330px] flex flex-col justify-center items-center gap-y-1 bg-[#cbd5e1] border-2 border-yellow-500 rounded-lg py-5 px-2">
                    <Image className="w-[50px] h-[50px] mb-5" src={unauthorized} alt="unauthorized icon" />
                    <p className="text-yellow-500 text-xl fond-medium">
                        Oops!, You are not authorized
                    </p>
                    <Link className="text-blue-400 underline" href={'/login'}>Please Login!</Link>
                </div>
            </div>
        </Suspense>
    )
}

export default Unauthorized