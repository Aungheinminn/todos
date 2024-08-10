"use client"
import CardComponent from "@/components/CardComponent/CardComponent"
import PopupComponent from "@/components/Popup/Popup"
import Search from "@/components/Search/Search"
import Link from "next/link"
import { useState } from "react"

type PlansHeaderProps = {
    search: string;
    onChange: (searchKey: string) => void;
    onCreate: () => void;
}

type PlansBodyProps = {
    plans: any[];
}

const PlansHeader:React.FC<PlansHeaderProps> = ({ search, onChange, onCreate}) => {
    return (
            <div className="w-full flex justify-between items-center gap-x-2 px-1 my-2">
                <Search search={search} onChange={onChange}  type="normal" />             
                <PopupComponent process={onCreate} trigger="Add a plan" type="plan" />
            </div>
    )
}

const PlansBody:React.FC<PlansBodyProps> = ({ plans }) => {
    return (
        <div className="grid grid-cols-1 gap-2 mb-12 px-1 overflow-auto">
            {plans.map((plan, index) => (
                <Link href={`/plans/${plan.id}`} key={index}>
                    <CardComponent key={index} title={plan.name} />
                </Link>
            ))}
        </div>
    )
}

const Plans = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [plans, setPlans] = useState<any[]>([
        {
            id: 'plan1',
            name: 'Plan 1'
        }, 
        {
            id: 'plan2',
            name: 'Plan 2'
        }, 
        {
            id: 'plan3',
            name: 'Plan 3'
        }
    ])

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleCreate = async () => {
    }
    return (
        <div className="w-full flex flex-col gap-y-3 pt-[50px]">
            <PlansHeader search={searchText} onChange={handleChange} onCreate={handleCreate} />
            <PlansBody plans={plans} />
        </div>
    )
}

export default Plans
