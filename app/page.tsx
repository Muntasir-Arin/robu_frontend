import About from "@/components/about";
import Banner from "@/components/banner";
import { HeroCarousel } from "@/components/carousel";
import { Credit } from "@/components/credit";
import Contact from "@/components/footer";
import NavBar from "@/components/main-nav";
import Panel from "@/components/panel";
import { ModeToggle } from "@/components/theme-mode";
import { Suspense } from "react";
export default function Home() {
  return (
    <div>

      <Banner />
      <NavBar />
      

      

      <div className="relative z-[-999rem] top-0 h-dvh ">
      <Suspense fallback={<div className="w-full h-dvh"></div>}>
      <video autoPlay muted loop className="w-full h-dvh object-cover hidden dark:block">
        <source src="/bg.webm" type="video/webm" />
      </video>
      </Suspense>
      <div className="absolute inset-0 flex  justify-center">
      <div className=" w-screen mt-20 lg:mt-28">
      
        {/* <div>
        <p className="text-center text-[2.5rem] sm:text-4xl lg:text-5xl font-black uppercase text-white">
          Transforming Tomorrow
        </p>
        <p className="uppercase text-center font-black text-transparent text-[2rem] sm:text-5xl lg:text-7xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          One Bot at a Time
        </p>
        </div> */}
        <HeroCarousel/>
      </div>
      </div>
    </div>

      

      <About/>
      <Panel/>
      <Contact/>
      

      <ModeToggle />
      {/* <Credit /> */}
    </div>
  );
}
