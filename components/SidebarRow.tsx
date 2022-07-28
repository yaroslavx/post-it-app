import { HomeIcon } from '@heroicons/react/outline'
import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
}

function SidebarRow({ Icon, title }: Props) {
  return (
    <div className='flex items-center max-w-fit space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group'>
        <Icon className="w-6 h-6"/>
        <p className='hidden md:inline group-hover:text-theme text-base font-light lg:text-lg'>{title}</p>
        
    </div>
  )
}

export default SidebarRow
