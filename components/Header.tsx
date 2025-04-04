import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FileText } from 'lucide-react';


const Header = ({children, className}: HeaderProps) => {
  return (
    <div className={cn('header', className)} style={{borderBottom: '1px solid #262626'}}>
        <Link href='/' className="md:flex-1">
        <div className="ml-5 flex items-center space-x-2">
            <FileText className="h-8 w-8" />
            <span className="font-bold text-xl">LiveDocs</span>
          </div>
        </Link>
        {children}
    </div>
  )
}

export default Header