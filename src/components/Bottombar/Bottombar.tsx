"use client"
import whiteHouse from '../../assets/white_home.svg'
import whiteCreate from '../../assets/white_create.svg'
import whiteSettings from '../../assets/white_setting.svg'
import whiteRoutines from '../../assets/white_routines.svg'
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';

const Bottombar = () => {
    const [active, setActive] = useState<'home' | 'create' | 'settings' | 'calender' | 'plans'>('create')
    // const activeInterface = " absolute z-[100] border-4 border-gray-800 -translate-y-9 bg-[#4ade80] rounded-full"
    const activeInterface = "bg-[#4ade80] rounded-md"
    const handleChange = (value: 'home' | 'create' | 'settings' | 'plans') => {
        setActive(value)
    }
    console.log(active)
    return (
        // <div className="w-full flex justify-between items-center bg-gray-800 lg:hidden px-2 h-[50px]">
        //     <Link href="/" onClick={() => handleChange('home')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
        //         <div className={`transition-all duration-300 w-[40px] h-[40px] flex justify-center items-center border-4  ${active === 'home' ? activeInterface : 'border-gray-800'}`}>
        //             <Image className="" src={whiteHouse} alt="home"  width={20} height={20} />
        //         </div>
        //         <p className={`transition-all duration-300 hover:text-[#4ade80] ${active === 'home' ? 'opacity-1' : 'absolute opacity-0 top-[20%]'}`}>Home</p>
        //     </Link>
        //     <div onClick={() => handleChange('create')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
        //         <div className={`transition-all duration-300 w-[40px] h-[40px] flex justify-center items-center border-4  ${active === 'create' ? activeInterface : 'border-gray-800'}`}>
        //             <Image className="" src={whiteCreate} alt="create"  width={20} height={20} />
        //         </div>
        //         <p className={`transition-all duration-300 hover:text-[#4ade80] ${active === 'create' ? 'opacity-1' : 'absolute opacity-0 top-[20%]'}`}>Create</p>
        //     </div>             
        //     <Link href="/plans" onClick={() => handleChange('plans')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
        //         <div className={`transition-all duration-300 w-[40px] h-[40px] flex justify-center items-center border-4  ${active === 'plans' ? activeInterface : 'border-gray-800'}`}>
        //             <Image className="" src={whiteRoutines} alt="routines"  width={20} height={20} />
        //         </div>
        //         <p className={`transition-all duration-300 hover:text-[#4ade80] ${active === 'plans' ? 'opacity-1' : 'absolute opacity-0 top-[20%]'}`}>Routines</p>
        //     </Link>  
        //     <Link href="/settings" onClick={() => handleChange('settings')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
        //         <div className={`transition-all duration-300 w-[40px] h-[40px] flex justify-center items-center border-4  ${active === 'settings' ? activeInterface : 'border-gray-800'}`}>
        //             <Image className="" src={whiteSettings} alt="settings"  width={20} height={20} />
        //         </div>
        //         <p className={`transition-all duration-300 hover:text-[#4ade80] ${active === 'settings' ? 'opacity-1' : 'absolute opacity-0 top-[20%]'}`}>Settings</p>
        //     </Link>
     
        // </div>
                <div className="w-full flex justify-between items-center bg-gray-800 lg:hidden px-2 h-[50px]">
            <Link href="/" onClick={() => handleChange('home')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "home" ? activeInterface : "" }`}>
                    <Image className="" src={whiteHouse} alt="home"  width={20} height={20} />
                </div>
            </Link>
            <div onClick={() => handleChange('create')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "create" ? activeInterface : "" }`}>
                    <Image className="" src={whiteCreate} alt="create"  width={20} height={20} />
                </div>
            </div>             
            <Link href="/plans" onClick={() => handleChange('plans')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "plans" ? activeInterface : "" }`}>
                    <Image className="" src={whiteRoutines} alt="routines"  width={20} height={20} />
                </div>
            </Link>  
            <Link href="/settings" onClick={() => handleChange('settings')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "settings" ? activeInterface : "" }`}>
                    <Image className="" src={whiteSettings} alt="settings"  width={20} height={20} />
                </div>
            </Link>
     
        </div>
    );
}

export default Bottombar;