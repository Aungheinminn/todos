"use client";

import { useEffect, useRef } from "react";

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

  // Handle mouse down event to start dragging
  const onMouseDown = (e) => {
    if (!containerRef.current) return;
    isDragging.current = true;

    // Capture the starting mouse position and current scroll position
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  // Handle mouse move to calculate scroll based on drag
  const onMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    // Calculate how far the mouse has moved
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Speed multiplier for faster scroll

    // Use requestAnimationFrame to ensure smooth updates
    requestAnimationFrame(() => {
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    });
  };

  // Stop dragging when mouse is released
  const onMouseUp = () => {
    isDragging.current = false;
  };

  // Attach event listeners to the container, not the window
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mouseleave', onMouseUp); // Also handle leaving the container

      // Cleanup listeners on unmount
      return () => {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mouseleave', onMouseUp);
      };
    }
  }, []);

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
        className="w-full flex items-center justify-start bg-blue-500 gap-x-2 px-[40px] overflow-x-hidden scroll-smooth"
      >
        {items.map((item, index) => (
          <div className="w-full bg-green-500 select-none" key={index}>
            <p className="w-[100px]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
