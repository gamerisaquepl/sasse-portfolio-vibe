
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme based on user preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  // Update theme when state changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="icon" 
      className="rounded-full w-10 h-10 transition-transform hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 transition-all" />
      ) : (
        <Sun className="h-5 w-5 transition-all" />
      )}
    </Button>
  );
};
