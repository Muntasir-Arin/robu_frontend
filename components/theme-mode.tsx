"use client"
 
import { useTheme } from "next-themes"
import { BsMoon, BsSun } from "react-icons/bs";

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
            <button 
                className=" duration-1000 z-[49] fixed bottom-5 right-10 bg-accent w-[3rem] h-[3rem] opacity-90 backdrop-blur-[0.5rem] border border-border border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all"
                onClick={toggleTheme}
            >
                {theme === "light" ? <BsMoon/> : <BsSun/>}
            </button>
    )
}

interface ModeToggleProps {
    className?: string;
  }
  
  export function ModeToggleCustom({ className }: ModeToggleProps) {
    const { theme, setTheme } = useTheme();
  
    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };
  
    return (
      <button
        className={` bg-accent  opacity-90 backdrop-blur-[0.5rem] border border-border border-opacity-40 shadow-2xl rounded-full flex items-center justify-center transition-all ${className}`}
        onClick={toggleTheme}
      >
        {theme === "light" ? <BsMoon /> : <BsSun />}
      </button>
    );
  }