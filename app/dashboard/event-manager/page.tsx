'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/utils/auth';

// Import loading component from the root

const VerificationPage = () => {
  const [transactionId, setTransactionId] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value);
  };

  const handleVerifyTransaction = async () => {
    try {
      setIsLoading(true); // Set loading to true
      const response = await api.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/intra-event/update-payment-status/`, { transaction_id: transactionId });
      setVerificationResult(response.data);
    } catch (error) {
      console.error('Error verifying transaction:', error);
      setVerificationResult('Error verifying transaction');
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div>
    <div className="mt-8 max-w-md mx-auto p-6 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Verification</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter transaction ID"
          value={transactionId}
          onChange={handleTransactionIdChange}
        />
      </div>
      <Button onClick={handleVerifyTransaction} className="mt-2">
        Verify Transaction
      </Button>
      
      {verificationResult && (
        <div className="mt-4">
          <strong>Verification Result:</strong> {verificationResult}
        </div>
      )}
    </div>
    {isLoading && (
  <div className='absolute inset-0 flex flex-col justify-center items-center dark:bg-black bg-white opacity-95'>
    <div className='flex space-x-2 justify-center items-center dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div className='h-6 w-6 bg-stone-500 dark:bg-stone-300 rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
      <div className='h-6 w-6 bg-stone-500 dark:bg-stone-300 rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
      <div className='h-6 w-6 bg-stone-500 dark:bg-stone-300 rounded-full animate-bounce'></div>
    </div>
    </div>
  )}
  </div>
  )
};



export default VerificationPage;
