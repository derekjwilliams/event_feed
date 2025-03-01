'use client'

import React, { useState, useEffect } from 'react'
import { generateIcsCalendar, VCalendar, VEvent } from 'ts-ics'

interface CalendarLinkProps {
  summary: string
  description?: string
  location?: string
  start: Date
  end: Date
  uid: string
  url?: string
  categories?: string[]
  geoLocation?: { latitude: number; longitude: number }
  className?: string
  children?: React.ReactNode
}

const CalendarLink: React.FC<CalendarLinkProps> = ({
  summary,
  description = '',
  location = '',
  start,
  end,
  uid,
  url,
  categories = [],
  geoLocation,
  className,
  children,
}) => {
  const [downloadUrl, setDownloadUrl] = useState<string>('')

  useEffect(() => {
    // Create a new VEvent following ts-ics structure
    const event: VEvent = {
      start: { date: new Date(start) },
      stamp: { date: new Date(start) },
      end: { date: new Date(end) },
      summary,
      description,
      uid: `${uid}`,
      url: url ? `https://events.willamette.edu${url}` : undefined,
      categories,
    }

    // Add geo-location if available
    if (geoLocation) {
      event.geo = `${geoLocation.latitude};${geoLocation.longitude}`
      event.location = location
        ? `${location} - ${geoLocation.latitude},${geoLocation.longitude}`
        : `${geoLocation.latitude},${geoLocation.longitude}`
    } else if (location) {
      event.location = location
    }

    const events: VEvent[] = [event]
    const calendar: VCalendar = {
      prodId: 'event-feed-eta.vercel.app', // TODO
      version: '2.0',
      events: events,
    }

    // Generate ICS Calendar
    const icsCalendar = generateIcsCalendar(calendar)

    // Create a downloadable URL
    const blob = new Blob([icsCalendar], {
      type: 'text/calendar;charset=utf-8',
    })
    const urlObject = URL.createObjectURL(blob)
    setDownloadUrl(urlObject)

    // Cleanup URL object on unmount
    return () => URL.revokeObjectURL(urlObject)
  }, [
    summary,
    description,
    location,
    start,
    end,
    uid,
    url,
    categories,
    geoLocation,
  ])

  const handleAddToCalendar = () => {
    if (downloadUrl) {
      const newTab = window.open(downloadUrl, '_blank')
      if (!newTab) {
        // If pop-ups are blocked, force a download
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = 'event.ics'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  return (
    <button className={className} onClick={handleAddToCalendar}>
      {children || 'Add to Calendar'}
    </button>
  )
}

export default CalendarLink
