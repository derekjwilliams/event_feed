import * as cheerio from 'cheerio'

// links from db
const linss = [
  '/e/4974',
  '/e/5309',
  '/e/4971',
  '/e/4968',
  '/e/5946',
  '/e/4970',
  '/e/5715',
  '/e/5712',
  '/e/5525',
  '/e/6374',
  '/e/6435',
  '/e/4973',
  '/e/4978',
  '/e/6360',
  '/e/6386',
  '/e/6369',
  '/e/6378',
  '/e/4976',
  '/e/6370',
  '/e/6385',
  '/e/6408',
  '/e/6440',
  '/e/6394',
  '/e/6382',
  '/e/6411',
  '/e/5527',
  '/e/6383',
  '/e/6479',
  '/e/6409',
  '/e/6406',
  '/e/6436',
  '/e/4977',
  '/e/6363',
  '/e/6443',
  '/e/6371',
  '/e/6384',

  //-----

  '/e/6420',
  '/e/6398',
  '/e/6421',
  '/e/6368',
  '/e/6146',
  '/e/6465',
  '/e/4980',
  '/e/6407',
  '/e/6088',
  '/e/5528',
  '/e/4981',
  '/e/6177',
  '/e/6389',
  '/e/6178',
  '/e/6372',
  '/e/6387',
  '/e/6481',
  '/e/4982',
  '/e/6476',
  '/e/6179',
  '/e/6475',
  '/e/6480',
  '/e/5947',
  '/e/6472',
  '/e/6405',
  '/e/5406',
  '/e/6379',
  '/e/6478',
  '/e/6477',
  '/e/6388',
  '/e/6444',
  '/e/6445',
  '/e/4983',
  '/e/6359',
  '/e/6446',
  '/e/6364',
  '/e/6361',
  '/e/6447',
  '/e/6452',
  '/e/6362',
  '/e/6402',
  '/e/6090',
  '/e/6448',
  '/e/6471',
  '/e/6482',
  '/e/6449',
  '/e/6365',
  '/e/6483',
  '/e/6450',
  '/e/6453',
  '/e/6451',
  '/e/6454',
  '/e/6092',
  '/e/4985',
  '/e/6442',
  '/e/4984',
  '/e/6390',
  '/e/6380',
  '/e/6473',
  '/e/6404',
  '/e/6091',
  '/e/4989',
  '/e/6366',
  '/e/6367',
  '/e/6184',
  '/e/4987',
  '/e/4988',
  '/e/6392',
  '/e/6400',
  '/e/4986',
  '/e/6422',
  '/e/6423',
  '/e/6410',
  '/e/6413',
  '/e/6180',
  '/e/6474',
  '/e/6093',
  '/e/6381',
  '/e/6416',
  '/e/6391',
  '/e/5821',
  '/e/4994',
  '/e/5840',
  '/e/6393',
  '/e/4992',
  '/e/4993',
  '/e/6185',
  '/e/6186',
  '/e/4991',
  '/e/4998',
  '/e/6395',
  '/e/6187',
  '/e/6412',
  '/e/5529',
  '/e/5531',
  '/e/4999',
  '/e/5716',
  '/e/5532',
  '/e/5000',
  '/e/6415',
  '/e/5718',
]

// List of event URLs
const eventUrls: string[] = [
  // uncomment the array elements to enable running, commented out to avoid accidentally making a great number of requests
  // 'https://events.willamette.edu/e/4974',
  // 'https://events.willamette.edu/e/5309',
  // 'https://events.willamette.edu/e/4971',
  // 'https://events.willamette.edu/e/4968',
  // 'https://events.willamette.edu/e/5946',
  // 'https://events.willamette.edu/e/4970',
  // 'https://events.willamette.edu/e/5715',
  // 'https://events.willamette.edu/e/5712',
  //'https://events.willamette.edu/e/5525',
  // 'https://events.willamette.edu/e/6374',
  // 'https://events.willamette.edu/e/6435',
  // 'https://events.willamette.edu/e/4973',
  // 'https://events.willamette.edu/e/4978',
  // 'https://events.willamette.edu/e/6360',
  // 'https://events.willamette.edu/e/6386',
  // 'https://events.willamette.edu/e/6369',
  // 'https://events.willamette.edu/e/6378',
  // 'https://events.willamette.edu/e/4976',
  // 'https://events.willamette.edu/e/6370',
  // 'https://events.willamette.edu/e/6385',
  // 'https://events.willamette.edu/e/6408',
  // 'https://events.willamette.edu/e/6440',
  // 'https://events.willamette.edu/e/6394',
  // 'https://events.willamette.edu/e/6382',
  // 'https://events.willamette.edu/e/6411',
  // 'https://events.willamette.edu/e/5527',
  // 'https://events.willamette.edu/e/6383',
  // 'https://events.willamette.edu/e/6479',
  // 'https://events.willamette.edu/e/6409',
  // 'https://events.willamette.edu/e/6406',
  // 'https://events.willamette.edu/e/6436',
  // 'https://events.willamette.edu/e/4977',
  // 'https://events.willamette.edu/e/6363',
  // 'https://events.willamette.edu/e/6443',
  // 'https://events.willamette.edu/e/6371',
  // 'https://events.willamette.edu/e/6384',
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
    //console.log(JSON.stringify(timeParts, null, 2))
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return result
  }
  return result
}
type EventContent = { content: string; timeParts: string[] | null }

const fetchEventContent = async (url: string): Promise<EventContent> => {
  const result: { content: string; timeParts: string[] | null } = {
    content: '',
    timeParts: [],
  }
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
    result.content = content || ''
    result.timeParts = timeParts

    return result
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return result
  }
}

// Main function to process URLs and generate SQL updates
const processEvents = async () => {
  const sqlUpdates: string[] = []

  // if (eventUrls.length) {
  //   await fetchEventTimes(eventUrls[0])
  // }
  for (const url of eventUrls) {
    const contentAndTimes = await fetchEventContent(url)
    if (contentAndTimes) {
      // Extract event link after "https://events.willamette.edu"
      const eventLink = url.replace('https://events.willamette.edu', '')
      // Escape single quotes in the content for SQL insertion
      if (contentAndTimes.content != '') {
        const escapedContent = contentAndTimes.content.replace(/'/g, "''")
        // Create SQL update statement
        const sqlUpdate = `UPDATE events SET content = '${escapedContent}' WHERE link = '${eventLink}';`
        sqlUpdates.push(sqlUpdate)
      }
      if (contentAndTimes.timeParts && contentAndTimes.timeParts.length === 2) {
        const startTimeString = convertTime(contentAndTimes.timeParts[0])
        const endTimeString = convertTime(contentAndTimes.timeParts[1])
        //SET event_start_date = (event_start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::date + TIME '14:00:00'

        const startTimeSqlUpdate = `UPDATE events SET event_start_date = (event_start_date::date + TIME '${startTimeString}') AT TIME ZONE 'America/Los_Angeles' WHERE link = '${eventLink}';`
        const endTimeSqlUpdate = `UPDATE events SET event_end_date = (event_end_date::date + TIME '${endTimeString}') AT TIME ZONE 'America/Los_Angeles' WHERE link = '${eventLink}';`

        // const startTimeSqlUpdate = `UPDATE events SET event_start_date = (event_start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::date + TIME '${startTimeString}' WHERE link = '${eventLink}';`
        //        const endTimeSqlUpdate = `UPDATE events SET event_end_date = (event_start_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::date + TIME '${endTimeString}' WHERE link = '${eventLink}';`
        // const sqlUpdate = `UPDATE events SET content = '${escapedContent}' WHERE link = '${eventLink}';`
        sqlUpdates.push(startTimeSqlUpdate)
        sqlUpdates.push(endTimeSqlUpdate)

        //console.log(startTimeSqlUpdate)
        //console.log(endTimeSqlUpdate)
        // const startTimeSqlUpdate = `UPDATE events SET event_start_date = event_start_date::date + TIME '${startTimeString}' WHERE link = '${eventLink}';`
        // const endTimeSqlUpdate = `UPDATE events SET event_end_date = event_end_date::date + TIME '${endTimeString}' WHERE link = '${eventLink}';`
      }
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
      const endTimeSqlUpdate = `UPDATE events SET event_end_date = event_end_date::date + TIME '${endTimeString}' WHERE link = '${eventLink}';`
      // const sqlUpdate = `UPDATE events SET content = '${escapedContent}' WHERE link = '${eventLink}';`
      sqlUpdates.push(startTimeSqlUpdate)
      sqlUpdates.push(endTimeSqlUpdate)
    }
  }
  console.log(sqlUpdates.join('\n'))
}

// Run the script
processEvents()
//processEventTimes()
