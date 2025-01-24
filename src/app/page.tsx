import Link from 'next/link'

export default function Home() {
  return (
    <div>
      Next Application showing use of API for RSS Feed, navigate to{' '}
      <div>
        <Link href="api/rss">Here</Link> to see the RSS2 feed content (XML)
      </div>
      <div>
        <Link href="api/atom">Here</Link> to see the Atom feed content (XML)
      </div>
      <div>
        <Link href="api/json1">Here</Link> to see the JSON1 feed content (XML)
      </div>
    </div>
  )
}
