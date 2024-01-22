import About from "@/components/about";
import Banner from "@/components/banner";
import { Credit } from "@/components/credit";
import Contact from "@/components/footer";
import NavBar from "@/components/main-nav";
import Panel from "@/components/panel";
import { ModeToggle } from "@/components/theme-mode";
export default function Home() {
  return (
    <div>
      <Banner />
      <NavBar />
      <div className="pt-10 mt-52">
        <p className="text-center text-[2.5rem] sm:text-4xl lg:text-5xl font-black uppercase">
          Transforming Tomorrow
        </p>
        <p className="uppercase text-center font-black text-transparent text-[2rem] sm:text-5xl lg:text-7xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          One Bot at a Time
        </p>
      </div>

      <About/>
      <Panel/>
      <Contact/>
      

      <ModeToggle />
      {/* <Credit /> */}
    </div>
  );
}
