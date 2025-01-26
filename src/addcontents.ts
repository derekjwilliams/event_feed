import axios from 'axios'
import * as cheerio from 'cheerio'

// List of event URLs
const eventUrls = [
  'https://events.willamette.edu/e/5003',
  'https://events.willamette.edu/e/5005',
  'https://events.willamette.edu/e/5836',
  'https://events.willamette.edu/e/5004',
  'https://events.willamette.edu/e/6191',
  'https://events.willamette.edu/e/5016',
  'https://events.willamette.edu/e/5007',
  'https://events.willamette.edu/e/5020',
  'https://events.willamette.edu/e/5008',
  'https://events.willamette.edu/e/5022',
  'https://events.willamette.edu/e/5009',
  'https://events.willamette.edu/e/5013',
  'https://events.willamette.edu/e/6170',
  'https://events.willamette.edu/e/4997',
  'https://events.willamette.edu/e/5010',
  'https://events.willamette.edu/e/5023',
  'https://events.willamette.edu/e/5014',
  'https://events.willamette.edu/e/5019',
  'https://events.willamette.edu/e/5720',
  'https://events.willamette.edu/e/6406',
  'https://events.willamette.edu/e/6363',
  'https://events.willamette.edu/e/6371',
  'https://events.willamette.edu/e/6413',
  'https://events.willamette.edu/e/6420',
  'https://events.willamette.edu/e/6398',
  'https://events.willamette.edu/e/6359',
  'https://events.willamette.edu/e/6364',
  'https://events.willamette.edu/e/6390',
  'https://events.willamette.edu/e/6384',
  'https://events.willamette.edu/e/6368',
  'https://events.willamette.edu/e/6146',
  'https://events.willamette.edu/e/6407',
  'https://events.willamette.edu/e/6361',
  'https://events.willamette.edu/e/6362',
  'https://events.willamette.edu/e/6402',
  'https://events.willamette.edu/e/6090',
  'https://events.willamette.edu/e/6088',
  'https://events.willamette.edu/e/5528',
  'https://events.willamette.edu/e/6177',
  'https://events.willamette.edu/e/6178',
  'https://events.willamette.edu/e/6387',
  'https://events.willamette.edu/e/6372',
  'https://events.willamette.edu/e/6179',
  'https://events.willamette.edu/e/5947',
  'https://events.willamette.edu/e/6379',
  'https://events.willamette.edu/e/6388',
  'https://events.willamette.edu/e/6365',
  'https://events.willamette.edu/e/5529',
  'https://events.willamette.edu/e/6405',
  'https://events.willamette.edu/e/6092',
  'https://events.willamette.edu/e/6380',
  'https://events.willamette.edu/e/6091',
  'https://events.willamette.edu/e/6381',
  'https://events.willamette.edu/e/6416',
  'https://events.willamette.edu/e/6391',
  'https://events.willamette.edu/e/6393',
  'https://events.willamette.edu/e/6185',
  'https://events.willamette.edu/e/6404',
  'https://events.willamette.edu/e/6389',
  'https://events.willamette.edu/e/6367',
  'https://events.willamette.edu/e/6184',
  'https://events.willamette.edu/e/6392',
  'https://events.willamette.edu/e/6400',
  'https://events.willamette.edu/e/6422',
  'https://events.willamette.edu/e/6423',
  'https://events.willamette.edu/e/6410',
]

// Function to fetch and parse event page content
const fetchEventContent = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    // Extract content from the div with class "raw-description"
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

  for (const url of eventUrls) {
    const content = await fetchEventContent(url)
    if (content) {
      // Extract event link after "https://events.willamette.edu"
      const eventLink = url.replace('https://events.willamette.edu', '')

      // Escape single quotes in the content for SQL insertion
      const escapedContent = content.replace(/'/g, "''")

      // Create SQL update statement
      const sqlUpdate = `UPDATE events SET content = '${escapedContent}' WHERE link = '${eventLink}';`
      sqlUpdates.push(sqlUpdate)
    }
  }

  console.log('-- Generated SQL Update Statements --')
  console.log(sqlUpdates.join('\n'))
}

// Run the script
processEvents()
