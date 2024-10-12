"use client"

import { Suspense, useState } from "react"
import ItemCardComponent from "@/components/ItemCardComponent/ItemCardComponent"
import { Button } from "@/components/ui/button"
import Search from "@/components/Search/Search"
import { getRoutinesByUserId } from "@/lib/routines.service"
import { useQuery } from "react-query"
import { getPlansByUser } from "@/lib/plan.service"
import { useCurrentUserStore } from "@/lib/userStore"
import { getCurrentUser } from "@/lib/users.service"
import Loading from "@/components/Loading/Loading"
import { RoutineType } from "@/lib/types/routine.type"
import { useRoutineMutationHook } from "./routineMutationProvider"
import { useCreatePopupStore } from "@/lib/popupStore"
import { PlanType } from "@/lib/types/plan.type"
import CarouselComponent from "@/components/CarouselComponent/CarouselComponent"
import MutateLoading from "@/components/MutateLoading/MutateLoading"
import NotFound from "@/components/NotFound/NotFound"
import RoutineLoading from "./loading"

type ItemsHeaderProps = {
    plans: PlanType[];
    search: string;
    onChange: (search: string) => void;
    handleAddRoutine: (item: any) => void;
}

type ItemsBodyProps = {
    isRoutinesLoading: boolean;
    isCreateMutating: boolean;
    isDeleteMutating: boolean;
    handleDelete: (data: string) => void;
    routines: RoutineType[];
}

const ItemsHeader:React.FC<ItemsHeaderProps> = ({ plans, search, onChange, handleAddRoutine}) => {
    const { openPopup, popupData } = useCreatePopupStore()
    const handleAdd = () => {
        popupData.name = ''
        popupData.type = 'createRoutine'
        popupData.dropdownItems = plans
        popupData.process = handleAddRoutine

        openPopup();
    }

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center gap-x-2 px-1 my-2">
                <Search search={search} onChange={onChange} type="normal" />             
                <Button className="bg-[#0ea5e9]" onClick={handleAdd}>Add a Routine</Button>
            </div> 
            <CarouselComponent items={plans}  />          
        </div>

    )
}

const ItemsBody:React.FC<ItemsBodyProps> = ({
    isRoutinesLoading, 
    isCreateMutating, 
    isDeleteMutating,
    handleDelete,
    routines 
}) => {    
    if(routines && routines.length === 0) {
        return <NotFound context="No Routine is found!" />
    }

    if(isRoutinesLoading || isCreateMutating || isDeleteMutating){
        return <MutateLoading loadingItemHeight="100px" marginTop="16px" />
    }
    return (
        <div className="w-full mt-4 grid grid-cols-1 px-1 gap-y-2 mb-[55px]">
            {routines && routines.map(routine => 
                <ItemCardComponent 
                    key={routine._id} 
                    routine={routine}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

const Items = () => {
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state=> state)

    const { createMutation, deleteMutation } = useRoutineMutationHook()
    
    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
            console.log('data', data)
        }
    })

    const [searchText, setSearchText] = useState<string>('')

    console.log(searchText)

    const { data: plans, isLoading: isPlansLoading } = useQuery({
        queryKey: ['plans'],
        queryFn: () => getPlansByUser(currentUser?._id ?? '', ''),
        enabled: !!currentUser
    })


    const { data: routines, isLoading: isRoutinesLoading } = useQuery({
        queryKey: ['routines', searchText],
        queryFn: () => getRoutinesByUserId(currentUser?._id ?? '', searchText),
        enabled: !!plans && !!currentUser?._id
    })

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleAddRoutine = async (data: RoutineType) => {
        const item = {
            ...data,
            user_id: currentUser?._id ?? ''
        }
        try {
            createMutation.mutate(item)
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteRoutine = async (data: string) => {
        try{
            deleteMutation.mutate(data)
        } catch (e) {
            console.error(e)
        }
    }

    if(!currentUser || isPlansLoading){
        return <Loading />
    }
    
    return (
        <Suspense fallback={<RoutineLoading />}>
            <div className="pt-[55px] w-full">
                <ItemsHeader 
                    plans={plans} 
                    search={searchText} 
                    onChange={handleChange} 
                    handleAddRoutine={handleAddRoutine} 
                />
                <ItemsBody 
                    isRoutinesLoading={isRoutinesLoading}
                    isCreateMutating={createMutation.isLoading} 
                    isDeleteMutating={deleteMutation.isLoading} 
                    handleDelete={handleDeleteRoutine} 
                    routines={routines} 
                />                
            </div>

        </Suspense>
    )
}

export default Items