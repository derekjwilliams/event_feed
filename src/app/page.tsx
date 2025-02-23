import NavLink from '@/components/ui/NavLink'

export default function Home() {
  return (
    <>
      <div>
        Next Application showing use of API for RSS Feed, navigate to{' '}
        <div>
          <NavLink href="api/rss">Here</NavLink> to see the RSS2 feed content
          (XML)
        </div>
        <div>
          <NavLink href="api/atom">Here</NavLink> to see the Atom feed content
          (XML)
        </div>
        <div>
          <NavLink href="api/json1">Here</NavLink> to see the JSON1 feed content
          (JSON)
        </div>
        <div>
          <NavLink href="api/ics">Here</NavLink> to download the Calendar feed
          content (ICS)
        </div>
        <div>
          <NavLink href="https://event-feed-eta.vercel.app/api/calendar">
            Calendar with one event over https
          </NavLink>{' '}
        </div>
        <div>
          <NavLink href="webcal://event-feed-eta.vercel.app/api/calendar">
            Calendar with one event over webcal
          </NavLink>{' '}
        </div>
      </div>
    </>
  )
}
