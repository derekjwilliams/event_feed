'use client'

export default function TagsFilter({
  selectedTags,
  handleTagChange,
  allTagNames,
}: {
  selectedTags: string[]
  handleTagChange: (tag: string) => void
  allTagNames: string[]
}) {
  allTagNames = allTagNames ? allTagNames : []
  return (
    <div className="flex flex-wrap gap-2">
      {allTagNames.map((tag) => (
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
      {/* {tags.map((tag) => (
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
      ))} */}
    </div>
  )
}
