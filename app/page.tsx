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
      <div className="absolute top-0 h-dvh -z-50 overflow-hidden">
        <Suspense fallback={<div className="w-full h-dvh"></div>}>
          <video
            autoPlay
            muted
            loop
            className="h-full lg:h-auto lg:w-full object-cover hidden dark:block"
          >
            <source src="/bg.webm" type="video/webm" />
          </video>
        </Suspense>
      </div>
      <Banner />
      <NavBar />

      <div className="h-dvh">
        <HeroCarousel />
      </div>
      <About />
      <Panel />
      <Contact />

      <ModeToggle />
      {/* <Credit /> */}
    </div>
  );
}
