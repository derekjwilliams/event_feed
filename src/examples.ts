import * as cheerio from 'cheerio'

// Sample HTML (replace with actual HTML if reading from a file or request)
const aprilAndAfterHtml = `
<div class="list-events">
    
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5719">Summer Housing Application Process Opens - All Campuses</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 1, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6375">
		<figure>
			<img alt="A person visiting &quot;A Peace of My Mind&quot; Traveling Exhibit" src="https://d1tvaw2qn8888b.cloudfront.net/cal-8bed0408-43ea-4011-ad76-ea7896388e59/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6375">A Peace of My Mind Traveling Exhibit</a></h2>

			<div class="padded--head"><p>Come visit the “A Peace of My Mind” exhibit in Cone Chapel from April 1st to April 7th. It consists of compelling portraits and inspiring personal stories from people of diverse backgrounds responding to the simple question, “What does peace mean to you?”</p>
</div>
				<p>
					<strong>Waller Hall | Salem Campus</strong><br>
					Cone Chapel
				</p>
</div>

<div class="date">

		<strong>Apr  1, 2025<br></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5718">Late Stay Request Process Opens - Salem Campus</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 1, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6414">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-6901cacd-d2d0-465e-9622-feaa52a5cfd7/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6414">Perfect your Project Poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford 101
				</p>
</div>

<div class="date">

		<strong>April 1, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6189">
		<figure>
			<img alt="Flowing treble music staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-cf9c406c-5ad5-458a-89c3-66d98b89601c/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6189">Senior Recital: Ash Scott</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>April 1, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6396">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-d47f71cb-f083-43ba-a4ff-012b3e117106/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6396">Spruce up your slides &amp; presentation!</a></h2>

			<div class="padded--head"><p>Get your slides and presentations ready for SSRD with the DLS student specialists</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>April 2, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6376">A Peace of My Mind Studio Day</a></h2>

			<div class="padded--head"><p>Come by the foyer of Rogers Music Center on April 3rd to have your portrait taken by photographer and storyteller John Noltner (A Peace of My Mind) as a part of an exciting Willamette community-wide storytelling project!</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Foyer
				</p>
</div>

<div class="date">

		<strong>April 3, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6397">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-736c4583-cb61-48d5-ba47-070d20529e95/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6397">Spruce up your slides &amp; presentation!</a></h2>

			<div class="padded--head"><p>Get your slides and presentations ready for SSRD with the DLS student specialists</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>April 3, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6151">The Mark and Melody Teppola  Presidential Distinguished Visiting Professor Hayley Freedman, MPH </a></h2>

			<div class="padded--head"><p>The Mark and Melody Teppola  Presidential Distinguished Visiting Professor Hayley Freedman, MPH</p>
</div>
				<p>
					<strong>Truman Wesley Collins Legal Center | Salem Campus</strong><br>
					John C. Paulus Lecture Hall-Room 201
				</p>
</div>

<div class="date">

		<strong>April 3, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6181">
		<figure>
			<img alt="A person looks at an art display at First Thursday at PNCA" src="https://d1tvaw2qn8888b.cloudfront.net/cal-5ab9791a-6b60-4270-b0a2-6067506127be/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6181">April First Thursday at PNCA + North Park Blocks!</a></h2>

			<div class="padded--head"><p>Join us in the North Park Blocks for exhibition openings, live music, refreshments and performances!</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>April 3, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6188">
		<figure>
			<img alt="Flowing treble music staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-deaa933e-240f-47e1-88a9-c58e205bbaf8/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6188">Senior Recital: Juliana Ha</a></h2>

			<div class="padded--head"><p>Enjoy over an hour of love songs through the ages while exploring connections between their composers and autism in this informative lecture recital!</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>April 3, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5011">Last day to withdraw from second half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 4, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5001">2L registration for Fall Semester</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 7, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6399">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-3d755bf4-e9dc-49d5-95d9-e884a4508629/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6399">Spruce up your slides &amp; presentation!</a></h2>

			<div class="padded--head"><p>Get your slides and presentations ready for SSRD with the DLS student specialists</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>April 7, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6377">A Peace of My Mind Keynote</a></h2>

			<div class="padded--head"><p>Come join our community in attending John Noltner’s (A Peace of My Mind) keynote presentation at 7:30 pm on Monday, April 7th in the Paulus Lecture Hall, located in the law school building. Featuring John’s own story and a presentation of portraits featuring members of the Willamette community, it will be a night of storytelling you won’t want to miss!</p>
</div>
				<p>
					<strong>Truman Wesley Collins Legal Center | Salem Campus</strong><br>
					John Paulus Lecture Hall
				</p>
</div>

<div class="date">

		<strong>April 7, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5002">1L registration for Fall semester</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 8, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6401">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-64f9beea-2ea1-4006-8430-5a19d9c0c7a0/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6401">Spruce up your slides &amp; presentation!</a></h2>

			<div class="padded--head"><p>Get your slides and presentations ready for SSRD with the DLS student specialists</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>April 8, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6417">
		<figure>
			<img alt=" pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-87f66f1b-401e-47d9-886e-21017eb43e72/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6417">Perfect your Project Poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford 101
				</p>
</div>

<div class="date">

		<strong>April 9, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6190">
		<figure>
			<img alt="Green 2-D 20 sided tabletop die with no numbers and transparency to see a sound board with cables within it" src="https://d1tvaw2qn8888b.cloudfront.net/cal-bb197ecc-baa5-48a0-867f-2512937671f1/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6190">Sonic Arts Ensemble Concert</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Rogers Rehearsal Hall
				</p>
</div>

<div class="date">

		<strong>April 9, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5006">Registration for fall semester</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 10, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6418">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-88291463-83a2-4326-948d-28e5b84f407f/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6418">Perfect your project poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Digital Learning Studio Ford 101
				</p>
</div>

<div class="date">

		<strong>April 10, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5012">Focus Week</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>Apr 14, 2025<br></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5003">Registration Begins for Seniors and Graduate Students for fall semester</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 14, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5005">Registration for fall semester</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 16, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5836">Student Scholarship Recognition Day (no classes so all students can attend student research presentations)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 16, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5004">Registration Begins for First-Years, Sophomores,and Juniors for fall semester</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 16, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6191">
		<figure>
			<img alt="Flowing treble staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-99851d61-126a-444a-962e-16f647ffe7fe/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6191">Jazz Collective and Willamette Singers</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>April 17, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5016">Last Day of Classes</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 21, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5007">Registration begins for students with 76 or more earned credits</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 21, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5020">Study Days</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>April 22, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5008">Registration begins for students with 44-75 earned credits</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 22, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5022">Final examinations</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>Apr 23, 2025<br></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5009">Registration begins for students with 43 or fewer earned credits</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 24, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5013">Last Day of Classes</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 28, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6170">Last day for students to submit work to faculty for grading to replace grades of Incomplete (I) from the fall semester.</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 28, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4997">Extended Individual Course Withdrawal Deadline (final class meeting day)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 28, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5010">Open registration begins (9:00am)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 28, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5023">Final examinations</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>Apr 29, 2025<br></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5014">Last Day of Classes</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 29, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5019">Study Days</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>Apr 30, 2025<br></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5720">Last Day to Apply for the Late Stay - Salem Campus</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>April 30, 2025</strong><br>
		Wednesday


	
</div>
        </article>

    </div>`

// Load HTML into Cheerio
const $ = cheerio.load(aprilAndAfterHtml)

// Extract article data
const events: Array<{
  title: string
  link: string
  description: string
  date: string
  location: string
  imageUrl: string
  tags: string[]
}> = []

$('.list-events article').each((_, element) => {
  const title = $(element).find('h2 a').text().trim()
  const link = $(element).find('h2 a').attr('href') || ''
  const description = $(element).find('.padded--head p').text().trim()
  const date = $(element).find('.date strong').text().trim()

  const locationElement = $(element).find('.detail p')
  let location = ''

  locationElement.contents().each((_, node) => {
    if (node.type === 'text' && $(node).text().trim()) {
      location = $(node).text().trim()
    }
  })
  const tags = $(element)
    .find('.detail p strong')
    .first()
    .text()
    .split('|')
    .map((tag) => tag.trim())
  const imageUrl = $(element).find('img').attr('src') || ''

  events.push({ title, link, description, date, location, imageUrl, tags })
})

console.log(JSON.stringify(events, null, 2))

interface EventData {
  title: string
  link: string
  description: string
  date: string
  location: string
  imageUrl: string
  tags: string[]
}

// Generate SQL queries
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateSQL = (events: EventData[]) => {
  // Generate event insert SQL
  const eventInsertSQL = `
INSERT INTO events (title, link, description, pub_date, event_start_date, location, image_url) VALUES 
${events
  .map(
    (event) =>
      `('${event.title.replace(/'/g, "''")}', '${event.link}', '${
        event.description
      }', '${event.date}','${event.date}', '${event.location}','${
        event.imageUrl
      }' )`
  )
  .join(',\n')}
ON CONFLICT (link) DO NOTHING;`

  // Collect unique tags
  const uniqueTags = Array.from(new Set(events.flatMap((event) => event.tags)))

  const tagInsertSQL = `
INSERT INTO tags (name) VALUES 
${uniqueTags.map((tag) => `('${tag.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (name) DO NOTHING;`

  // Generate event-tag relationship SQL
  const eventTagInsertSQL = events
    .flatMap((event) =>
      event.tags.map(
        (tag) => `((SELECT id FROM events WHERE link = '${event.link}'), 
                  (SELECT id FROM tags WHERE name = '${tag.replace(
                    /'/g,
                    "''"
                  )}'))`
      )
    )
    .join(',\n')

  const eventTagSQL = `
INSERT INTO event_tags (event_id, tag_id) VALUES 
${eventTagInsertSQL};`

  return `${eventInsertSQL}\n\n${tagInsertSQL}\n\n${eventTagSQL}`
}

const sql = generateSQL(events)
console.log(sql)
