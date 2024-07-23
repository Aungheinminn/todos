"use client"
import Card from "@/components/Card/Card";

const Settings = () => {
    const onFollow = () => {
        console.log('blah')
    }
    return (
        <div className="text-black w-full">
            <div className="w-full h-[150px] bg-blue-500"></div>
            <h1 className="font-bold">User Name</h1>
            <h1>Streak</h1>
            {/* <Card onFollow={onFollow} /> */}
            
        </div>
    );
}
export default Settings