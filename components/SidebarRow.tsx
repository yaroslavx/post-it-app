import { HomeIcon } from '@heroicons/react/outline'
import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
}

function SidebarRow({ Icon, title }: Props) {
  return (
    <div className='flex items-center max-w-full space-x-2 pl-3 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group'>
        <Icon className="text-neutral-800 w-6 h-6 group-hover:text-theme transition-all duration-200"/>
        <p className='text-neutral-800 hidden md:inline group-hover:text-theme text-lg font-medium transition-all duration-200'>{title}</p>
        
    </div>
  )
}

export default SidebarRow
