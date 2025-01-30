import * as cheerio from 'cheerio'

// Sample HTML (replace with actual HTML if reading from a file or request)

const allHtml = `<div class="list-events">
    
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4974">Spring Semester Begins. Tuition and Fee Payment Due</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>January 2, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5309">Law Intensive Trial Practice (ITP)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>Jan  2, 2025<br><span class="date--end">– Jan 11, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4971">Winter Residency</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>Jan  2, 2025<br><span class="date--end">– Jan 12, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4968">Fall semester final grades due in Registrar's Office at 8:00 a.m.</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 3, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/5946">
		<figure>
			<img alt="HFMA First Friday Art Walk" src="https://d1tvaw2qn8888b.cloudfront.net/cal-00aa554f-9840-49ed-accd-c9c7ced0c2dc/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/5946">HFMA First Friday Salem Art Walk</a></h2>

			<div class="padded--head"><p>Start your First Friday Art Walk at the Hallie Ford Museum of Art and get ready for an evening of fun and art in Salem!</p>
</div>
				<p>
					<strong>Hallie Ford Museum of Art | Salem Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>January 3, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4970">Wintersession</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>Jan  6, 2025<br><span class="date--end">– Jan 10, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5715">Dinner is First Board Meal at Salem Campus</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 8, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5712">New Student Move In Day - Salem Campus</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 8, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5525">Residential Facilities Open for Spring 2025 - All Campuses</a></h2>

			<div class="padded--head"><p>Residential facilities reopen at 9:00 am for Spring semester, 2025.</p>
</div>
</div>

<div class="date">

		<strong>Jan 10, 2025<br><span class="date--end">– Jan 11, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<a href="/e/6374">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-97b737e1-c426-42da-8cba-7c72794c4501/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6374">Camerata PYP featuring Llewellyn Sanchez-Werner</a></h2>

			<div class="padded--head"><p>Camerata PYP returns with a unique program - a “recital for piano and orchestra” - that blends the elegance of classical traditions with vibrant modern compositions, featuring renowned guest Llewellyn SÁNCHEZ-WERNER, piano, and conducted by Musical Director David Hattner.</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Hall
				</p>
</div>

<div class="date">

		<strong>January 12, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6435">Hallie Ford: Spring Semester Begins. Tuition and Fee Payment Due</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 13, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4973">Spring Semester Begins. Tuition and Fee Payment Due</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 13, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4978">Last day to add/drop or choose Audit (AUD) grading for full semester and first half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 15, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6360">
		<figure>
			<img alt="Photos of two people." src="https://d1tvaw2qn8888b.cloudfront.net/cal-94adf283-c80f-458b-89d2-3f0c7762a3ac/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6360">A Biedermeier Evening</a></h2>

			<div class="padded--head"><p>Professors Emma Cowell and Esteban Zuniga share the music of Biedermeier.</p>
</div>
				<p>
					<strong>Waller Hall | Salem Campus</strong><br>
					Cone Chapel
				</p>
</div>

<div class="date">

		<strong>January 16, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6386">
		<figure>
			<img alt="quad center" src="https://d1tvaw2qn8888b.cloudfront.net/cal-620c3d52-2945-43d4-ab70-7a10900534c3/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6386">QUAD Center Opening &amp; Ribbon Cutting</a></h2>

			<div class="padded--head"><p>The official opening of the QUAD Center for the spring semester will feature a brief ribbon cutting with cookies and tea.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					224
				</p>
</div>

<div class="date">

		<strong>January 17, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6369">Panhellenic Open House</a></h2>

			<div class="padded--head"><p>Join Willamette’s sororities in an evening dedicated to meeting new people, hands-on activities, and seeing what sorority life is all about!</p>
</div>
				<p>
					<strong>Delta Gamma | Salem Campus</strong><br>
					Main Living room and dining room. 
				</p>
</div>

<div class="date">

		<strong>January 17, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6378">
		<figure>
			<img alt="Two people working on collaborative poster artwork" src="https://d1tvaw2qn8888b.cloudfront.net/cal-b8463d09-383f-4dc6-bb3b-2ccaf08fb816/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6378">Community Art Build at PNCA with Don't Shoot PDX &amp; the ACLU</a></h2>

			<div class="padded--head"><p>On January 18, join Don’t Shoot Portland at the Pacific Northwest College of Art
for an art build ahead of Reclaim MLK March! Create meaningful art, learn from local organizers with
resources and meet your Portland neighbors to cultivate community and impact.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					Shipley-Collins Medatheque &amp; Printmaking Studio
				</p>
</div>

<div class="date">

		<strong>January 18, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4976">Martin Luther King Jr. Holiday (University Closed)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 20, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6370">Academic Success Workshop</a></h2>

			<div class="padded--head"><p>Willamette College invites undergraduate students on the Salem Campus to attend an academic success workshop.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					301
				</p>
</div>

<div class="date">

		<strong>January 21, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6385">Meet the New Career Advisor for the Renjen/Deloitte Pathways Program</a></h2>

			<div class="padded--head"><p>This is an introductory event for students to get to know Daniel Arellano, the new career advisor for the Rejen/Deloitte Pathways Program and for Daniel to get to know students.</p>
</div>
				<p>
					<strong>Other | Salem Campus</strong><br>
					Renjen Center (E&amp;E) 
				</p>
</div>

<div class="date">

		<strong>January 22, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6408">ASWU Treasurer Office Hours</a></h2>

			<div class="padded--head"><p>ASWU Treasurer Sophia “Stevie” Bergstrom has office hours to provide an opportunity for students to come by to ask questions, share concerns or ideas, or even just say hi! If these times don’t work for you, you can always reach the ASWU team by email: aswu@willamette.edu or contact Stevie using treasurer@willamette.edu.</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					The Bistro
				</p>
</div>

<div class="date">

		<strong>January 22, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6440">The Hanni Student Scholar Award </a></h2>

			<div class="padded--head"><p>Students!
Apply to present your research or project to the Willamette Institute for Continued Learning</p>
</div>
</div>

<div class="date">

		<strong>Jan 23, 2025<br><span class="date--end">– Jan 30, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<a href="/e/6394">
		<figure>
			<img alt="&quot;A minimalist 8-bit Pac-Man scene on a black background featuring Pac-Man eating white dots as he approaches a series of colorful ghosts: red, orange, blue, pink, and a scared blue ghost at the end." src="https://d1tvaw2qn8888b.cloudfront.net/cal-8d4a43c7-e1a3-4d58-9834-14a60e401b92/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6394">TechBytes -The Future of Learning: AI, Gamification, Social Media, and Inquiry-Based Learning</a></h2>

			<div class="padded--head"><p>TechBytes is a weekly department event for students and faculty gather to discuss various topics related to computing. There is typically a set topic featuring members of Willamette’s staff, faculty, and students as speakers. These topics range from career advice and uses of emerging technology to info sessions about relevant programs. Snacks and pizza are usually provided!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					102
				</p>
</div>

<div class="date">

		<strong>January 23, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6382">Virtual Trivia</a></h2>

			<div class="padded--head"><p>Compete for prizes across multiple rounds of trivia&nbsp;against fellow members of the Willamette community!
Thursday, January&nbsp;23, 2025
6:30 p.m. (PST)
The Zoom link will be shared the day before the event.&nbsp;</p>
</div>
				<p>
					<strong>Virtual Event</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>January 23, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6411">ASWU Weekly Senate Meeting</a></h2>

			<div class="padded--head"><p>Join us for an engaging and productive ASWU Meeting! This is your chance to get involved, voice your opinions, and contribute to positive changes on our campus. ASWU Senate Meetings will be here every Thursday from 7-8pm @ Montag Den.</p>
</div>
				<p>
					<strong>Baxter Hall | Salem Campus</strong><br>
					Montag Den
				</p>
</div>

<div class="date">

		<strong>January 23, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5527">Dining Plan Changes Due - Salem Campus</a></h2>

			<div class="padded--head"><p>Last day to change your dining plan for Spring 2025.</p>
</div>
</div>

<div class="date">

		<strong>January 24, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6383">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-7e28e92c-f8a7-447f-bd60-acc4dad2eff9/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6383">Succulents &amp; Sisterhood</a></h2>

			<div class="padded--head"><p>Alpha Phi’s first recruitment event of the year!</p>
</div>
				<p>
					<strong>Other | Salem Campus</strong><br>
					880 Mill Street
				</p>
</div>

<div class="date">

		<strong>January 24, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6409">ASWU Vice President Office Hours</a></h2>

			<div class="padded--head"><p>ASWU Vice President Sal Chapell has office hours to provide an opportunity for students to come by to ask questions, share concerns or ideas, or even just say hi! If these times don’t work for you, you can always reach the ASWU team by email: aswu@willamette.edu or contact Sal using aswu-vp@willamette.edu.</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					The Bistro
				</p>
</div>

<div class="date">

		<strong>January 24, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6406">Giddy Up with Alpha Chi!</a></h2>

			<div class="padded--head"><p>Play yard games, drink mocktails, and get to know Alpha Chi!</p>
</div>
				<p>
					<strong>Alpha Chi Omega | Salem Campus</strong><br>
					880 Mill Street
				</p>
</div>

<div class="date">

		<strong>January 26, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6436">Hallie Ford: Last day to add/drop or choose Audit (AUD) grading for full semester and first half-semester classes (at 5 p.m.)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 27, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4977">Last day to add/drop or choose Audit (AUD) grading for full semester and first half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>January 27, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6363">Spring Activities Fair and Carnival in the UC</a></h2>

			<div class="padded--head"><p>An introduction to student clubs and organizations as well as the resources available in the University Center.</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>January 27, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6443">
		<figure>
			<img alt="Almost Something poster" src="https://d1tvaw2qn8888b.cloudfront.net/cal-6d6d985a-f8e5-4206-a8a6-c395e0e95771/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6443">Almost Something</a></h2>

			<div class="padded--head"><p>A group exhibition of PNCA’s First Year MFA Candidates</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					B10 Gallery, 157 Gallery, Atrium Gallery 
				</p>
</div>

<div class="date">

		<strong>Jan 28, 2025<br><span class="date--end">– Feb 18, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6371">Academic Success Workshop</a></h2>

			<div class="padded--head"><p>Willamette College invites undergraduate students on the Salem Campus to attend an academic success workshop.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					301
				</p>
</div>

<div class="date">

		<strong>January 28, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6384">WU Stream: Last Lecture with the Provost Carol Long</a></h2>

			<div class="padded--head"><p>Carol S. Long is Willamette’s Provost and Senior Vice President. She helps to enhance collaboration among the schools of Willamette University and between student and academic affairs.</p>

<p>Long first joined Willamette University as a Professor of English in 1972. In roughly 45 years of service to the institution, she has served as department chair, associate dean, dean of the College of Arts &amp; Sciences, and finally as Provost and Senior Vice President.</p>

<p>She will retire at the end of the school year, bringing to a close one of the most storied of Willamette careers.</p>

<p>For those who had the good fortune of taking a class with Carol, and perhaps even more so for those who did not, we’re hosting her for one last lecture on Invisible Cities per Italo Calvino. The piece is a work of fiction imagining a conversation between an aged Kublai Khan and a young Marco Polo. Whether you’ve read it or not, you won’t want to miss Carol’s dive into this fascinating text.</p>
</div>
				<p>
					<strong>Virtual Event</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>January 28, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6420">Academic Success Workshop - Making Friends with Your Brain</a></h2>

			<div class="padded--head"><p>Unlock strategies for working with your brain’s unique quirks and capabilities. Learn practical tools to improve your academic experience.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					511
				</p>
</div>

<div class="date">

		<strong>January 29, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6398">
		<figure>
			<img alt="An illustration of two chocolate chip cookies stacked slightly on top of each other." src="https://d1tvaw2qn8888b.cloudfront.net/cal-d75d90cd-a459-40ad-ba95-5de871c0140c/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6398">Quad Cookie Social </a></h2>

			<div class="padded--head"><p>On January 29th from 4:30-6pm, the QUAD center will be hosting a cookie social where students can come and enjoy cookies.</p>

<p>Come join us and eat cookies</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					224
				</p>
</div>

<div class="date">

		<strong>January 29, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6421">Academic Success Workshop - Making Friends with Your Brain</a></h2>

			<div class="padded--head"><p>Unlock strategies for working with your brain’s unique quirks and capabilities. Learn practical tools to improve your academic experience.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					511
				</p>
</div>

<div class="date">

		<strong>January 30, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6368">
		<figure>
			<img alt="Book Cover of guest lecturer: Finding the Mother Tree, Discovering the Wisdom of the Forest by Suzanne Simard" src="https://d1tvaw2qn8888b.cloudfront.net/cal-272ec256-d51e-4cc9-9a11-9c5a29a9f0a5/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6368">Dempsey Environmental Lecture: Dr. Suzanne Simard</a></h2>

			<div class="padded--head"><p>Annual Dempsey Environmental Lecture featuring Dr. Suzanne Simard</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>January 30, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6146">Mark &amp; Melody Creative Writing Prizes at Willamette</a></h2>

			<div class="padded--head"><p>Submit one poem, one story, or one essay (15 pages maximum) between&nbsp;November 30, 2024 and January 31, 2025. Prizes announced mid-April.</p>
</div>
				<p>
					<strong>Eaton Hall | Salem Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>January 31, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6465">Catalyst Info Session</a></h2>

			<div class="padded--head"><p>Short info sessions will be held for those interested in learning more about the Catalyst position in the Office of Civic Engagement. We offer opportunities to preform civic service, and promote education while building community bonds.</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					Collaboration Commons in the Office of Civic Engagement
				</p>
</div>

<div class="date">

		<strong>January 31, 2025</strong><br>
		Friday


	
</div>
        </article>

    
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4980">Willamette Day (183 Years)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>February 1, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6407">Sexual Safety Kits with HIV Alliance</a></h2>

			<div class="padded--head"><p>Queer Student Union is working with HIV Alliance to build harm reduction and hygiene kits! Find comfort in community while helping out a great local organization.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					102
				</p>
</div>

<div class="date">

		<strong>February 1, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6088">
		<figure>
			<img alt="Photo of a person drinking from a cup" src="https://d1tvaw2qn8888b.cloudfront.net/cal-3c3dfcf0-8614-4143-950b-414809b5149c/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6088">Senior Recital: Jaylah Bennett</a></h2>

			<div class="padded--head"><p>This Little Life: Or, the Overachiever’s Journey to Appreciation &amp; Contentment is a musical journey that moves in stages from ambition and perfectionism to joy and contentment. The recital features various styles, from musical theatre, to art song, and folk, and has several staged numbers and guest performers. With all luck it will make you laugh, cry, and leave you with a sense of appreciation for the small things in life, even in bleak winter!</p>
</div>
				<p>
					<strong>G. Herbert Smith Auditorium | Salem Campus</strong><br>
					Smith Auditorium 
				</p>
</div>

<div class="date">

		<strong>February 1, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5528">Housing Contract for 2025-26 Opens - All Campuses</a></h2>

			<div class="padded--head"><p>Sign your housing contract to be eligible for housing in the Spring selection process.</p>
</div>
</div>

<div class="date">

		<strong>February 3, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4981">Last day to choose credit/no credit (CR/NC) grading for first half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>February 3, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6177">
		<figure>
			<img alt="Two people talking" src="https://d1tvaw2qn8888b.cloudfront.net/cal-c0e0b0ef-6dea-4d32-a267-7732e3900d79/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6177">Civic Commons</a></h2>

			<div class="padded--head"><p>Willamette’s Civic Commons brings together University community members in both Salem and Portland to showcase our existing work and inspire new collaborations around the Strategic Plan’s theme of democratic institutions and engaged democracy.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>February 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6178">
		<figure>
			<img alt="Two people talking" src="https://d1tvaw2qn8888b.cloudfront.net/cal-8a5c426f-c683-44ed-b1b0-d734c143c679/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6178">Civic Commons</a></h2>

			<div class="padded--head"><p>Willamette’s Civic Commons brings together University community members in both Salem and Portland to showcase our existing work and inspire new collaborations around the Strategic Plan’s theme of democratic institutions and engaged democracy.</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>February 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6372">Academic Success Workshop</a></h2>

			<div class="padded--head"><p>Willamette College invites undergraduate students on the Salem Campus to attend an academic success workshop.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					301
				</p>
</div>

<div class="date">

		<strong>February 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6387">No Job Experience? No Problem! Resume Workshop</a></h2>

			<div class="padded--head"><p>Learn how to create a quality resume even without having job or internship experience.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Digital Learning Studio - Ford 101
				</p>
</div>

<div class="date">

		<strong>February 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6481">Documentary Screening: No Place to Grow Old</a></h2>

			<div class="padded--head"><p>No Place To Grow Old is a powerful documentary that delves into the growing crisis of senior homelessness right here in Oregon.</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					122
				</p>
</div>

<div class="date">

		<strong>February 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4982">Last day to withdraw from first half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>February 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6476">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-d79ca847-d162-492b-87f7-22f175fff073/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6476">Brenda Mallory: Common Connections</a></h2>

			<div class="padded--head"><p>Join us for the opening reception of Common Connections, a solo exhibition of works by Portland-based artist Brenda Mallory. This satellite exhibition of three works by Mallory is presented concurrently with The North Star Changes, a survey of works by Brenda Mallory at the Hallie Ford Museum of Art, curated by Rebecca Dobkins.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					Ed Cauduro and Dane Nelson Collection Studies Lab
				</p>
</div>

<div class="date">

		<strong>Feb  6, 2025<br><span class="date--end">– Apr  3, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<a href="/e/6179">
		<figure>
			<img alt="People look at art displays at First Thursday at PNCA" src="https://d1tvaw2qn8888b.cloudfront.net/cal-0939c4b8-8314-46a0-a0ca-c8e29d842137/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6179">February First Thursday at PNCA + North Park Blocks!</a></h2>

			<div class="padded--head"><p>Join us in the North Park Blocks in downtown Portland for exhibition openings, live music, refreshments and performances!</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>February 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6475">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-8aa13539-4068-4a92-8099-5183da60a25f/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6475">Eyes &amp; Ears</a></h2>

			<div class="padded--head"><p>Visuals in Music 2020–2024, an exhibit curated by Bijan Berahimi on display from February 6 to April 3, 2025. Showcasing vinyl packaging, tour posters and merchandise with music videos co-curated by Noah Porter, the exhibition examines some of the most exciting visual work from the last four years.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					Center Contemporary Art and Culture, The Dorothy Lemelson Innovation Studio, Ed Cauduro and Dane Nelson Collection Studies Lab
				</p>
</div>

<div class="date">

		<strong>Feb  6, 2025<br><span class="date--end">– Apr  3, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6480">Know Your Rights Info Session: Navigating Immigration Policy</a></h2>

			<div class="padded--head"><p>Join us for an empowering and informative session designed to help you understand your rights as they relate to immigration policy.</p>
</div>
				<p>
					<strong>Truman Wesley Collins Legal Center | Salem Campus</strong><br>
					Law 201
				</p>
</div>

<div class="date">

		<strong>February 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/5947">
		<figure>
			<img alt="HFMA First Friday Art Walk" src="https://d1tvaw2qn8888b.cloudfront.net/cal-ea86e69a-35db-4a1a-b531-7625ade089c3/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/5947">HFMA First Friday Salem Art Walk</a></h2>

			<div class="padded--head"><p>Start your First Friday Art Walk at the Hallie Ford Museum of Art and get ready for an evening of fun and art in Salem!</p>
</div>
				<p>
					<strong>Hallie Ford Museum of Art | Salem Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>February 7, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6472">
		<figure>
			<img alt="Two women reaching out to touch hands with a castle landscape in the background. The left side and woman placed in the bottom left are in pinks and light hues, while the right side and woman placed in the top right are in greens, blacks, and dark hues." src="https://d1tvaw2qn8888b.cloudfront.net/cal-1d62c0eb-f033-482c-87e2-2af5fd8615ef/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6472">Movie Night with the Alumni Office: Wicked</a></h2>

			<div class="padded--head"><p>Bring your blankets and sleepover energy for one of the most pop-u-lar movie musicals of the year!</p>
</div>
				<p>
					<strong>Other | Salem Campus</strong><br>
					Montag Den
				</p>
</div>

<div class="date">

		<strong>February 7, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6405">
		<figure>
			<img alt="Poster for the event" src="https://d1tvaw2qn8888b.cloudfront.net/cal-64304469-cad0-4597-bb37-de0bebeac05a/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6405">Lunar New Year Celebration</a></h2>

			<div class="padded--head"><p>Join Sinophone Cultural Association (SCA) and the Global Cultural Studies Department in celebrating the Year of the Snake!</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					Cat Cavern
				</p>
</div>

<div class="date">

		<strong>February 9, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5406">Last day for students to submit work to faculty for grading to replace grades of Incomplete (I) from the fall semester.</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>February 11, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6379">
		<figure>
			<img alt="a pink laptop surrounded by sparkles inside a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-419a23cf-7df9-41fd-b8fc-edf790af032d/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6379">Canva Tips and Tricks!</a></h2>

			<div class="padded--head"><p>Come learn to use Canva for presentations, graphics, video editing, and poster-making with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>February 11, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6478">CAFES Grant Writing Workshop</a></h2>

			<div class="padded--head"><p>A joint grant writing workshop for CAS, Law, and MBA students</p>
</div>
				<p>
					<strong>Putnam University Center | Salem Campus</strong><br>
					Autzen Conference Room
				</p>
</div>

<div class="date">

		<strong>February 11, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6477">LA Fire Relief Fundraiser </a></h2>

			<div class="padded--head"><p>Climate Action Alliance will be hosting a Valentine’s themed bake sale and craft fundraiser to raise money for 3 non-profit organizations that are helping LA recover from the recent wildfires. The fundraiser will take place on February 12th and 13th from 11:00 AM to 2:00 PM in Jackson Plaza. If you would like to donate crafts or baked goods, please DM: @wuclimateaction or Email: aebirchwright@willamette.edu.</p>
</div>
				<p>
					<strong>Outdoors | Salem Campus</strong><br>
					Jackson Plaza 
				</p>
</div>

<div class="date">

		<strong>February 12, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6388">Ready, Set, Search! | Job Search Workshop</a></h2>

			<div class="padded--head"><p>Join Career Development &amp; The Writing Center in a collaboration to learn tips &amp; tricks towards an approachable job search!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Writing Center
				</p>
</div>

<div class="date">

		<strong>February 12, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6444">
		<figure>
			<img alt="Almost Something poster" src="https://d1tvaw2qn8888b.cloudfront.net/cal-6f8c7fc9-3daa-46c3-8a4c-da39b995ac34/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6444">Almost Something Public Reception</a></h2>

			<div class="padded--head"><p>A celebration of the accomplishments and work of the First Year MFA Candidates at PNCA</p>
</div>
</div>

<div class="date">

		<strong>February 13, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6445">
		<figure>
			<img alt="A lone tree stands barren in a hazy background" src="https://d1tvaw2qn8888b.cloudfront.net/cal-c62e2d49-21c3-462d-abf3-78dbafd12a3d/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6445">PREVIEW: Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 13, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4983">Last day for students to submit work to faculty for grading to replace grades of Incomplete (I) from the fall semester.</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>February 14, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6359">
		<figure>
			<img alt="Dr. Ahmen" src="https://d1tvaw2qn8888b.cloudfront.net/cal-ed52fcf0-eb19-42fd-a43e-2619c1428ee8/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6359">The Price of Metaphor:  Machine Minds and Missteps in Neuroscience</a></h2>

			<div class="padded--head"><p>A Lecture by Dr. Sama Ahmed
Professor of Psychology, University of Washington</p>
</div>
				<p>
					<strong>Eaton Hall | Salem Campus</strong><br>
					209
				</p>
</div>

<div class="date">

		<strong>February 14, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6446">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-d7e97038-8b8f-4363-a761-de51db71034d/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6446">OPENING NIGHT: Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 14, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6364">Team Jigsaw Puzzling Competition</a></h2>

			<div class="padded--head"><p>How fast can you puzzle? Grab a team of 4 and join WEB at this fun event.</p>
</div>
				<p>
					<strong>Baxter Hall | Salem Campus</strong><br>
					Montag Den
				</p>
</div>

<div class="date">

		<strong>February 15, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6479">Poetry Party at the Community Gardens</a></h2>

			<div class="padded--head"><p>ASWU, in conjunction with BSU, will be hosting an event exploring African-American ecology through poetry. Catering will be provided by Bon Appetit.</p>
</div>
				<p>
					<strong>Other | Salem Campus</strong><br>
					Community Gardens
				</p>
</div>

<div class="date">

		<strong>February 15, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6361">Junior Recital: Zach Martin &amp; Hannah Rowe</a></h2>

			<div class="padded--head"><p>Students of Dr. Emily Stanek’s studio will be performing a combined recital. With music from 1700s to modern times, this recital is celebrating flute repertoire and the skills of both players as soloists and collaborative musicians.</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>February 15, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6447">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-cf230514-6ea6-4911-8917-7504e33836b3/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6447">Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 15, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6452">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-d4e8cd8d-da6c-4997-b3c8-48ff8949e873/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6452">MATINEE: Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 16, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6362">Senior Recital: Karina May</a></h2>

			<div class="padded--head"><p>All are welcome to this free event.</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>February 16, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<a href="/e/6402">
		<figure>
			<img alt="Professor Seth Rockman" src="https://d1tvaw2qn8888b.cloudfront.net/cal-ba88949a-d942-47b5-afe9-6ede5e2d70e3/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6402">Annual Frost Lecture with Professor Seth Rockman</a></h2>

			<div class="padded--head"><p>Annual Frost Lecture with Professor Seth Rockman
Plantation Goods: A Material History of American Slavery
Monday February 17, 2025
7:30pm</p>
</div>
				<p>
					<strong>Truman Wesley Collins Legal Center | Salem Campus</strong><br>
					John C. Paulus Lecture Hall, room 201
				</p>
</div>

<div class="date">

		<strong>February 17, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6090">
		<figure>
			<img alt="Photo of performers dressed in formal black attire. " src="https://d1tvaw2qn8888b.cloudfront.net/cal-3f318597-0769-449a-b542-205d0422e026/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6090">Grace Goudy Distinguished Artist Series: Cantores in Ecclesia Vocal Ensemble</a></h2>

			<div class="padded--head"><p>Cantores in Ecclesia, directed by Blake Applegate, is a specialized vocal
ensemble dedicated to the preservation and promotion of Gregorian chant and
sacred polyphony in liturgical context within the Latin Mass of the
Catholic Church.</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>February 19, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6448">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-02cd4c8c-6b2e-42cd-86bc-ab6ad4365c30/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6448">Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 19, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6471">Building Resilience During the Job Search Workshop</a></h2>

			<div class="padded--head"><p>Join Career Development for a helpful workshop to teach ways to stay strong through the job search!</p>
</div>
				<p>
					<strong>Other | Salem Campus</strong><br>
					Renjen Center
				</p>
</div>

<div class="date">

		<strong>February 20, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6482">Heritage Club at Willamette’s Far Away Performance</a></h2>

			<div class="padded--head"><p>Join fellow alumni greater than 50 years out from graduation for this exceptional performance and a pre-performance gathering at the Taproot Old Mill Café.</p>
</div>
				<p>
					<strong>Other | Salem Campus</strong><br>
					Pelton Theatre
				</p>
</div>

<div class="date">

		<strong>February 20, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6449">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-4b9b055f-9495-4250-a86c-f1cf9fc7329e/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6449">Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 20, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6365">Mindful Yoga</a></h2>

			<div class="padded--head"><p>Join Willamette Alum Mikki Trowbridge as she leads a mindful yoga session.</p>
</div>
				<p>
					<strong>Lestle J. Sparks Center | Salem Campus</strong><br>
					Multi-purpose Room 108
				</p>
</div>

<div class="date">

		<strong>February 21, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6483">Willamette Graduate Open House</a></h2>

			<div class="padded--head"><p>Join us to connect with the alumni community, discuss career advancement options, and explore the new EcoTrust building.&nbsp;&nbsp;</p>

<p>Faculty will host informational sessions about&nbsp;Willamette’s Master’s in Data Science, Master’s in Computer Science, and MBA programs.</p>

<p>Food will be served at a reception where you can mingle with Willamette alumni, faculty, and trustees.</p>

</div>
				<p>
					<strong>EcoTrust Building</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>February 21, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6450">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-7a1f4b84-e59c-4919-9a64-b5fa34f74ca0/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6450">Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 21, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6453">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-947392f3-df44-4393-9736-9d5e7983a1dc/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6453">MATINEE: Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 22, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6451">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-e7b51080-c959-46f4-924f-f56fd0dcdc19/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6451">Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 22, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6454">
		<figure>
			<img alt="A lone tree stands barren in a hazy background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-46adfbdf-0aef-44e6-b631-5042c53da83e/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6454">MATINEE: Far Away</a></h2>

			<div class="padded--head"><p>Willamette University Theatre presents a modern fable about nature at war with herself.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>February 23, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<a href="/e/6092">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-1bc25a59-1902-4d25-b06e-562cf73a688f/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6092">Winter Choral Concert</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>February 23, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4985">Last day to choose credit/no credit (CR/NC) grading for full semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>February 24, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6442">
		<figure>
			<img alt="Doughnuts with the Deans of PNCA poster" src="https://d1tvaw2qn8888b.cloudfront.net/cal-7062f9b4-5e03-4204-8b54-69e9b23a717e/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6442">Doughnuts with the Deans of PNCA</a></h2>

			<div class="padded--head"><p>Join PNCA Dean Cole and Dean of Student Potts for monthly casual conversations. These informal gatherings offer a relaxed setting where you can drop by, grab a cup of coffee, a doughnut, and chat.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					Hammer Boardroom 
				</p>
</div>

<div class="date">

		<strong>February 24, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4984">Spring In-Service</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>February 25, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6390">The Immigrant Story Pre Conversation </a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Waller Hall | Salem Campus</strong><br>
					Cone Chapel 
				</p>
</div>

<div class="date">

		<strong>February 25, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6380">
		<figure>
			<img alt="a pink laptop surrounded by sparkles inside a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-af21819e-bf91-446a-bb77-ac89a5bffe1d/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6380">Video &amp; Audio editing!</a></h2>

			<div class="padded--head"><p>Learn to use the free video &amp; audio editing programs available to you with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>February 26, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<a href="/e/6473">
		<figure>
			<img alt="An ensemble of humans, creatures, and fantastical imagery centered in the poster in purples, reds, and blues. A orange maze is behind a menacing humanoid figure with impressive 80s era hair at the top center of the ensemble. A young woman in white with a faint white white castle behind her and purply silver mist all around is at the middle of the ensemble." src="https://d1tvaw2qn8888b.cloudfront.net/cal-5460dd03-0564-4f07-bcf2-7cd42c02829b/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6473">Movie Night with the Alumni Office: Labyrinth</a></h2>

			<div class="padded--head"><p>Through dangers untold and hardships unnumbered…come see this iconic 80s magic film complete with Jim Henson muppets and David Bowie!</p>
</div>
				<p>
					<strong>Other | PNCA Campus</strong><br>
					Mediatheque
				</p>
</div>

<div class="date">

		<strong>February 27, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6404">
		<figure>
			<img alt="Dr. Kiersten Neumann" src="https://d1tvaw2qn8888b.cloudfront.net/cal-d5c95298-2866-4314-bf9e-059c7ca34c66/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6404">CASA/AIA 2025 Spring Lecture series with Dr. Kiersten Neumann </a></h2>

			<div class="padded--head"><p>CASA/AIA 2025 Spring Lecture series with Dr. Kiersten Neumann (2024-2025 AIA Kershaw Lecturer). From Ancient Quarries to New Inquiries: Exhibiting the ISAC Museum’s Roman Sculpture Collection in an Age of GreaterTransparency</p>
</div>
				<p>
					<strong>Truman Wesley Collins Legal Center | Salem Campus</strong><br>
					John C. Paulus Lecture Hall-Room 201
				</p>
</div>

<div class="date">

		<strong>February 27, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6091">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-eb2cc97d-4ed9-4412-ba38-832054d2b606/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6091">Willamette Singers and Jazz Combos with special guest Garrett Baxter</a></h2>

			<div class="padded--head"><p>Join us for an evening of jazz where the Willamette Singers will debut a new piece by Garrett Baxter, who is also performing with the Singers.</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>February 27, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4989">Midterm grades due</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>February 28, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6389">Launch Your Job Search Workshop</a></h2>

			<div class="padded--head"><p>Come join Career Development to learn some best practices towards getting your job search off the ground!</p>
</div>
				<p>
					<strong>Collins Science Center | Salem Campus</strong><br>
					Collins 323
				</p>
</div>

<div class="date">

		<strong>February 28, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6366">Spring Craft Fair Day 1</a></h2>

			<div class="padded--head"><p>Check out and purchase some amazing work from your Willamette community!</p>
</div>
				<p>
					<strong>Baxter Hall | Salem Campus</strong><br>
					Montag Den
				</p>
</div>

<div class="date">

		<strong>February 28, 2025</strong><br>
		Friday


	
</div>
        </article>

    
    
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6367">Spring Craft Fair Day 2</a></h2>

			<div class="padded--head"><p>Check out and purchase some amazing work from your Willamette community!</p>
</div>
				<p>
					<strong>Baxter Hall | Salem Campus</strong><br>
					Montag Den
				</p>
</div>

<div class="date">

		<strong>March 1, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6184">
		<figure>
			<img alt="Flowing treble music staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-481b7e41-101b-447c-99f4-f3ec9506dbd4/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6184">Faculty Recital: James Miley with Jazz Ensemble</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Rogers Rehearsal Hall
				</p>
</div>

<div class="date">

		<strong>March 2, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4987">Last day of first half-semester classes (final exams administered in class)</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>March 3, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4988">First day of second half-semester classes</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>March 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6392">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-f5a3aaf3-954b-42cf-8df9-e28c7a0c754c/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6392">Spruce Up Your Slides &amp; Presentations!</a></h2>

			<div class="padded--head"><p>Get your SSRD presentation ready with the Digital Learning Studio student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>March 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6400">The Immigrant Story Live </a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Hall 
				</p>
</div>

<div class="date">

		<strong>March 4, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4986">Registration for Summer Courses</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>March 5, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6422">Academic Success Workshop - Embracing Progress: Overcoming Perfectionism</a></h2>

			<div class="padded--head"><p>In this transformative workshop we’ll explore how to over barriers impacting your creativity and academic success. We’ll look at the root of perfectionism and learn tools to shift that mindset.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					511
				</p>
</div>

<div class="date">

		<strong>March 5, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6423">Academic Success Workshop - Embracing Progress: Overcoming Perfectionism</a></h2>

			<div class="padded--head"><p>In this transformative workshop we’ll explore how to over barriers impacting your creativity and academic success. We’ll look at the root of perfectionism and learn tools to shift that mindset.</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					511
				</p>
</div>

<div class="date">

		<strong>March 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6410">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star

" src="https://d1tvaw2qn8888b.cloudfront.net/cal-6b1cbb5a-f027-4422-913a-ba3ac25670e2/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6410">Perfect your Project Poster</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford 101
				</p>
</div>

<div class="date">

		<strong>March 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6413">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-1e104d4b-9ed3-4a57-9ec0-c1d5bebd7ec6/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6413">Perfect your project poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Digital Leraning Studio
				</p>
</div>

<div class="date">

		<strong>March 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6180">
		<figure>
			<img alt="People look at an art display at First Thursday at PNCA" src="https://d1tvaw2qn8888b.cloudfront.net/cal-87d84b27-a4a9-4a6d-b9b4-ca8a708c7946/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6180">March First Thursday at PNCA + North Park Blocks!</a></h2>

			<div class="padded--head"><p>Join us in the North Park Blocks for exhibition openings, live music, refreshments and performances!</p>
</div>
				<p>
					<strong>Arlene and Harold Schnitzer Center for Art and Design | PNCA Campus</strong><br>
					
				</p>
</div>

<div class="date">

		<strong>March 6, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6474">
		<figure>
			<img alt="Two figures stand in the center of parted clear blue waves under a bright sunny blue sky with mountains to the right covered in green. The female figure on the left is adorned in pinkish red and white clothes, holding a tan oar across the back of her shoulders. The male figure on the right is covered with striking tattoos as he holds a large white hook that is taller than both figures and rests on the pale sand they stand upon. To the left of the female figure a small white pig and multicolored rooster can be seen. The &quot;Moana&quot; movie title and font with the Disney logo is seen at the bottom center of the poster." src="https://d1tvaw2qn8888b.cloudfront.net/cal-260da8df-b2e3-4655-b326-11eeb37581ba/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6474">Movie Night with the Alumni Office: Moana</a></h2>

			<div class="padded--head"><p>The pool calls you! Jump right on in and enjoy this Disney-Pixar classic, complete with floatation devices so you can focus on singing along to your heart’s content.</p>
</div>
				<p>
					<strong>Lestle J. Sparks Center | Salem Campus</strong><br>
					Sparks Pool
				</p>
</div>

<div class="date">

		<strong>March 8, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6093">
		<figure>
			<img alt="" src="https://d1tvaw2qn8888b.cloudfront.net/cal-3e6b53a4-901e-4a66-a30a-ec902ca634a8/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6093">Fete des Femmes</a></h2>

			<div class="padded--head"><p>In its fourth annual tribute to International Women’s Day, Willamette Music brings together an extraordinary array of performances from around the globe and through the decades, all in celebration of countless contributions women have made to the world of music. Join us in celebrating the timeless voices and talents that have paved the way for centuries of female musicians and artists.</p>
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>March 8, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6381">
		<figure>
			<img alt="a pink laptop surrounded by sparkles inside a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-3874c05e-ee41-4570-aad3-5471191b567f/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6381">iMovie Tips &amp; Tricks!</a></h2>

			<div class="padded--head"><p>Interested in getting better at iMovie? Learn more with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>March 11, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6416">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-117d5a8c-9ded-43a8-9f11-8c6946524e3b/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6416">Perfect your project poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Digital Learning Studio Ford 101
				</p>
</div>

<div class="date">

		<strong>March 11, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/6391">The Immigrant Story Post Conversation </a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Waller Hall | Salem Campus</strong><br>
					Cone Chapel 
				</p>
</div>

<div class="date">

		<strong>March 11, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5821">Last day to withdraw from full-semester classes* (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 12, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4994">Last day to withdraw from full-semester classes* (full withdrawal only) (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 12, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5840">Last day to withdraw from full-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 13, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6393">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-6093fead-488c-4661-899c-38272f29193d/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6393">Spruce up your slides &amp; presentation!</a></h2>

			<div class="padded--head"><p>Get your slides and presentations ready for SSRD with the DLS student specialists</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>March 13, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4992">Last day to withdraw from full-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 14, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4993">Last day to withdraw from full-semester classes* (full withdrawal only) (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 14, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6185">
		<figure>
			<img alt="Flowing treble music staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-6f80f254-4af1-41eb-8543-75de0d0c4ea1/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6185">Dramatic Vocal Arts Presents The Little Prince</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>G. Herbert Smith Auditorium | Salem Campus</strong><br>
					Smith Auditorium
				</p>
</div>

<div class="date">

		<strong>March 15, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6186">
		<figure>
			<img alt="Flowing treble music staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-142abf9e-4880-4684-8bdc-5ed76ea5ca51/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6186">Dramatic Vocal Arts Presents The Little Prince</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>G. Herbert Smith Auditorium | Salem Campus</strong><br>
					Smith Auditorium
				</p>
</div>

<div class="date">

		<strong>March 16, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4991">Last day to withdraw from full-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 17, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4998">Last day to add/drop or choose Audit (AUD) grading for second half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 17, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6395">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-8d76fd3b-9121-483a-b490-2077b8498378/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6395">Spruce up your slides &amp; presentation!</a></h2>

			<div class="padded--head"><p>Get your slides and presentations ready for SSRD with the DLS student specialists</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford Hall 101 - Digital Learning Studio
				</p>
</div>

<div class="date">

		<strong>March 17, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6187">
		<figure>
			<img alt="Flowing treble music staff with music notes" src="https://d1tvaw2qn8888b.cloudfront.net/cal-d5a96633-2880-4070-bc2d-e7411c07478b/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6187">Jazz Collective feat. Patty Darling</a></h2>

			<div class="padded--head">
</div>
				<p>
					<strong>Mary Stuart Rogers Music Center | Salem Campus</strong><br>
					Hudson Concert Hall
				</p>
</div>

<div class="date">

		<strong>March 18, 2025</strong><br>
		Tuesday


	
</div>
        </article>
        <article>
          	<a href="/e/6412">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-1fbdde6f-ca76-4d2d-9988-3641bbd3cc76/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6412">Perfect your project poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>

</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford 101
				</p>
</div>

<div class="date">

		<strong>March 19, 2025</strong><br>
		Wednesday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5529">Last Board Meal - Dinner - Salem Campus</a></h2>

			<div class="padded--head"><p>Last meal before Spring Break.</p>
</div>
</div>

<div class="date">

		<strong>March 21, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5531">Spring Break - All Campuses</a></h2>

			<div class="padded--head"><p>Residence Halls are open during Spring Break.</p>
</div>
</div>

<div class="date">

		<strong>Mar 24, 2025<br><span class="date--end">– Mar 28, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/4999">Spring Break</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>Mar 24, 2025<br><span class="date--end">– Mar 28, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5716">Dining Services - Salem Campus</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>Mar 24, 2025<br><span class="date--end">– Mar 28, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5532">Meal Plans Resume - Salem Campus</a></h2>

			<div class="padded--head"><p>Meal Plans resume with dinner.</p>
</div>
</div>

<div class="date">

		<strong>March 30, 2025</strong><br>
		Sunday


	
</div>
        </article>
        <article>
          	<div class="image-container">
		<div class="compass"></div>
	</div>
<div class="detail">
	    <h2><a href="/e/5000">Last day to choose credit/no credit (CR/NC) grading for second half-semester classes (5 p.m. deadline)</a></h2>

			<div class="padded--head">
</div>
</div>

<div class="date">

		<strong>March 31, 2025</strong><br>
		Monday


	
</div>
        </article>
        <article>
          	<a href="/e/6415">
		<figure>
			<img alt="pink laptop surrounded by sparkles against a blue multi-pointed star" src="https://d1tvaw2qn8888b.cloudfront.net/cal-2172168e-b31d-4b5b-b0f1-8a51af77d196/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6415">Perfect your Project Poster!</a></h2>

			<div class="padded--head"><p>Work on your SSRD project poster with the DLS student specialists!</p>
</div>
				<p>
					<strong>Ford Hall | Salem Campus</strong><br>
					Ford 101
				</p>
</div>

<div class="date">

		<strong>March 31, 2025</strong><br>
		Monday


	
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
        </div>
`

/*----        <article>
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

		<strong>Apr  1, 2025<br><span class="date--end">– Apr  7, 2025</span></strong><br>

	
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
          	<a href="/e/6455">
		<figure>
			<img alt="Root tissue grows over half the image, as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-cb17bb10-ac5d-4637-9dd4-76d12f5631d4/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6455">PREVIEW: Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 10, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6456">
		<figure>
			<img alt="Root tissue grows over half the image, as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-09ef9b61-92b5-4fdd-ba14-18f938a2537d/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6456">OPENING NIGHT: Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 11, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6457">
		<figure>
			<img alt="Root tissue grows over half the image, as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-f55e602e-e4e8-4e49-a101-1abd4e397fca/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6457">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 12, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6458">
		<figure>
			<img alt="Root tissue grows over half the image, as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-231ee189-6bbe-4f9d-b286-03845dc3906c/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6458">MATINEE: Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 13, 2025</strong><br>
		Sunday


	
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

		<strong>Apr 14, 2025<br><span class="date--end">– Apr 18, 2025</span></strong><br>

	
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
          	<a href="/e/6459">
		<figure>
			<img alt="Root tissue grows over half the image, as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-7920753c-b200-4f23-a747-6865c0a7e1f5/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6459">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
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
          	<a href="/e/6460">
		<figure>
			<img alt="Root tissue grows over half the image, as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-ec74c461-b312-40a9-8380-fc78e58ed0ed/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6460">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 17, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6461">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-bc1759d8-353c-4bca-8436-8b3a04f520bf/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6461">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 18, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6462">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-4c6d1b2a-ad99-44b1-b983-714384f47923/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6462">MATINEE: Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 19, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6463">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-a040d883-f460-4882-bccc-9d3c83c3598e/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6463">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 19, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6464">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-d4c87762-d76a-41c3-8db9-debbb790d39c/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6464">MATINEE: Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 20, 2025</strong><br>
		Sunday


	
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

		<strong>Apr 23, 2025<br><span class="date--end">– May  2, 2025</span></strong><br>

	
</div>
        </article>
        <article>
          	<a href="/e/6466">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-1ef6f411-46ec-4860-bfc8-8d918cba7ca3/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6466">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 23, 2025</strong><br>
		Wednesday


	
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
          	<a href="/e/6467">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-2a28ba9b-c52c-4db0-b77f-809fda1c1356/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6467">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 24, 2025</strong><br>
		Thursday


	
</div>
        </article>
        <article>
          	<a href="/e/6468">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-8b1f3c02-c520-44bd-9a10-5f6bbe110603/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6468">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 25, 2025</strong><br>
		Friday


	
</div>
        </article>
        <article>
          	<a href="/e/6469">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-0c66b48b-6538-4e0c-8603-642580e27784/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6469">MATINEE: Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 26, 2025</strong><br>
		Saturday


	
</div>
        </article>
        <article>
          	<a href="/e/6470">
		<figure>
			<img alt="Root tissue grows over half the image as sun spots dot the background." src="https://d1tvaw2qn8888b.cloudfront.net/cal-e04bb43c-0b5a-42c5-84c5-6977dd29ab69/square.jpg">
		</figure>
</a><div class="detail">
	    <h2><a href="/e/6470">Bloom Bloom Pow</a></h2>

			<div class="padded--head"><p>Willamette University Theatre puts an approachable spin on the climate change conversation in Bloom Bloom Pow.</p>
</div>
				<p>
					<strong>M. Lee Pelton Theatre | Salem Campus</strong><br>
					Main Stage
				</p>
</div>

<div class="date">

		<strong>April 26, 2025</strong><br>
		Saturday


	
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
	    <h2><a href="/e/5023">Final examinations</a></h2>

			<div class="padded--head"></div>
</div>

<div class="date">

		<strong>Apr 29, 2025<br><span class="date--end">– May  2, 2025</span></strong><br>

	
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

		<strong>Apr 30, 2025<br><span class="date--end">– May  1, 2025</span></strong><br>

	
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
-----*/

// Load HTML into Cheerio
const $ = cheerio.load(allHtml)

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

// console.log(JSON.stringify(events, null, 2))

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
const generateSQL = (events: EventData[]) => {
  // Generate event insert SQL
  const eventInsertSQL = `
INSERT INTO events (title, link, description, pub_date, event_start_date, event_end_date, location, image_url) VALUES 
${events
  .map((event) => {
    // if (event.date === 'Jan  2, 2025– Jan 11, 2025') {
    //   console.log(event.date)
    // }
    let startDateString = null
    let endDateString = null
    if (event.date.includes('–')) {
      // hyphen not a minus sign
      let dateStrings = event.date.split('–') // hyphen not a minus sign
      // if (event.date === 'Jan  2, 2025– Jan 11, 2025') {
      //   console.log(dateStrings)
      // }
      if (dateStrings.length >= 1) {
        startDateString = `${dateStrings[0].trim()}`
      }
      if (dateStrings.length === 2) {
        endDateString = `${dateStrings[1].trim()}`
      }
    } else {
      startDateString = event.date.trim()
    }
    if (startDateString !== null && endDateString !== null) {
      return `('${event.title.replace(/'/g, "''")}', '${event.link}', '${
        event.description
      }', '${startDateString}', '${startDateString}', '${endDateString}', '${
        event.location
      }','${event.imageUrl}' )`
    } else if (startDateString !== null) {
      return `('${event.title.replace(/'/g, "''")}', '${event.link}', '${
        event.description
      }', '${startDateString}', '${startDateString}', null, '${
        event.location
      }','${event.imageUrl}' )`
    } else if (startDateString === null && endDateString === null) {
      return `('${event.title.replace(/'/g, "''")}', '${event.link}', '${
        event.description
      }', '${startDateString}', '${startDateString}', null, '${
        event.location
      }','${event.imageUrl}' )`
    }
  })
  .join(',\n')}
;`

  // Collect unique tags
  const uniqueTags = Array.from(new Set(events.flatMap((event) => event.tags)))

  const tagInsertSQL = `
INSERT INTO tags (name) VALUES 
${uniqueTags.map((tag) => `('${tag.replace(/'/g, "''")}')`).join(',\n')}
;`

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
