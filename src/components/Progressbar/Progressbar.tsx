'use client'
import { useState } from "react"
import flame from "@/assets/flame.svg"
import grayFlame from "@/assets/gray_flame.svg"
import star from "@/assets/star.svg"
import Image from "next/image"

const Progressbar = () => {
    const [progress, setProgress] = useState(0)
    
    const handleProgress = () => {
        if(progress >= 100) {
            setProgress(0)
        } else {
            setProgress(progress + 14.29)
        }
    }
    
    return (
        <div className="w-full">
            <button onClick={handleProgress}>Click me</button>
            <div className="relative w-[100%] bg-gray-500 border-2 border-[#fc9d04] rounded-md">
                {/* <div className="relative">
                    <Image 
                        src={grayFlame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[12%] z-[100] ${progress < 20 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    <Image 
                        src={flame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[12%] z-[100] ${progress >= 20 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div>
                <div className="relative">
                    <Image 
                        src={grayFlame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[32%] z-[100] ${progress < 40 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    <Image 
                        src={flame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[32%] z-[100] ${progress >= 40 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div>
                <div className="relative">
                    <Image 
                        src={grayFlame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[52%] z-[100] ${progress < 60 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    <Image 
                        src={flame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[52%] z-[100] ${progress >= 60 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div>
                <div className="relative">
                    <Image 
                        src={grayFlame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[72%] z-[100] ${progress < 80 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    <Image 
                        src={flame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[72%] z-[100] ${progress >= 80 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div> */}
                <div className="relative">
                    <Image 
                        src={grayFlame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[92%] z-[100] ${progress < 100 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    <Image 
                        src={flame} 
                        alt="Flame" 
                        width={50}
                        height={50}
                        className={`transition-all duration-1000 ease-in-out absolute top-1/2 -translate-y-[55%] left-[92%] z-[100] ${progress >= 100 ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div>
                
                <div 
                    className={`relative transition-all duration-500 ease-in-out h-[10px] bg-[#FFDF00] rounded-md after:absolute `} 
                    style={{ width: `${progress}%` }}
                >
                    <div
                        style={{
                            transition: 'all .3s ease-in-out',
                            position: 'absolute',
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'white',
                            border: '2px solid #fc9d04',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            right: '-25px',
                            borderRadius: '50%',
                            display:'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: progress >= 100 ? 0 : 100
                        }}
                    >
                        <Image src={star}
                            alt="Star"
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progressbar