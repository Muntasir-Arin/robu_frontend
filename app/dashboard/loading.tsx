import React from 'react'

export default function Loading() {
  return (
    <div className='flex space-x-2 justify-center items-end  h-1/2 dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-6 w-6 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-6 w-6 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-6 w-6 bg-stone-300 rounded-full animate-bounce'></div>
</div>
  )
}
