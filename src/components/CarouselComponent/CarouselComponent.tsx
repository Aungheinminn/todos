"use client";

import Image from "next/image";
import React, { SetStateAction, useRef } from "react";
import right from "@/assets/right.svg";
import left from "@/assets/left.svg";
import { PlanType } from "@/lib/types/plan.type";

// const items = [
//   'ssfsfsdfsd', 'ssasdfsdafasdfsdfasfasfdsafsadffs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs',
//   'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs',
//   'ssfs', 'ssfs', 'ssfs', 'ssfs',
// ];

const CarouselComponent = ({ currentPlan, setCurrentPlan, items }: {
  currentPlan: string;
  setCurrentPlan: React.Dispatch<SetStateAction<string>>;
  items: PlanType[]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;

    containerRef.current.style.scrollSnapType = "none";

    startX.current = e.pageX ;
    scrollLeft.current = containerRef.current.scrollLeft;

    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.scrollBehavior = "auto";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if(!isDragging.current) return

    requestAnimationFrame(() => {
      if(!containerRef.current) return
      containerRef.current.scrollLeft = scrollLeft.current - (e.pageX - startX.current)
    });
  };

  const onMouseUp = () => {
    isDragging.current = false;

    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "x mandatory";
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.scrollBehavior = "smooth";
    }
  };

  const onMouseLeave = () => {
    isDragging.current = false;

        if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "x mandatory";
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.scrollBehavior = "smooth";
    }
  }

  // Buttons for manual navigation
  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 150;
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 150;
    }
  };

  if(items.length === 0) {
    return <div className="w-full text-center">no items</div>
  }

  return (
    <div className="w-full flex justify-between items-center gap-x-1 p-1 pb-2">
      <button onClick={handlePrev} className="w-[30px] h-[28px] flex justify-center items-center bg-[#C0C0C0] rounded-full p-1">
        <Image src={left} className="ml-1" alt="left" />
      </button>
 
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="w-full flex justify-start items-center gap-x-2 overflow-x-auto cursor-grab no-scrollbar rounded-lg"
      >
        <div onClick={() => setCurrentPlan('all')} className={`transition duration-500 max-w-[100px] flex justify-center items-center leading-1 hover:bg-gray-800 select-none snap-start rounded-lg p-1 px-2 cursor-pointer ${currentPlan === 'all' ? "bg-gray-800" : "bg-gray-500"}`}>
          <p className="w-full h-full text-center truncate">All</p>
        </div>
        {items && items.map((item, index) => (
          <div onClick={() => !isDragging.current ? setCurrentPlan(item._id ?? '') : null} className={`transition duration-500 max-w-[100px] flex justify-center items-center leading-1 hover:bg-gray-800 select-none snap-start rounded-lg p-1 px-2 cursor-pointer ${currentPlan === item._id ? "bg-gray-800" : "bg-gray-500"}`} key={index}>
            <p className="w-full h-full text-center truncate">{item.name}</p>
          </div>
        ))}
      </div>    
      <button onClick={handleNext} className="w-[30px] h-[28px] flex justify-center items-center bg-[#C0C0C0] rounded-full p-1">
        <Image src={right} className="mr-1" alt="right" />
      </button> 
    </div>
  );
};

export default CarouselComponent;
