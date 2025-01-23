import Link from 'next/link'

export default function Home() {
  return (
    <div>
      Next Application showing use of API for RSS Feed, navigate to{' '}
      <Link href="api">Here</Link> to see the RSS feed content (XML)
    </div>
  )
}
