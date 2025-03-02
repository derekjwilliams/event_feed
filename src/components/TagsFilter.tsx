//TagsFilter.tsx
'use client'

import { Calendar } from 'lucide-react'
import { Tag, TagsConnection } from '@/types/graphql'
import Link from 'next/link'

interface TagsFilterProps {
  tagsLoading: boolean
  tagsError: Error | null
  tagsData: TagsConnection | null | undefined
  selectedTags: string[]
  handleTagChange: (tag: string) => void
  handleToggleAnyTag: () => void
}

export default function TagsFilter({
  tagsLoading,
  tagsError,
  tagsData,
  selectedTags,
  handleTagChange,
  handleToggleAnyTag,
}: TagsFilterProps) {
  return (
    <div className="p-4 overflow-y-auto">
      <Link
        href="webcal://event-feed-eta.vercel.app/api/ics"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-4 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded"
      >
        <Calendar className="h-5 w-5" />
        Subscribe
      </Link>

      {tagsLoading && (
        <div className="space-y-2 animate-pulse">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-8 w-full bg-neutral-200 rounded-full" />
          ))}
        </div>
      )}

      {tagsError && (
        <div className="text-red-500 p-2 rounded bg-red-50">
          Error loading tags: {tagsError.message}
        </div>
      )}

      {tagsData?.edges
        ?.filter((edge): edge is { node: Tag } => !!edge.node)
        .map((edge) => (
          <button
            key={edge.node.name}
            onClick={() => handleTagChange(edge.node.name)}
            className={`h-8 px-3 py-1 m-2 rounded-full transition-colors ${
              selectedTags.includes(edge.node.name)
                ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
                : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
            } ${edge.node.name === '' ? 'italic' : ''}`}
          >
            {edge.node.name}
          </button>
        ))}

      <div className="m-4">
        <button
          onClick={() => handleTagChange('')}
          className={`w-full px-3 m-2 py-2 rounded-full transition-colors ${
            selectedTags.includes('')
              ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
              : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300 italic'
          }`}
        >
          Not Tagged
        </button>

        <button
          onClick={handleToggleAnyTag}
          className="w-full px-3 py-2 rounded-full transition-colors bg-blue-600 dark:bg-amber-200 text-white dark:text-black"
        >
          Any Tagged
        </button>
      </div>
    </div>
  )
}
