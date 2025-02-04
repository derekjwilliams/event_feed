const BASE_URL = 'http://localhost:3000/api/events' // Change if deployed

async function fetchEvents(params: Record<string, string | number | null>) {
  const url = new URL(BASE_URL)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null) url.searchParams.append(key, String(value))
  })

  console.log(`- Fetching: ${url.toString()}`)
  const response = await fetch(url.toString())
  const data = await response.json()

  console.log('Response:', JSON.stringify(data, null, 2))
  return data
}

async function testPagination() {
  console.log('- Fetching first page of events...')
  let data = await fetchEvents({ limit: 5 })

  if (!data.pagination.next_cursor) {
    console.log('ERROR: No next page found, stopping test.')
    return
  }

  console.log('SUCCESS: First page loaded successfully.\n')

  console.log('- Fetching next page...')
  data = await fetchEvents({ after: data.pagination.next_cursor, limit: 5 })

  if (!data.pagination.prev_cursor) {
    console.log('ERROR: No previous page found after fetching next page.')
    return
  }

  console.log('SUCCESS: Next page loaded successfully.\n')

  console.log('- Fetching previous page...')
  data = await fetchEvents({ before: data.pagination.prev_cursor, limit: 5 })
  console.log('SUCCESS: Previous page loaded successfully.\n')

  console.log('- Fetching events filtered by tags...')
  await fetchEvents({ tags: 'conference', limit: 5 })
}

testPagination().catch(console.error)
