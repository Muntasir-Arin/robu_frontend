'use client'
import React, { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const PhoneNumbersPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [overlayMessage, setOverlayMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleAddPhoneNumber = () => {
    setOverlayMessage('');
    if (phoneNumber.trim() !== '') {
      setPhoneNumbers([...phoneNumbers, phoneNumber.trim()]);
      setPhoneNumber('');
    }
  };

  const handleSendMessage = () => {
    setIsLoading(true); // Set loading to true when sending messages
    setOverlayMessage('');
    let count = 0;
    const totalMessages = phoneNumbers.length;
    const intervalId = setInterval(() => {
      count++;
      if (count <= totalMessages) {
        const sentToNumber = phoneNumbers[count - 1];
        const newOverlayMessage = `${count} out of ${totalMessages} messages sent`;
        setOverlayMessage(newOverlayMessage);
      } else {
        clearInterval(intervalId);
        setIsLoading(false); // Set loading to false when all messages are sent
      }
    }, 500);
    setPhoneNumbers([]);
  };

  return (
    <div>
    <div className="mt-8 max-w-md mx-auto p-6 rounded-md ">
      <h1 className="text-2xl font-bold mb-4">Phone Numbers</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <Button onClick={handleAddPhoneNumber} className='mt-2'>Add</Button>
      </div>
      <div className="mb-4">
        <Textarea
          placeholder="Enter message"
          value={message}
          onChange={handleMessageChange}
        />
        <Button onClick={handleSendMessage} className='mt-2' disabled={isLoading}>Send Message</Button>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Added Phone Numbers:</h2>
        <ul>
          {phoneNumbers.map((number: string, index: number) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
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

export default PhoneNumbersPage;


