'use client'

import { Calendar } from 'lucide-react'
import { Tags, TagsConnection, TagsEdge } from '@/types/graphql'

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
    <div className="flex gap-2 flex-wrap">
      {tagsLoading && (
        <div className="space-x-2 animate-pulse">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-neutral-200 rounded-full inline-block"
            />
          ))}
        </div>
      )}
      {tagsError && (
        <div className="text-red-500">
          Error loading tags: {tagsError.message}
        </div>
      )}

      {tagsData?.edges
        ?.filter((edge): edge is TagsEdge => !!edge.node)
        .map((edge) => (
          <button
            key={edge.node.name}
            onClick={() => handleTagChange(edge.node.name)}
            className={`px-3 py-1 rounded-full transition-colors ${
              selectedTags.includes(edge.node.name)
                ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
                : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300'
            } ${edge.node.name === '' ? 'italic' : ''}`}
          >
            {edge.node.name}
          </button>
        ))}

      <div className="ml-auto">
        <button
          key={''}
          onClick={() => handleTagChange('')}
          className={`mx-4 px-3 py-1 rounded-full transition-colors ${
            selectedTags.includes('')
              ? 'bg-blue-950 dark:bg-amber-300 text-white dark:text-black'
              : 'bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-300 italic'
          }`}
        >
          Not Tagged
        </button>
        <button
          onClick={handleToggleAnyTag}
          className="px-3 py-1 rounded-full transition-colors bg-blue-600 dark:bg-amber-200  saturate-25  text-white dark:text-black"
        >
          Any Tagged
        </button>
      </div>
      <a
        href="webcal://event-feed-eta.vercel.app/api/ics"
        className="float-right bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
      >
        <Calendar className="h-5 w-5" />
      </a>
    </div>
  )
}
