import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
    return (
        <div className='mt-2 px-3 col-span-2 hidden space-y-3 lg:inline justify-center items-center w-full'>
            {/* Search */}
            <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2'>
                <SearchIcon className='w-5- h-5 text-gray-400' />
                <input type="text" placeholder='Search Twitter' className='flex-1 outline-none bg-transparent' />
            </div>
            <div className='max-h-screen overflow-auto pb-72 scrollbar-hide'>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="elonmusk"

                options={{ height: "screen", width: 'full'}}
                noHeader
                noFooter
                noBorders
                />
            </div>
            
        </div>
    )
}

export default Widgets