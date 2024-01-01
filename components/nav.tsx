import React from 'react'
import { Button } from './ui/button'

export default function NavBar() {
  return (
    <div className='flex justify-center pt-10 '>
        <Button variant="ghost" className=' rounded-full '>About</Button>
        <Button variant="ghost" className=' rounded-full '>Panel</Button>
        <Button variant="ghost" className=' rounded-full '>Project</Button>
        <Button variant="ghost" className=' rounded-full '>Events</Button>
        <Button variant="ghost" className=' rounded-full '>Contact</Button>
    </div>
  )
}
