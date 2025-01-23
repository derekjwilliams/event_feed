import Link from 'next/link'

export default function Home() {
  return (
    <div>
      Next Application showing use of API for RSS Feed, navigate to{' '}
      <Link href="api/rss">Here</Link> to see the RSS feed content (XML)
      <Link href="api/atom">Here</Link> to see the Atom feed content (XML)
    </div>
  )
}
