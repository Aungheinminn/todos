"use client"
import CardComponent from "@/components/CardComponent/CardComponent"
import Loading from "@/components/Loading/Loading"
import PopupComponent from "@/components/CreatePopup/CreatePopup"
import Search from "@/components/Search/Search"
import { deletePlan, editPlanById, getPlansByUser, postPlans } from "@/lib/plan.service"
import { getCurrentUser } from "@/lib/users.service"
import { useCurrentUserStore } from "@/lib/userStore"
import Link from "next/link"
import { Suspense, useState } from "react"
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import PlansLoading from "./loading"
import { useCreatePopupStore } from "@/lib/popupStore"
import { Button } from "@/components/ui/button"
import NotFound from "@/components/NotFound/NotFound"
import { PlanType } from "@/lib/types/plan.type"


type PlansHeaderProps = {
    search: string;
    onChange: (searchKey: string) => void;
    onCreate: (data: any) => void;
}

type PlansBodyProps = {
    plans: PlanType[];
    onEdit: ({ id, data}: {
        id: string,
        data: PlanType
    }) => void;
    onDelete: (id: string) => void;
}

const useMutationsHook = () => {
    const queryClient = useQueryClient()

     const createMutation = useMutation({
        mutationFn: postPlans,
        onMutate: async (data: PlanType) => {
            await queryClient.cancelQueries('plans')

            const previousPlans = queryClient.getQueryData('plans')

            queryClient.setQueryData('plans', (old: any) => old ? [data, ...old] : [])

            return { previousPlans }
        },
        onError: (error, variables, context: any) => {
            queryClient.setQueryData('plans', context.previousPlans)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: 'plans' })
    })

    const deleteMutation = useMutation({
        mutationFn: deletePlan,
        onMutate: async (data: string) => {
            await queryClient.cancelQueries('plans')

            const previousPlans = queryClient.getQueryData('plans')

            queryClient.setQueryData('plans', (old: any) => old ? old.filter((o: any) => o._id === data) : [])

            return { previousPlans }
        },
        onError: (error, variables, context: any) => {
            queryClient.setQueryData('plans', context.previousPlans)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: 'plans' })
    })

    const editMutation = useMutation({
        mutationFn: editPlanById,
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries('plans')

            const previousPlans = queryClient.getQueryData('plans')

            queryClient.setQueryData('plans', (old: any) => old ? [data, ...old] : [])

            return { previousPlans }
        },
        onError: (error, variables, context: any) => {
            queryClient.setQueryData('plans', context.previousPlans)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: 'plans' })
    })

    return {
        createMutation,
        deleteMutation,
        editMutation
    }
}

const PlansHeader:React.FC<PlansHeaderProps> = ({ search, onChange, onCreate}) => {
    const { openPopup, popupData } = useCreatePopupStore(state => state)

    const handleAddPlan = () => {
        popupData.name = ''
        popupData.type = 'createPlan'
        popupData.process = onCreate
        openPopup()
    }

    return (
            <div className="w-full flex justify-between items-center gap-x-2 px-1 my-2">
                <Search search={search} onChange={onChange}  type="normal" />             
                <Button className="bg-[#0ea5e9]" onClick={handleAddPlan}>Add a plan</Button>
            </div>
    )
}

const PlansBody:React.FC<PlansBodyProps> = ({ plans, onEdit, onDelete }) => {
    if(plans && plans.length === 0) {
        return <NotFound context="No Plan is found!" />
    }
    return (
        <div className="grid grid-cols-1 gap-2 mb-[55px] px-1 overflow-auto">
            {plans.map((plan, index) => (
                <Link href={`/plans/${plan._id}`} key={index}>
                    <CardComponent key={index} onEdit={onEdit} plan={plan} onDelete={onDelete} />
                </Link>
            ))}
        </div>
    )
}

const Plans = () => {
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state => state)
    const { createMutation, deleteMutation, editMutation } = useMutationsHook()

    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
        }
    })

    const [searchText, setSearchText] = useState<string>('')

    
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
            description: data.description,
            user_id: currentUser?._id ?? ''
        }

        try {
            createMutation.mutate(planData);
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    }

    const handleDeletePlan = async (id: string) => {
        try {
            deleteMutation.mutate(id)
        } catch (error) {
            console.error('Error deleting plan', error)
        }
    }

    const handleEditPlan = async ({id, data}: {
        id: string,
        data: PlanType
    }) => {
        try {
            editMutation.mutate({ id, data })
        }  catch (error) {
            console.error('Error editing plan', error)
        }
    }


    console.log('currentUser', currentUser)

    if(!currentUser || !plans || isPlansLoading) {
        return <Loading />
    }

    return (
        <Suspense fallback={<PlansLoading />}>
            <div className="w-full flex flex-col gap-y-3 pt-[50px]">
                <PlansHeader search={searchText} onChange={handleChange} onCreate={handleCreatePlan} />
                <PlansBody plans={plans} onEdit={handleEditPlan} onDelete={handleDeletePlan} />
            </div>
        </Suspense>
    )
}

export default Plans
