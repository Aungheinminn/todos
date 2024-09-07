"use client"
import CardComponent from "@/components/CardComponent/CardComponent"
import Loading from "@/components/Loading/Loading"
import PopupComponent from "@/components/Popup/Popup"
import Search from "@/components/Search/Search"
import { getPlansByUser, postPlans } from "@/lib/plan.service"
import { getCurrentUser } from "@/lib/users.service"
import { useCurrentUserStore } from "@/lib/userStore"
import Link from "next/link"
import { Suspense, useState } from "react"
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import PlansLoading from "./loading"

type Plan = {
    _id?: string;
    name: string;
    user_id: string;
}

type PlansHeaderProps = {
    search: string;
    onChange: (searchKey: string) => void;
    onCreate: (data: any) => void;
}

type PlansBodyProps = {
    plans: Plan[];
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
        <div className="grid grid-cols-1 gap-2 mb-[55px] px-1 overflow-auto">
            {plans.map((plan, index) => (
                <Link href={`/plans/${plan._id}`} key={index}>
                    <CardComponent key={index} title={plan.name} />
                </Link>
            ))}
        </div>
    )
}

const Plans = () => {
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state => state)

    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
        }
    })

    const [searchText, setSearchText] = useState<string>('')

    const queryClient = useQueryClient()
    
    const { data: plans, isLoading: isPlansLoading } = useQuery({
        queryKey: ['plans', currentUser?._id],
        queryFn: () => getPlansByUser(currentUser?._id ?? ''),
        enabled: !!currentUser?._id
    })

    console.log('plans', plans)

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleCreatePlan = async (data: any) => {
        const planData = {
            name: data.name,
            user_id: currentUser?._id ?? ''
        }

        try {
            mutate(planData);
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    }

    const { mutate } = useMutation({
        mutationFn: postPlans,
        onMutate: async (data: Plan) => {
            await queryClient.cancelQueries('plans')

            const previousPlans = queryClient.getQueryData('plans')

            queryClient.setQueryData('plans', (old: any) => [data, ...old])

            return { previousPlans }
        },
        onError: (error, variables, context: any) => {
            queryClient.setQueryData('plans', context.previousPlans)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: 'plans' })
    })


    console.log('currentUser', currentUser)

    if(!currentUser || !plans || isPlansLoading) {
        return <Loading />
    }

    return (
        <Suspense fallback={<PlansLoading />}>
            <div className="w-full flex flex-col gap-y-3 pt-[50px]">
                <PlansHeader search={searchText} onChange={handleChange} onCreate={handleCreatePlan} />
                <PlansBody plans={plans} />
            </div>
        </Suspense>
    )
}

export default Plans
