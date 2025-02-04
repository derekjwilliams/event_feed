'use client'

import { getAllTags } from '@/app/events/actions'
import { useEffect, useState } from 'react'
// import { getAllTags } from

export default function TagsFilter({
  selectedTags,
  handleTagChange,
}: {
  selectedTags: string[]
  handleTagChange: (tag: string) => void
}) {
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getAllTags()
      setTags(fetchedTags.map((tag) => tag.name)) // Extract tag names
      setLoading(false)
    }
    fetchTags()
  }, [])

  if (loading) return <p>Loading tags...</p>

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagChange(tag)}
          className={`px-3 py-1 rounded-full transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
              : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
