"use client"
import TooltipComponent from "@/components/Tooltip/Tooltip"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import back from "@/assets/arrow_left_black.svg"
import add from "@/assets/add_white.svg"
import cookieIcon from "@/assets/cookie.svg"

type PlanHeaderProps = {
    plan: any
}

type PlanOverviewProps = {
    plan: any;
}

type PlanRoutinesProps = {
    plan: any;
}

type PlanDailyActivityItemsProps = {
    plan: any
}

const PlanHeader:React.FC<PlanHeaderProps> = ({
    plan
}) => {
    return (
        <div className="relative w-full flex justify-between items-center p-1 mb-4">
            <Skeleton className="w-full h-[120px] bg-[#cbd5e1] rounded-md" />
            <Link href="/plans" className="absolute top-0 right-2 border-2  bg-[#0ea5e9] rounded-md text-gray-800 flex justify-start items-center gap-x-1">
                <Image src={back} alt="back" className="w-5 h-4 ml-1"/>
                <p className="text-white font-normal mr-2 mb-[2px]">Back</p>
            </Link>
            <p className="absolute bottom-2 left-5 text-md text-[#0ea5e9] font-medium">{plan.name}</p>
        </div>
    )
}

const PlanOverview:React.FC<PlanOverviewProps> = ({ plan }) => {
    return (
        <div className="w-full grid grid-cols-2 px-1 gap-1 mb-4">
            <div className="flex justify-start items-center border-2 border-[#0ea5e9] h-[60px] rounded-lg">
                <div className="flex flex-col mx-2">
                    <div className="flex items-center gap-x-2">
                        <Image src={cookieIcon} alt="cookie icon" />
                        <span className="text-[#0ea5e9] text-lg font-medium">80</span>
                    </div>
                    <p className="text-sm text-[#C0C0C0] ml-8 line-clamp-1">Day Streak</p>
                </div>
            </div>
            <div className="flex justify-start items-center border-2 border-[#0ea5e9] h-[60px] rounded-lg">
                <div className="flex flex-col mx-2">
                    <div className="flex items-center gap-x-2">
                        <Image src={cookieIcon} alt="cookie icon" />
                        <span className="text-[#0ea5e9] text-lg font-medium">80</span>
                    </div>
                    <p className="text-sm text-[#C0C0C0] ml-8 line-clamp-1">Total Routines</p>
                </div>
            </div>
            <div className="flex justify-start items-center border-2 border-[#0ea5e9] h-[60px] rounded-lg">
                <div className="flex flex-col mx-2">
                    <div className="flex items-center gap-x-2">
                        <Image src={cookieIcon} alt="cookie icon" />
                        <span className="text-[#0ea5e9] text-lg font-medium">80</span>
                    </div>
                    <p className="text-sm text-[#C0C0C0] ml-8 line-clamp-1">Total Items</p>
                </div>
            </div>
            <div className="flex justify-start items-center border-2 border-[#0ea5e9] h-[60px] rounded-lg">
                <div className="flex flex-col mx-2">
                    <div className="flex items-center gap-x-2">
                        <Image src={cookieIcon} alt="cookie icon" />
                        <span className="text-[#0ea5e9] text-lg font-medium">80</span>
                    </div>
                    <p className="text-sm text-[#C0C0C0] ml-8 line-clamp-1">Day Snippets</p>
                </div>
            </div>
        </div>
    )
}

const PlanRoutines:React.FC<PlanRoutinesProps> = ({ plan }) => {
    return (
        <div className="w-full flex flex-col gap-y-2 p-1 mb-4">
            <div className="w-full flex justify-between items-center">
                <p className="text-lg font-medium text-[#0ea5e9]">{plan.name}'s daily routines</p>
                <button className="flex justify-betweeen items-center gap-x-1 bg-[#0ea5e9] px-2 py-[2px] rounded-md">
                    <Image src={add} alt="add" className="w-5 h-5" />
                    <p className="line-clamp-1">Add</p>
                </button>
            </div>
            <div className="cursor-pointer w-full flex flex-col">
                <div className="relative transition duration-300 ease-in-out group hover:border-[#C0C0C0] w-full h-[45px] flex items-center justify-start border-2 border-b-4 border-[#0ea5e9] rounded-md">
                    <p className="transition duration-300 ease-in-out text-md font-medium text-[#0ea5e9] m-2 group-hover:opacity-0">Mock 1</p>
                    <p className="absolute left-1/2 -translate-x-1/2 transition duration-300 ease-in-out text-md font-medium text-[#C0C0C0] m-2 opacity-0 group-hover:opacity-100"> Click for details</p>
                </div>
            </div>

        </div>
    )
}

const PlanDailyActivityItems:React.FC<PlanDailyActivityItemsProps> = ({ plan }) => {
    const colors = ['#f87171', '#bef264', '#86efac', '#0ea5e9', '#22d3ee', '#8b5cf6', '#f43f5e', '#f472b6', '#701a75', '#083344']

    const randomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)]
    }
    return (
        <div className="w-full flex flex-col p-1 gap-y-2 p-1">
            <p className="text-lg font-medium text-[#0ea5e9]">{plan.name}'s daily activity items</p>
            <div className="flex flex-wrap gap-1">
                { Array.from({ length: 10}).map((_, index) => (
                    <Badge key={index} style={{
                        backgroundColor: randomColor()
                    }} className="cursor-pointer h-[30px] line-clamp-1 flex justify-self-stretch items-center justify-center text-md rounded-3xl">
                        <TooltipComponent text={`text - ${ index }`} />
                    </Badge>
                ))}
                <Badge className="cursor-pointer m-[2px] h-[30px] flex justify-between items-center gap-x-1 text-sm rounded-3xl bg-[#0eade9]">
                    <Image src={add} alt="add" className="w-5 h-5" />
                    <p className="mr-1">Add</p>
                </Badge>
            </div>
        </div>
    )
}

const Plan = ({ params }: {
    params: { slug: string}
}) => {
    console.log('params', params.slug)
    const [plan, setPlan] = useState({
        id: 'mock1',
        name: 'Mock 1',
    })
    return (
        <div className="w-full pt-[50px]">
            <PlanHeader plan={plan} />
            <PlanOverview plan={plan} />
            <PlanRoutines plan={plan} />
            <PlanDailyActivityItems plan={plan} />
        </div>
    )
}
export default Plan