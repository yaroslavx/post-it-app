import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
    return (
        <div className='mt-2 px-2 col-span-2 hidden lg:inline'>
            {/* Search */}
            <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2'>
                <SearchIcon className='w-5- h-5 text-gray-400' />
                <input type="text" placeholder='Search Twitter' className='flex-1 outline-none bg-transparent' />
            </div>
            <TwitterTimelineEmbed
                
                sourceType="profile"
                screenName="elonmusk"
                options={{ height: 400 }}
                />
        </div>
    )
}

export default Widgets