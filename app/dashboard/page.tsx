'use client'
import api from "@/utils/auth";
import useAuth from "@/utils/checkauth";
import { toast } from "sonner";

export default function Page() {
  const { userData} = useAuth()
  const condition = userData?.is_verified;

  const handleVerification = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();

    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resend-verification/`);
      if (response.status === 200) {
        toast.success('Success', {
          description: 'Verification email sent successfully',
        });
      } else {
        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        });
      } else {
        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        });
      }
    }
  };

  return (<div>{condition ? (
    <div className="flex items-center justify-center h-screen"> 
      <div className="text-center mt-[-10rem] px-8">
        <h2 className="text-3xl font-bold tracking-tight">COMING SOON</h2>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;re currently working on creating something fantastic.
          We&apos;ll be here soon.
        </p>
      </div>
    </div>

     ) : (
      <div className="flex items-center justify-center h-96">
  <div className="text-center mt-[-10rem] px-8 rounded-none text-3xl font-bold tracking-tight">
    Your account has not been verified. Please click <span onClick={handleVerification} className=" text-blue-400"> <a href="#">here </a> </span> to receive a verification email.
  </div>
</div>
       
     )}

    </div>

    
  );
}