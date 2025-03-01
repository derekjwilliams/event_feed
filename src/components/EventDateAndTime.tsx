// components/EventDateAndTime.tsx
import { useEffect, useState } from 'react'

const fallbackTimeZone = 'America/Los_Angeles'

export const EventDateAndTime: React.FC<{
  startDate: Date
  endDate: Date
  timeZone?: string | null
}> = ({ startDate, endDate, timeZone }) => {
  const [showLocalTime, setShowLocalTime] = useState(false)
  const [startTimeString, setStartTimeString] = useState('')
  const [endTimeString, setEndTimeString] = useState('')
  const [startDateString, setStartDateString] = useState('')

  useEffect(() => {
    const eventDateFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: timeZone ?? fallbackTimeZone,
    })
    const localDateFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const eventTimeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timeZone ?? fallbackTimeZone,
    })

    const localTimeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    })

    setStartDateString(eventDateFormatter.format(startDate))
    setStartDateString(
      showLocalTime
        ? localDateFormatter.format(startDate)
        : eventDateFormatter.format(startDate)
    )

    setStartTimeString(
      showLocalTime
        ? localTimeFormatter.format(startDate)
        : eventTimeFormatter.format(startDate)
    )
    setEndTimeString(
      showLocalTime
        ? localTimeFormatter.format(endDate)
        : eventTimeFormatter.format(endDate)
    )
  }, [startDate, endDate, timeZone, showLocalTime])

  return (
    <div
      className="flex cursor-pointer hover:opacity-75 transition-opacity"
      onClick={() => setShowLocalTime(!showLocalTime)}
      title="Click to toggle between event location time and browser local time"
    >
      {startDate && (
        <div className="text-md font-semibold text-neutral-600 dark:text-neutral-200">
          {startDateString || new Date(startDate).toDateString()}
        </div>
      )}
      {startTimeString &&
        endTimeString &&
        startTimeString !== endTimeString && (
          <div className="mx-4 text-md text-neutral-600 dark:text-neutral-200">
            <span>
              {startTimeString} - {endTimeString}
              {showLocalTime && (
                <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                  (your local time)
                </span>
              )}
            </span>
          </div>
        )}
    </div>
  )
}
