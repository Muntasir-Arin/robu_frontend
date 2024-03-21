'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Card,
} from '@/components/ui/card';


interface UserData {
    name: string;
    org: string;
    email: string;
    date_of_birth: string;
    avatar: string;
    is_admin: boolean; 
    position : string;
    robu_end: string;

  }
  
const Profile: React.FC<{ params: any }> = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${params.student_id}`
        );
        if (response.status === 200) {
          setUserData(response.data);
          console.log(response.data)
          setLoading(false);
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        router.push('/404');
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [params.student_id, router]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton UI
  }

  return (
    <div>
      <Card className="max-w-[70rem] mx-auto mt-10 shadow-lg p-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-6">
            <Avatar className="h-[20rem] w-[20rem]">
              <AvatarImage src={userData?.avatar} alt="@shadcn" />
              <AvatarFallback>{userData?.name}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-20">
            <h1 className="text-3xl font-bold">{userData?.name}</h1>
            <p className="text-gray-600">Organization: {userData?.org}</p>
            <p className="text-gray-600">
              <span className="">Email:</span> {userData?.email}
            </p>
            <p className="text-gray-600">
              <span className="">Date of Birth:</span>{' '}
              {userData?.date_of_birth}
            </p>
            <p className="text-gray-600">
              <span className="">Peak Position:</span>{' '}
              {userData?.position}
            </p>
            {userData?.robu_end ? (
                <p className="text-gray-600">
                <span className="">Alumni</span>{' '}      
              </p>
            
          ) : (
            <p className="text-gray-600">
              <span className="">Current Member</span>{' '}
            </p>
          )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
