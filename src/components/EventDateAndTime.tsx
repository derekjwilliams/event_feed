// components/EventDateAndTime.tsx
import { useEffect, useState } from 'react'

const fallbackTimeZone = 'America/Los_Angeles'

const formatEventTime = (date: Date, timeZone: string | null) => {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timeZone ?? fallbackTimeZone,
  }).format(date)
}

const formatEventDate = (date: Date, timeZone: string | null) => {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: timeZone ?? fallbackTimeZone,
  }).format(date)
}

export const EventDateAndTime: React.FC<{
  startDate: string
  endDate: string
  timeZone?: string | null
}> = ({ startDate, endDate, timeZone }) => {
  const [startTimeString, setStartTimeString] = useState('')
  const [endTimeString, setEndTimeString] = useState('')
  const [startDateString, setStartDateString] = useState('')

  useEffect(() => {
    setStartTimeString(formatEventTime(new Date(startDate), timeZone ?? null))
    setEndTimeString(formatEventTime(new Date(endDate), timeZone ?? null))
    setStartDateString(formatEventDate(new Date(startDate), timeZone ?? null))
  }, [startDate, endDate, timeZone])

  return (
    <div className="flex">
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
            </span>
          </div>
        )}
    </div>
  )
}
