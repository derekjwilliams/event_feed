import Link from 'next/link'
import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string // Allow custom className to be passed in
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`text-blue-700 visited:text-purple-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 underline dark:text-blue-300 dark:visited:text-purple-300 dark:hover:text-blue-400 dark:focus:ring-blue-400 ${className}`}
    >
      {children}
    </Link>
  )
}

export default NavLink
