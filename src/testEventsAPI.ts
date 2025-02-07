const BASE_URL = 'http://localhost:3000/api/events' // Change if deployed

async function fetchEvents(params: Record<string, string | number | null>) {
  console.log(params)
  const url = new URL(BASE_URL)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null) url.searchParams.append(key, String(value))
  })

  console.log(`- Fetching: ${url.toString()}`)
  const response = await fetch(url.toString())
  const data = await response.json()

  // console.log('Response:', JSON.stringify(data, null, 2))
  return data
}

async function testPagination() {
  console.log('- Fetching first page of events...')
  let data = await fetchEvents({ first: 5 })

  if (!data.pageInfo.startCursor) {
    console.log('ERROR: No next page found, stopping test.')
    return
  }

  if (data.length === 5) {
    console.log('SUCCESS: First page loaded successfully.\n')
  } else {
    console.log(`ERROR: Asked for 5 but got ${data.length} events`)
  }

  console.log('- Fetching next page...')
  data = await fetchEvents({ after: data.pageInfo.startCursor, first: 5 })

  if (!data.pageInfo.endCursor) {
    console.log('ERROR: No previous page found after fetching next page.')
    return
  }

  console.log('SUCCESS: Next page loaded successfully.\n')

  console.log('- Fetching previous page...')
  data = await fetchEvents({ before: data.pageInfo.endCursor, last: 5 })
  console.log('SUCCESS: Previous page loaded successfully.\n')

  console.log('- Fetching events filtered by tags...')
  await fetchEvents({ tags: 'conference', last: 5 }) //... add more tests...
}

testPagination().catch(console.error)
