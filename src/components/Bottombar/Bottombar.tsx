"use client"
import whiteHouse from '../../assets/white_home.svg'
import whiteCreate from '../../assets/white_create.svg'
import whiteSettings from '../../assets/white_setting.svg'
import whiteRoutines from '../../assets/white_routines.svg'
import item from '../../assets/white_item.svg'
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Bottombar = () => {    
    const path = usePathname()
    const modifiedPath = path.split("/")[1].toString()
    const [active, setActive] = useState(path ? modifiedPath : 'home')
    const activeInterface = "bg-[#0ea5e9] rounded-lg"

    const handleChange = (value: string) => {
        setActive(value)
    }

    return (
        <div className="w-full flex justify-between items-center bg-gray-800 lg:hidden px-2 h-[50px]">
            <Link href="/" onClick={() => handleChange('home')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "home" ? activeInterface : "" }`}>
                    <Image className="" src={whiteHouse} alt="home"  width={20} height={20} />
                </div>
            </Link>
            <Link href="/items" onClick={() => handleChange('item')} className="cursor-pointer w-[80px] relative group flex flex-col items-center">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center ${active === "item" ? activeInterface : "" }`}>
                    <Image className="" src={item} alt="home"  width={20} height={20} />
                </div>
            </Link>
            {/* <div onClick={() => handleChange('create')} className="cursor-pointer w-[50px] relative group flex flex-col items-center bg-[#0ea5e9] rounded-full">
                <div className={`transition-all duration-300 w-[35px] h-[35px] flex justify-center items-center `}>
                    <Image className="" src={whiteCreate} alt="create"  width={20} height={20} />
                </div>
            </div>              */}
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