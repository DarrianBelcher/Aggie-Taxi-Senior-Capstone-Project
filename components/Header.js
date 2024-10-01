import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Header() {
    const headerMenue = [
        {
            id: 1,
            name: 'Ride',
            icon: '/taxi.png',
            link: '/'  // Add links to the menu items
        },
        {
            id: 2,
            name: 'Order History',
            icon: '/box.png',
            link: '/orders'  // Link to the Order History page
        }
     
        
    ]

    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-blue-800 flex items-center justify-between'>
            <div className='flex gap-24 items-center'>
                <Image src='/logo.png' width={70} height={70} alt='Logo' />

                <div className='flex gap-6 items-center'>
                    {headerMenue.map((item) => (
                        <Link href={item.link} key={item.id}>  {/* Wrap the whole menu item */}
                            <div className='flex gap-2 items-center cursor-pointer'>
                                <Image src={item.icon} width={17} height={17} alt={item.name}/>
                                <h2 className='text-[14px] font-medium'>{item.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <UserButton />
        </div>
    )
}

export default Header;
