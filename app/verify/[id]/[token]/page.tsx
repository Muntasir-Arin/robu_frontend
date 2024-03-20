"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const VerifyPage: React.FC<{ params: any }> = ({ params }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract id and token from params
        const { id, token } = params;

        // Make GET request to verify email
        await axios.get(`http://localhost:8000/api/auth/verify-email/${id}/${token}`);

        // If verification is successful, redirect to a success page
        router.push('/verify/success');
      } catch (error) {
        // Handle error, for example, redirect to an error page
        router.push('/verify/error');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [params, router]);

  if (loading) {

    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="">
      {/* Your content goes here */}
    </div>
  );
};

export default VerifyPage;
