"use client"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import back from "@/assets/arrow_left_black.svg"
import cookieIcon from "@/assets/cookie.svg"
import { useCurrentUserStore } from "@/lib/userStore"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getPlanById, getPlansByUser } from "@/lib/plan.service"
import { createRoutine, getRoutinesByPlanId } from "@/lib/routines.service"
import { RoutineType } from "@/lib/types/routine.type"
import { getCurrentUser } from "@/lib/users.service"
import Loading from "@/components/Loading/Loading"
import PlanLoading from "./loading"
import { useCreatePopupStore, usePopupStore } from "@/lib/popupStore"
import NotFound from "@/components/NotFound/NotFound"

type PlanHeaderProps = {
    plan: any,
    isPlanLoading: boolean
}

type PlanOverviewProps = {
    plan: any;
}

type PlanItemsProps = {
    routines: RoutineType[];
    onCreate: (data: any) => void;
}

const PlanHeader:React.FC<PlanHeaderProps> = ({
    plan,
    isPlanLoading
}) => {
    if(isPlanLoading) {
        return <Skeleton className="w-full h-[120px] bg-[#cbd5e1] rounded-md" />
    }

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
                    <p className="text-sm text-[#C0C0C0] ml-8 line-clamp-1">Total Snippets</p>
                </div>
            </div>
        </div>
    )
}

const PlanItems:React.FC<PlanItemsProps> = ({ routines }) => {
    const { openPopup, popupData } = usePopupStore()
    const handleOpenDetailPopup = (routine: RoutineType) => {
        popupData.title = 'Routine Details'
        popupData.name = routine.name
        openPopup()
    }
    return (
        <div className="w-full flex flex-col gap-y-2 p-1 mb-4">
            <div className="w-full flex justify-between items-center">
                <p className="text-lg font-medium text-[#0ea5e9]">Related Items</p>
            </div>
            { routines && routines.length === 0 ? 
                <NotFound context="No Item is found!" /> :
                <div className="cursor-pointer w-full flex flex-col gap-y-1">
                    {
                        routines && routines.map((routine) => (
                            <div key={routine._id} onClick={() => handleOpenDetailPopup(routine)} className="relative transition duration-300 ease-in-out group hover:border-[#C0C0C0] w-full h-[45px] flex items-center justify-start border-2 border-b-4 border-[#0ea5e9] rounded-md">
                                <p className="w-[120px] truncate transition duration-300 ease-in-out text-md font-medium text-[#0ea5e9] m-2 group-hover:opacity-0">{routine.name}</p>
                                <p className="absolute left-1/2 -translate-x-1/2 transition duration-300 ease-in-out text-md font-medium text-[#C0C0C0] m-2 opacity-0 group-hover:opacity-100"> Click for details</p>
                            </div>
                        ))
                    }
                </div> 
            }

        </div>
    )
}

const Plan = ({ params }: {
    params: { slug: string}
}) => {
    const { slug } = params

    const { currentUser, updateCurrentUser } = useCurrentUserStore(state=> state)
    
    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
            console.log('data', data)
        }
    })

    console.log('currentUser', currentUser)   

    const queryClient = useQueryClient()


    const { data: plan, isLoading: isPlanLoading } = useQuery({
        queryKey: ['plan', slug],
        queryFn: () => getPlanById(slug),
        enabled: !!currentUser
    })

    console.log('plan', plan)

    const { data: routines, isLoading: isRoutinesLoading } = useQuery({
        queryKey: ['routines', plan?._id],
        queryFn: () => getRoutinesByPlanId(plan?._id, ""),
        enabled: !!plan
    })

    console.log('routines', routines)

    const routineMutation = useMutation({
        mutationFn: createRoutine,
        onMutate: async (data: RoutineType) => {
            await queryClient.cancelQueries('routines')
            const previousData = queryClient.getQueryData('routines')
            queryClient.setQueryData(['routines'], (old: any) => old ? [...old, data] : [])

            return { previousData }
        },
        onSettled: () => queryClient.invalidateQueries('routines')
    })

    const handleCreateRoutine = async (data: RoutineType) => { 
        console.log('data', data)
        const routineData = {
            name: data.name,
            description: data.description,
            plan_id: plan._id,
            user_id: currentUser?._id ?? ''
        }
        try {
            routineMutation.mutate(routineData)
        } catch (error) {
            console.error('Error creating routine:', error)
        }
    }
    
    if (!currentUser || !plan || isPlanLoading || isRoutinesLoading) {
        return <Loading />
    }

    return (

                // <PlanOverview plan={plan} />
        <Suspense fallback={<PlanLoading />}>
            <div className="w-full pt-[60px]">
                <PlanHeader plan={plan} isPlanLoading={isPlanLoading} />
                <PlanItems routines={routines} onCreate={handleCreateRoutine} />
            </div>
        </Suspense>
    )
}
export default Plan
