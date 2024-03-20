'use client';

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" p-8 rounded-md shadow-md text-center">
        <p className="text-2xl font-semibold mb-4">Successfully verified</p>
        <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Click here to go back to home
        </button>
      </div>
    </div>
  );
}
