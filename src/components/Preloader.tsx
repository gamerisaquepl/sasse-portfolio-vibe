
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background flex flex-col items-center justify-center transition-all duration-700",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative w-24 h-24 mb-4">
        <svg
          className="animate-spin-slow absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="8"
          />
          <path
            d="M50 5 A45 45 0 0 1 95 50"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gradient">
          ILS
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground animate-pulse">
        Carregando...
      </p>
    </div>
  );
};
