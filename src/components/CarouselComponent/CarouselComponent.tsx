"use client";

import React, { useRef } from "react";

const items = [
  'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs',
  'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs', 'ssfs',
  'ssfs', 'ssfs', 'ssfs', 'ssfs',
];

const CarouselComponent = () => {
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

  return (
    <div className="w-full relative bg-blue-500">
      <button onClick={handlePrev} className="absolute z-10 left-0 bg-red-500">
        back
      </button>
      <button onClick={handleNext} className="absolute z-10 right-0 bg-red-500">
        next
      </button>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className="w-full h-[100px] grid grid-flow-col bg-blue-500 gap-x-2 px-[40px] overflow-x-auto cursor-grab no-scrollbar"
      >
        {items.map((item, index) => (
          <div className="w-full bg-green-500 select-none snap-start" key={index}>
            <p className="w-[100px]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
