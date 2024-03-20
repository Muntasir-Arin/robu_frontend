'use client'
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import axios from 'axios';
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link';
import useAuth from '@/utils/checkauth';

export default function Profile()  {
  const { handleLogout, isLoggedIn, userData } = useAuth();

  

  return (
    <div>
    
    <Card className="max-w-[70rem] mx-auto mt-10 shadow-lg p-6 ">
      <div className=" grid grid-cols-2 gap-2"> 
        <div className="p-6">
            <Avatar className='h-[20rem] w-[20rem]'>
            <AvatarImage src={userData?.avatar}  alt="@shadcn" />
            <AvatarFallback>{userData?.name}</AvatarFallback>
            </Avatar>
        </div>
        <div className="mt-20">
          <h1 className="text-3xl font-bold">  {userData?.name}</h1>
          <p className="text-gray-600 "> Organization: {userData?.org}</p>
          <p className="text-gray-600">
          <span className="">Email:</span> {userData?.email}
        </p>
        <p className=" text-gray-600">
          <span className="">Date of Birth:</span> {userData?.date_of_birth}
        </p>
        </div>
      </div>
    </Card>
    </div>
  );
};
