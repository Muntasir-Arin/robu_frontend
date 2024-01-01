"use client"
 
import { useTheme } from "next-themes"
import { BsMoon, BsSun } from "react-icons/bs";

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <div>
            <button 
                className=" duration-1000 z-[49] fixed bottom-5 right-5 bg-accent w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-border border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all"
                onClick={toggleTheme}
            >
                {theme === "light" ? <BsMoon/> : <BsSun/>}
            </button>
        </div>
    )
}
