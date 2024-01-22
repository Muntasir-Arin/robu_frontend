"use client"
import Image from 'next/image'
import { motion } from "framer-motion"

export default function About() {
  return (
    <div id="about" className='scroll-mt-[3rem] xl:scroll-mt-[2rem]'>
    <motion.div  className=" relative isolate overflow-hidden  px-6 py-[4rem] sm:py-32 lg:overflow-visible lg:px-0" initial={{ y: +100, opacity: 0 }}
    animate={{ y: 0,  opacity: 1 }}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className=" absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(64rem_64rem_at_top,transparent,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-900">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
            
              <h1 className="mt-6 text-3xl font-bold tracking-tight  sm:text-4xl uppercase ">About Robu</h1>
              <p className="mt-6 text-xl leading-8 ">
              &quot;Achieve your imagination through your robot&quot; is the vision of ROBOTICS CLUB Of BRAC University [ROBU]. We want to improve the knowledge of the students about the work on robot around the world. We in addition will strive to find extraordinary talents on the field of Robotics and Intelligence and make them valuable assets of our university.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 mt-5 p-12 lg:sticky lg:top-14 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="w-[48rem] max-w-none rounded-xl  shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="/about.jpg"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7  lg:max-w-lg">
              <h2 className="uppercase text-2xl font-bold tracking-tight ">Objective</h2>
              <p className="text-lg mt-4">
          The Robotics Undergraduate Club (ROBU) at BRAC University empowers
          students to explore the captivating realm of robotics. We provide
          hands-on experiences in designing, constructing, and operating
          cutting-edge robots with applications in various fields.
        </p>
        <p className="text-lg mt-4">
          ROBU fosters a collaborative environment where creative minds converge
          to solve complex challenges through ingenious robotic solutions. Our
          members gain the skills and resources necessary to shape the future of
          robotics in domestic, commercial, and military domains.
        </p>
        <p className="text-lg mt-4">
          ROBU fosters a collaborative environment where creative minds converge
          to solve complex challenges through ingenious robotic solutions. Our
          members gain the skills and resources necessary to shape the future of
          robotics in domestic, commercial, and military domains.
        </p>
        <p className="text-lg mt-4">
          Through workshops, seminars, and practical projects, we ignite curiosity
          and innovation. We envision a future where ethical robotics advancements
          positively impact society. Join ROBU to be part of this exciting journey!
        </p>
        <p className="text-lg mt-4">
          Through workshops, seminars, and practical projects, we ignite curiosity
          and innovation. We envision a future where ethical robotics advancements
          positively impact society. Join ROBU to be part of this exciting journey!
        </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  )
}