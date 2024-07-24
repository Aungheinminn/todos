"use client"
import Card from "@/components/Card/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserStore } from "@/lib/userStore";

const Settings = () => {
    const { currentUser } = useCurrentUserStore(state => state)
    const onFollow = () => {
        console.log('blah')
    }
    return (
        <div className="text-black w-full flex flex-col gap-y-2">
            <Skeleton className="w-full h-[150px] bg-gray-500 rounded-none" />
            <p className="text-2xl font-bold">{currentUser?.username}</p>
            <p className="text-lg font-normal">{currentUser?.email}</p>

            <h1>Streak</h1>
            {/* <Card onFollow={onFollow} /> */}
            
        </div>
    );
}
export default Settings