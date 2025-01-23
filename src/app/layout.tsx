import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Willamette RSS Feed API',
  description:
    'Proof of Concept RSS Feed, uses a Graphql endpoint to get RSS data',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
