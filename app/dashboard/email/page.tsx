'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { z, ZodError } from 'zod';
import axios from 'axios';

// Define Zod schema for validation
const EmailSchema = z.object({
  emailAddress: z.string().email(),
  emailSubject: z.string(),
  emailBody: z.string()
});

const EmailPage = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [emailAddresses, setEmailAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [overlayMessage, setOverlayMessage] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setOverlayMessage('');
    }
  }, [isLoading]);

  const handleEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailSubject(e.target.value);
  };

  const handleEmailBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailBody(e.target.value);
  };

  const handleAddEmailAddress = () => {
    try {
      const parsedEmail = EmailSchema.parse({
        emailAddress: emailAddress.trim(),
        emailSubject,
        emailBody
      });
      setEmailAddresses([...emailAddresses, parsedEmail.emailAddress]);
      setEmailAddress('');
      setErrors([]);
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map(err => err.message);
        setErrors(messages);
      }
    }
  };

  const handleSendEmails = async () => {
    setIsLoading(true);
    setOverlayMessage('Sending emails...');
    const totalEmails = emailAddresses.length;
    for (let i = 0; i < totalEmails; i++) {
      try {
        const parsedEmail = EmailSchema.parse({
          emailAddress: emailAddresses[i],
          emailSubject,
          emailBody
        });
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/email/`, parsedEmail);
        setOverlayMessage(`Sent email ${i + 1} of ${totalEmails}`);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
    setEmailAddresses([]);
    setEmailSubject('');
    setEmailBody('');
    setErrors([]);
    setIsLoading(false);
    setOverlayMessage('All emails sent successfully');
  };

  return (
    <div>
    <div className="mt-8 max-w-md mx-auto p-6 rounded-md ">
      <h1 className="text-2xl font-bold mb-4">Email</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter email address"
          value={emailAddress}
          onChange={handleEmailAddressChange}
        />
        <Button onClick={handleAddEmailAddress} className='mt-2'>Add</Button>
      </div>
      {errors.map((error, index) => (
          <div key={index} className="text-red-500">{error}</div>
        ))}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter subject"
          value={emailSubject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="mb-4">
        <Textarea
          placeholder="Enter email body"
          value={emailBody}
          onChange={handleEmailBodyChange}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Added email addresses:</h2>
        <ul>
          {emailAddresses.map((address: string, index: number) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </div>
      <Button onClick={handleSendEmails} disabled={isLoading} className='mt-2'>
        {isLoading ? 'Sending...' : 'Send Email'}
      </Button>
      {overlayMessage && (
        <div className="mt-4 text-sm">{overlayMessage}</div>
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
    {overlayMessage && (
      <div className="mt-4 text-sm text-black dark:text-white">{overlayMessage}</div>
    )}
  </div>
)}

    </div>
  );
};

export default EmailPage;
