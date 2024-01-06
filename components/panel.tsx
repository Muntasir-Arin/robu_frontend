import React from "react"
import Image from "next/image"
const people = [
  {
    name: 'Shawon Ahmed',
    role: 'President',
    imageUrl:
      '/president.webp',
  },
  {
    name: 'Sharnit Saha',
    role: 'Vice President',
    imageUrl:
    '/vice-president.jpg'  },{
    name: 'Abid Mahmood Akash',
    role: 'General Secretary of Operations',
    imageUrl:
    '/gs-o.jpg'  },{
    name: 'Md Mahfujul Haque Sourov',
    role: 'Assistant General Secretary',
    imageUrl:
    '/ags.jpg'  },
]

export default function Panel() {
  return (
    <div id="panel" className=" scroll-mt-[4.5rem] xl:scroll-mt-[12rem] bg-gradient-to-r from-cyan-500 to-blue-500 py-[4rem] sm:py-32 flex items-center">
      <div className="mx-auto grid max-w-[85rem] gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl m-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-[3rem] sm:leading-[2.8rem] uppercase">Meet our leadership</h2>
          <p className="mt-3 text-lg leading-8 text-slate-50">
          Presidential Panel for the academic year 2023
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 ">
          {people.map((person) => (
            <li key={person.name}>
              <div className="duration-100 flex items-center gap-x-6 hover:scale-[1.15] hover:bg-white hover:bg-opacity-20 hover:rounded-sm py-2 px-5 ">
                <Image className="duration-100 h-[8rem] w-[8rem] xl:h-[13rem] xl:w-[13rem] sm:h-[8rem] sm:w-[8rem] rounded-full  " src={person.imageUrl} alt="" width={300}
      height={300} 	/>
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-slate-50">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-slate-950">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
