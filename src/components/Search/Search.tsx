'use client'
import Image from "next/image";
import blackSearch from '@/assets/black_search.svg'
import blackExpand from '@/assets/black_expand.svg'
import { useState } from "react";
type SearchProps = {
    search: string;
    onChange: (searchKey: string) => void;
    type: 'normal' | 'animated';
    onAnimate?: (animate: boolean) => void;
}

const Search:React.FC<SearchProps> = ({ search, onChange, type, onAnimate }) => {
    const [animate, setAnimate] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    const handleAnimate = () => {
        setAnimate(!animate)
        console.log('ani from search',animate)
        if(type === 'animated' && onAnimate){
            onAnimate(animate)
        }
    }
    const handleSearch = () => {
        onChange(search)
    }
    return (
    <>
        {type === 'animated' && (
            <div className={`transition-all  cursor-pointer p-1 px-2 border-2 border-gray-800 rounded-lg h-[40px] flex items-center ${animate === true ? 'justify-between scale-x-100 w-full' : 'justify-center scale-x-90'} origin-right`}>
                <input className={`transition-all w-[90%] outline-none text-black ${animate === true ? 'block' : 'hidden'}`} placeholder="Search by name" value={search} onChange={handleChange} />
                <div className="" onClick={handleAnimate}>
                    <Image className="z-[100]" src={blackSearch} alt="search" width={20} height={20} />
                </div>
            </div>
        )}
       {type === 'normal' && (
            <div className="relative cursor-pointer p-1 px-2 border-2 border-gray-800 rounded-lg h-[40px] flex items-center justify-between w-full">
                <input className="w-[90%] outline-none text-black" placeholder="Search by name" value={search} onChange={handleChange} />
                <Image src={blackSearch} alt="search" width={20} height={20} onClick={() => handleSearch} />
            </div>
        )} 
    </>
    )
}
export default Search