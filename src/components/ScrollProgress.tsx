
import { useState, useEffect } from "react";

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setScrollProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div 
      className="progress-bar" 
      style={{ width: `${scrollProgress}%` }}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};
