import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='p-5 flex justify-between items-centre border shadow-sm' >
        <Image src={'./logo.svg'}
        alt='logo'
        width={80}
        height={80}
        />
        <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
    </div>
  )
}

export default Header