## iCalendar Fields and the JSCalendar Equivalents

Ref: RFC 5545 covers iCalendar, RFC 8984 covers JSCalendar

See https://en.wikipedia.org/wiki/ICalendar and

### Core Fields

| **iCalendar**   | **JSCalendar Equivalent** | Notes                                                                        |
| --------------- | ------------------------- | ---------------------------------------------------------------------------- |
| `UID`           | `id`                      | Unique identifier (as a URI or UUID).                                        |
| `DTSTAMP`       | `created`                 | Creation timestamp (ISO 8601 format).                                        |
| `LAST-MODIFIED` | `updated`                 | Last modification timestamp.                                                 |
| `SEQUENCE`      | `etag` + `updated`        | Versioning via `etag` and timestamps.                                        |
| `CLASS`         | `privacy`                 | Values: `"public"`, `"private"`, `"secret"`.                                 |
| `STATUS`        | `status`                  | E.g., `"confirmed"`, `"cancelled"` (for events) or `"needs-action"` (tasks). |

### Descriptive Fields

| **iCalendar** | **JSCalendar Equivalent**        | Notes                                                          |
| ------------- | -------------------------------- | -------------------------------------------------------------- |
| `SUMMARY`     | `title`                          | Event/task title.                                              |
| `DESCRIPTION` | `description`                    | Plain text or HTML.                                            |
| `LOCATION`    | `locations[]`                    | Array of location objects (with `name`, `coordinates`, `rel`). |
| `CATEGORIES`  | `categories`                     | Array of category labels.                                      |
| `RESOURCES`   | `links[]`                        | Array of resource links.                                       |
| `URL`         | `links[].href`                   | Links with `rel` types (e.g., `"enclosure"`, `"describedby"`). |
| `ATTACH`      | `links[]` with `rel="enclosure"` | Attachments as link objects.                                   |

### Dates and Times

| **iCalendar** | **JSCalendar Equivalent** | Notes                                                 |
| ------------- | ------------------------- | ----------------------------------------------------- |
| `DTSTART`     | `start`                   | ISO 8601 timestamp (e.g., `"2023-10-01T09:00:00"`).   |
| `DTEND`       | `end`                     | For events.                                           |
| `DUE`         | `due`                     | For tasks.                                            |
| `DURATION`    | `duration`                | ISO 8601 duration format (e.g., `"PT1H"` for 1 hour). |

### Recurrence

| **iCalendar**   | **JSCalendar Equivalent** | Notes                                                             |
| --------------- | ------------------------- | ----------------------------------------------------------------- |
| `RRULE`         | `recurrenceRules`         | Array of recurrence rule objects (simpler syntax than iCalendar). |
| `EXDATE`        | `excluded`                | Array of excluded recurrence instances.                           |
| `RDATE`         | `included`                | Array of added recurrence instances.                              |
| `RECURRENCE-ID` | `recurrenceId`            | Identifies a specific recurrence override.                        |

### Participants

| **iCalendar**    | **JSCalendar Equivalent**       | Notes                                                      |
| ---------------- | ------------------------------- | ---------------------------------------------------------- |
| `ORGANIZER`      | `participants[].roles.owner`    | Participants array with roles (`owner`, `attendee`, etc.). |
| `ATTENDEE`       | `participants[].roles.attendee` | Includes RSVP status (`participationStatus`) and details.  |
| `REQUEST-STATUS` | `participants[].progress`       | Task-specific progress tracking.                           |

### Alerts and Triggers

| **iCalendar** | **JSCalendar Equivalent** | Notes                                                                                       |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `TRIGGER`     | `alerts[]`                | Array of alert objects with `trigger` (ISO 8601 duration) and `action` (e.g., `"display"`). |

### Other

| **iCalendar**      | **JSCalendar Equivalent** | Notes                                                   |
| ------------------ | ------------------------- | ------------------------------------------------------- |
| `PRIORITY`         | `priority`                | Integer (0–9, same as iCalendar).                       |
| `RELATED-TO`       | `relatedTo[]`             | Array of relations to other events/tasks.               |
| `TRANSP`           | `showWithoutTime`         | Boolean (if `true`, event is displayed as "free" time). |
| `GEO`              | `locations[].coordinates` | Latitude/longitude in a location object.                |
| `PERCENT-COMPLETE` | `progress`                | Task progress (0–100).                                  |
| `COMMENT`          | `comments[]`              | Array of comment objects.                               |

## Full List of ICS Fields (Including proprietary fields)

### Standard iCalendar (ICS) Fields

| Field            | Description                                                | Example/Values                                                            |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `BEGIN`          | Starts a calendar component (e.g., `VCALENDAR`, `VEVENT`). | `BEGIN:VCALENDAR`                                                         |
| `END`            | Ends a calendar component.                                 | `END:VEVENT`                                                              |
| `VERSION`        | iCalendar version (usually `2.0`).                         | `VERSION:2.0`                                                             |
| `PRODID`         | Identifier for the software generating the calendar.       | `PRODID:-//Microsoft//Outlook 16.0//EN`                                   |
| `UID`            | Unique identifier for the event/task.                      | `UID:12345@example.com`                                                   |
| `DTSTAMP`        | Timestamp of event creation.                               | `DTSTAMP:20231001T090000Z`                                                |
| `DTSTART`        | Start time of the event/task.                              | `DTSTART:20231001T090000`                                                 |
| `DTEND`          | End time of the event.                                     | `DTEND:20231001T100000`                                                   |
| `DUE`            | Deadline for a task.                                       | `DUE:20231001T170000`                                                     |
| `DURATION`       | Event duration (alternative to `DTEND`).                   | `DURATION:PT1H` (1 hour)                                                  |
| `SUMMARY`        | Title/subject of the event/task.                           | `SUMMARY:Team Meeting`                                                    |
| `DESCRIPTION`    | Detailed description.                                      | `DESCRIPTION:Agenda: Project updates...`                                  |
| `LOCATION`       | Physical/virtual location.                                 | `LOCATION:Conference Room 5`                                              |
| `ORGANIZER`      | Email/URI of the event organizer.                          | `ORGANIZER;CN="John Doe":mailto:john@example.com`                         |
| `ATTENDEE`       | Email/URI of a participant.                                | `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:jane@example.com` |
| `RRULE`          | Recurrence rule.                                           | `RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO`                                   |
| `EXDATE`         | Excluded dates from recurrence.                            | `EXDATE:20231008T090000`                                                  |
| `RDATE`          | Added dates for recurrence.                                | `RDATE:20231015T090000`                                                   |
| `STATUS`         | Event/task status.                                         | `STATUS:CONFIRMED`, `STATUS:CANCELLED`, `STATUS:COMPLETED`                |
| `PRIORITY`       | Priority (0–9, 1=highest).                                 | `PRIORITY:1`                                                              |
| `CLASS`          | Access classification.                                     | `CLASS:PUBLIC`, `CLASS:PRIVATE`, `CLASS:CONFIDENTIAL`                     |
| `TRANSP`         | Time transparency (busy/free).                             | `TRANSP:OPAQUE` (busy), `TRANSP:TRANSPARENT` (free)                       |
| `CATEGORIES`     | Labels for categorization.                                 | `CATEGORIES:WORK,MEETING`                                                 |
| `ATTACH`         | File attachment or URL.                                    | `ATTACH;FMTTYPE=image/png:http://example.com/image.png`                   |
| `URL`            | URL associated with the event.                             | `URL:http://example.com/event-details`                                    |
| `CREATED`        | Timestamp of initial event creation.                       | `CREATED:20231001T080000Z`                                                |
| `LAST-MODIFIED`  | Timestamp of last modification.                            | `LAST-MODIFIED:20231001T083000Z`                                          |
| `SEQUENCE`       | Revision number for updates.                               | `SEQUENCE:2`                                                              |
| `RELATED-TO`     | Links to other events/tasks.                               | `RELATED-TO;RELTYPE=SIBLING:12345@example.com`                            |
| `COMMENT`        | Additional notes.                                          | `COMMENT:Please bring the report.`                                        |
| `FREEBUSY`       | Periods of busy/free time.                                 | `FREEBUSY:20231001T090000/PT1H`                                           |
| `REQUEST-STATUS` | Status of a scheduling request.                            | `REQUEST-STATUS:2.0;Success`                                              |
| `TRIGGER`        | Alarm trigger time.                                        | `TRIGGER:-PT15M` (15 minutes before)                                      |
| `ACTION`         | Alarm action (e.g., display, email).                       | `ACTION:DISPLAY`                                                          |
| `GEO`            | Geographic coordinates.                                    | `GEO:37.386013;-122.082932`                                               |
| `RESOURCES`      | Resources required for the event.                          | `RESOURCES:PROJECTOR,WHITEBOARD`                                          |
| `COLOR`          | Event/task color (RFC 7986 extension).                     | `COLOR:#FF0000`                                                           |

### Proprietary Extensions

#### Apple (X-APPLE-\*)

| Field                              | Description                                     | Example/Values                                                    |
| ---------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| `X-APPLE-STRUCTURED-LOCATION`      | Geolocation with address and coordinates.       | `X-APPLE-STRUCTURED-LOCATION;VALUE=URI:geo:37.386013,-122.082932` |
| `X-APPLE-TRAVEL-ADVISORY-BEHAVIOR` | Suggests travel time for events.                | `X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC`                      |
| `X-APPLE-CALENDAR-COLOR`           | Overrides the default calendar color.           | `X-APPLE-CALENDAR-COLOR:#FF0000`                                  |
| `X-APPLE-RADIUS`                   | Radius around a location for geofencing alerts. | `X-APPLE-RADIUS=500` (meters)                                     |

#### Microsoft (X-MICROSOFT-\*)

| Field                             | Description                               | Example/Values                         |
| --------------------------------- | ----------------------------------------- | -------------------------------------- |
| `X-MICROSOFT-CDO-ALLDAYEVENT`     | Marks an event as all-day.                | `X-MICROSOFT-CDO-ALLDAYEVENT:TRUE`     |
| `X-MICROSOFT-CDO-IMPORTANCE`      | Priority level (1=high, 2=normal, 3=low). | `X-MICROSOFT-CDO-IMPORTANCE:1`         |
| `X-MICROSOFT-CDO-BUSYSTATUS`      | Free/busy status for Exchange.            | `X-MICROSOFT-CDO-BUSYSTATUS:BUSY`      |
| `X-MICROSOFT-DONOTFORWARDMEETING` | Blocks forwarding of meeting invites.     | `X-MICROSOFT-DONOTFORWARDMEETING:TRUE` |

Google (X-GOOGLE-\*)

| Field                   | Description                           | Example/Values                                                |
| ----------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `X-GOOGLE-CONFERENCE`   | Adds a Google Meet link.              | `X-GOOGLE-CONFERENCE:https://meet.google.com/abc-defg-hij`    |
| `X-GOOGLE-GUEST-EMAILS` | List of guest emails for permissions. | `X-GOOGLE-GUEST-EMAILS:guest1@example.com,guest2@example.com` |
| `X-GOOGLE-REMINDER`     | Default reminder time.                | `X-GOOGLE-REMINDER:15` (minutes)                              |

#### Other

| Field            | Description                                             | Vendor       |
| ---------------- | ------------------------------------------------------- | ------------ |
| `X-WR-CALNAME`   | Calendar name (common in Apple iCal).                   | Apple        |
| `X-WR-TIMEZONE`  | Default time zone for the calendar.                     | Apple/Google |
| `X-LIC-LOCATION` | Legacy time zone identifier (e.g., `America/New_York`). | Common       |
