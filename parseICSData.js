const fs = require('fs')
const ICAL = require('ical.js')

function parseICS(icsData) {
  const jcalData = ICAL.parse(icsData)
  const comp = new ICAL.Component(jcalData)

  const events = comp.getAllSubcomponents('vevent').map((event) => {
    const vevent = new ICAL.Event(event)

    return {
      uid: vevent.uid,
      title: sanitizeSQL(vevent.summary),
      location: sanitizeSQL(vevent.location),
      start_date: formatDate(vevent.startDate),
      end_date: formatDate(vevent.endDate),
      url: extractProperty(event, 'url'),
      description: sanitizeSQL(extractProperty(event, 'description')),
      image_url: extractProperty(event, 'image'),
      contact_email: extractCustomField(event, 'Event Contact Email'),
      contact_phone: extractCustomField(event, 'Event Contact Phone'),
      audience: sanitizeSQL(extractCustomField(event, 'Audience')),
      department: sanitizeSQL(
        extractCustomField(event, 'Dept / Unit / Program')
      ),
      more_info: extractProperty(event, 'x-trumba-link'),
    }
  })

  // Generate SQL INSERT statements
  events.forEach((event) => {
    console.log(generateInsertSQL(event))
  })

  return events
}

// Extract standard properties
function extractProperty(event, propName) {
  const prop = event.getFirstProperty(propName)
  return prop ? prop.getFirstValue() : null
}

// Extract custom fields (Trumba specific)
function extractCustomField(event, fieldName) {
  const props = event.getAllProperties('x-trumba-customfield')
  for (const prop of props) {
    const params = prop.getParameters()
    if (params.name === fieldName) {
      return prop.getFirstValue()
    }
  }
  return null
}

// Format date in SQL-compatible format
function formatDate(dateObj) {
  return dateObj ? `'${dateObj.toString()}'` : 'NULL'
}

// Sanitize SQL inputs (handle single quotes)
function sanitizeSQL(value) {
  return value ? `'${value.replace(/'/g, "''")}'` : 'NULL'
}

// Generate SQL INSERT statement
function generateInsertSQL(event) {
  return `INSERT INTO events (uid, title, location, start_date, end_date, url, description, image_url, contact_email, contact_phone, audience, department, more_info) 
VALUES (${sanitizeSQL(event.uid)}, ${sanitizeSQL(event.title)}, ${sanitizeSQL(
    event.location
  )}, ${event.start_date}, ${event.end_date}, ${sanitizeSQL(
    event.url
  )}, ${sanitizeSQL(event.description)}, ${sanitizeSQL(
    event.image_url
  )}, ${sanitizeSQL(event.contact_email)}, ${sanitizeSQL(
    event.contact_phone
  )}, ${sanitizeSQL(event.audience)}, ${sanitizeSQL(
    event.department
  )}, ${sanitizeSQL(event.more_info)})
ON CONFLICT (uid) DO UPDATE SET 
title = EXCLUDED.title, 
location = EXCLUDED.location, 
start_date = EXCLUDED.start_date, 
end_date = EXCLUDED.end_date, 
url = EXCLUDED.url, 
description = EXCLUDED.description, 
image_url = EXCLUDED.image_url, 
contact_email = EXCLUDED.contact_email, 
contact_phone = EXCLUDED.contact_phone, 
audience = EXCLUDED.audience, 
department = EXCLUDED.department, 
more_info = EXCLUDED.more_info;`
}

// Load ICS data
const icsData = fs.readFileSync('calendar.ics', 'utf8')

// Parse ICS and generate SQL
parseICS(icsData)

/* Example Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    location TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    url TEXT,
    description TEXT,
    image_url TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    audience TEXT,
    department TEXT,
    more_info TEXT
);
*/
