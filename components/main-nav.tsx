'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { motion } from "framer-motion";
import { FaBars } from 'react-icons/fa';
import useAuth from "@/utils/checkauth";


export default function NavBar() {
  const { handleLogout, isLoggedIn, userData } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (


    <div className=" bg-transparent border-white border-opacity-40 md:shadow-none shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sticky top-0 z-10 flex justify-between items-center p-3 lg:p-4 lg:px-20 px-7 lg:pt-8 min-h-[4.2rem] ">
      <div className="hidden lg:flex justify-start w-[100px]">
        <Link href="/" key="home-link">
          <Image src="/robu.svg" alt="Logo" width={48} height={48} />
        </Link>
      </div>

      <div className="pt-2 lg:flex justify-center space-x-4 hidden">
      <Link href="#home">
          <Button variant="ghost" className="rounded-full">
            Home
          </Button>
        </Link>
        <Link href="#about">
          <Button variant="ghost" className="rounded-full">
            About
          </Button>
        </Link>
        <Link href="#panel">
          <Button variant="ghost" className="rounded-full">
            Panel
          </Button>
        </Link>
        {/* <Link href="/members">
          <Button variant="ghost" className="rounded-full">
            Members & Alumni
          </Button>
        </Link> */}
        {/* <Link href="/">
          <Button variant="ghost" className="rounded-full">
            Events
          </Button>
        </Link> */}
        <Link href="#contact">
          <Button variant="ghost" className="rounded-full">
            Contact
          </Button>
        </Link>
      </div>

      <div className="lg:pt-2 lg:flex justify-end space-x-4 w-[100px] hidden">
        <UserNav/>
      </div>


      <motion.div className="flex fixed top-[1.0rem] w-[3.1rem] px-1  rounded-full lg:hidden left-7" initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}> <a href="#home"> <Image src="/robu.svg" width={100}
              height={100} alt="Robu" priority={true}	/> </a></motion.div> 

      <motion.div className="flex fixed top-[1.1rem] right-6 lg:hidden z-[999] "initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}>
        <button
          className="flex items-center px-3 py-2 border rounded text-slate-500  hover:text-slate-300 hover:border-slate-300"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaBars />
        </button>
      </motion.div>

      <nav
        className={`lg:invisible fixed inset-0 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] z-50 transition ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
            className={`${
              showMenu ? 'block' : 'hidden'
            } block flex-grow lg:flex lg:items-center lg:w-auto bg-background  h-screen `}
          >


            <div className="  pt-20" >
              <div className="flex justify-center mt-2">
              
              </div>
              <div className="flex justify-center mt-2">
              <a
                href="#about"
                
              >
                <Button variant="outline" className=" display: block  py-2 w-[20rem] " onClick={() => setShowMenu(!showMenu)} > About </Button>
              </a>
              </div>
              <div className="flex justify-center mt-2">
              <a
                href="#panel"
                
              >
                <Button variant="outline" className=" display: block  py-2 w-[20rem] " onClick={() => setShowMenu(!showMenu)} > Panel </Button>
              </a>
              </div>
              
          


              <div className="flex justify-center mt-2">
              <a
                href="#contact"
                
              >
                <Button variant="outline" className=" display: block  py-2 w-[20rem] " onClick={() => setShowMenu(!showMenu)} > Contact </Button>
              </a>
              </div>

                      {!isLoggedIn ? (
                        <div>
          <div className="flex justify-center mt-2">
            <Link href="/login" key="login-link">
              <Button variant="secondary" className="display: block py-2 w-[20rem]">
                Login
              </Button>
            </Link>
          </div>
          <div className="flex justify-center mt-2">
            <Link href="/register" key="Register-link">
              <Button variant="secondary" className="display: block py-2 w-[20rem]">
                Register
              </Button>
            </Link>
          </div>
          </div>
        ) : <div>
        <div className="flex justify-center mt-2">
          <Link href="/dashboard" key="Dashboard-link">
            <Button variant="outline" className="display: block py-2 w-[20rem]">
            Dashboard
            </Button>
          </Link>
        </div>
        <div className="flex justify-center mt-2">
          <Link href="/dashboard/settings" key="settings-link">
            <Button variant="outline" className="display: block py-2 w-[20rem]">
            Settings
            </Button>
          </Link>
        </div>

        <div className="flex justify-center mt-2">
          
            <Button onClick={handleLogout} variant="secondary" className="display: block py-2 w-[20rem]">
            Logout
            </Button>

        </div>
        </div>}


              

              


              
              
            </div>
          </div>


      </nav>
    
    </div>
  );
}
