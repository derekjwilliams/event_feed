import * as cheerio from 'cheerio'

// List of event URLs
const eventUrls: string[] = [
  // uncomment the array elements to enable running, commented out to avoid accidentally making a great number of requests
  // 'https://events.willamette.edu/e/6410',
  // 'https://events.willamette.edu/e/5003',
  // 'https://events.willamette.edu/e/5005',
  // 'https://events.willamette.edu/e/5836',
  // 'https://events.willamette.edu/e/5004',
  // 'https://events.willamette.edu/e/6191',
  // 'https://events.willamette.edu/e/5016',
  // 'https://events.willamette.edu/e/5007',
  // 'https://events.willamette.edu/e/5020',
  // 'https://events.willamette.edu/e/5008',
  // 'https://events.willamette.edu/e/5022',
  // 'https://events.willamette.edu/e/5009',
  // 'https://events.willamette.edu/e/5013',
  // 'https://events.willamette.edu/e/6170',
  // 'https://events.willamette.edu/e/4997',
  // 'https://events.willamette.edu/e/5010',
  // 'https://events.willamette.edu/e/5023',
  // 'https://events.willamette.edu/e/5014',
  // 'https://events.willamette.edu/e/5019',
  // 'https://events.willamette.edu/e/5720',
  // 'https://events.willamette.edu/e/6406',
  // 'https://events.willamette.edu/e/6363',
  // 'https://events.willamette.edu/e/6371',
  // 'https://events.willamette.edu/e/6413',
  // 'https://events.willamette.edu/e/6420',
  // 'https://events.willamette.edu/e/6398',
  // 'https://events.willamette.edu/e/6359',
  // 'https://events.willamette.edu/e/6364',
  // 'https://events.willamette.edu/e/6390',
  // 'https://events.willamette.edu/e/6384',
  // 'https://events.willamette.edu/e/6368',
  // 'https://events.willamette.edu/e/6146',
  // 'https://events.willamette.edu/e/6407',
  // 'https://events.willamette.edu/e/6361',
  // 'https://events.willamette.edu/e/6362',
  // 'https://events.willamette.edu/e/6402',
  // 'https://events.willamette.edu/e/6090',
  // 'https://events.willamette.edu/e/6088',
  // 'https://events.willamette.edu/e/5528',
  // 'https://events.willamette.edu/e/6177',
  // 'https://events.willamette.edu/e/6178',
  // 'https://events.willamette.edu/e/6387',
  // 'https://events.willamette.edu/e/6372',
  // 'https://events.willamette.edu/e/6179',
  // 'https://events.willamette.edu/e/5947',
  // 'https://events.willamette.edu/e/6379',
  // 'https://events.willamette.edu/e/6388',
  // 'https://events.willamette.edu/e/6365',
  // 'https://events.willamette.edu/e/5529',
  // 'https://events.willamette.edu/e/6405',
  // 'https://events.willamette.edu/e/6092',
  // 'https://events.willamette.edu/e/6380',
  // 'https://events.willamette.edu/e/6091',
  // 'https://events.willamette.edu/e/6381',
  // 'https://events.willamette.edu/e/6416',
  // 'https://events.willamette.edu/e/6391',
  // 'https://events.willamette.edu/e/6393',
  // 'https://events.willamette.edu/e/6185',
  // 'https://events.willamette.edu/e/6404',
  // 'https://events.willamette.edu/e/6389',
  // 'https://events.willamette.edu/e/6367',
  // 'https://events.willamette.edu/e/6184',
  // 'https://events.willamette.edu/e/6392',
  // 'https://events.willamette.edu/e/6400',
  // 'https://events.willamette.edu/e/6422',
  // 'https://events.willamette.edu/e/6423',
]

// Function to fetch and parse event page content
const fetchEventTimes = async (url: string): Promise<string[]> => {
  let result: string[] | PromiseLike<string[]> = []
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const dateElement = $('p.event-single__date')

    let dayAndTime = ''

    // Iterate through child nodes to find the text after the <br>
    dateElement.contents().each((index, node) => {
      if (node.type === 'tag' && node.name === 'br') {
        const nextNode = dateElement.contents().eq(index + 1)
        if (nextNode.length && nextNode[0].type === 'text') {
          dayAndTime = nextNode.text().trim()
          return false // Break the loop once found
        }
      }
    })
    const parts = dayAndTime.split('\t')
    const length = parts.length
    const timeParts = parts[length - 1].trim().split(' –  ')
    result = timeParts
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return result
  }
  return result
}

const fetchEventContent = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const content = $('.raw-description').text().trim()
    return content || null
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return null
  }
}

// Main function to process URLs and generate SQL updates
const processEvents = async () => {
  const sqlUpdates: string[] = []

  if (eventUrls.length) {
    await fetchEventTimes(eventUrls[0])
  }
  for (const url of eventUrls) {
    const content = await fetchEventContent(url)
    if (content) {
      // Extract event link after "https://events.willamette.edu"
      const eventLink = url.replace('https://events.willamette.edu', '')
      const escapedContent = content.replace(/'/g, "''")
      const sqlUpdate = `UPDATE events SET content = '${escapedContent}' WHERE link = '${eventLink}';`
      sqlUpdates.push(sqlUpdate)
    }
  }
  console.log('-- Generated SQL Update Statements --')
  console.log(sqlUpdates.join('\n'))
}
function convertTime(timeStr: string) {
  const [time, period] = timeStr.split(' ')
  const [hours, minutes] = time.split(':').map(Number)

  let hours24
  if (period === 'AM') {
    hours24 = hours % 12
  } else {
    hours24 = (hours % 12) + 12
  }

  return `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:00`
}
const processEventTimes = async () => {
  const sqlUpdates: string[] = []

  for (const url of eventUrls) {
    const times = await fetchEventTimes(url)
    // console.log(content)
    if (times && times.length === 2) {
      // Extract event link after "https://events.willamette.edu"
      const eventLink = url.replace('https://events.willamette.edu', '')
      // Escape single quotes in the content for SQL insertion
      //const escapedContent = content.replace(/'/g, "''")
      // Create SQL update statement
      const startTimeString = convertTime(times[0])
      const endTimeString = convertTime(times[1])

      const startTimeSqlUpdate = `UPDATE events SET event_start_date = event_start_date::date + TIME '${startTimeString}' WHERE link = '${eventLink}';`
      const endTimeSqlUpdate = `UPDATE events SET event_end_date = event_start_date::date + TIME '${endTimeString}' WHERE link = '${eventLink}';`
      // const sqlUpdate = `UPDATE events SET content = '${escapedContent}' WHERE link = '${eventLink}';`
      sqlUpdates.push(startTimeSqlUpdate)
      sqlUpdates.push(endTimeSqlUpdate)
    }
  }
  console.log(sqlUpdates.join('\n'))
}

// Run the script
processEvents()
processEventTimes()
