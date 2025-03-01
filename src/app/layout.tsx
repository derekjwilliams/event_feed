// src/app/layout.tsx
import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css'
export const metadata: Metadata = {
  title: 'Willamette Feeds API',
  description:
    'Provides feeds for Willamette Events, RSS2, Atom, JSON1, and ICS.  This uses a Graphql endpoint to get RSS data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
