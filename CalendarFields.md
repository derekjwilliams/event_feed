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

## JSCalendar Data Types

| Data Type            | Description                                                               | Example                                                                           |
| -------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **`Id`**             | A globally unique identifier for a calendar object.                       | `"a8df6573-0414-4ccc-8b1f-2248e4f4f2d1"` (UUID) or `"https://example.com/event1"` |
| **`Int`**            | A signed integer in the range `-2^53 + 1` to `2^53 - 1`.                  | `42`, `-15`                                                                       |
| **`UnsignedInt`**    | A non-negative integer in the range `0` to `2^53 - 1`.                    | `0`, `100`                                                                        |
| **`UTCDateTime`**    | A date-time in UTC, formatted as ISO 8601 with `Z` suffix.                | `"2023-10-01T09:00:00Z"`                                                          |
| **`LocalDateTime`**  | A date-time without timezone (assumed to be in the event’s timezone).     | `"2023-10-01T09:00:00"`                                                           |
| **`Duration`**       | A non-negative ISO 8601 duration.                                         | `"PT1H"` (1 hour), `"P1D"` (1 day)                                                |
| **`SignedDuration`** | A signed ISO 8601 duration (supports negative values).                    | `"-PT15M"` (negative 15 minutes)                                                  |
| **`TimeZoneId`**     | An IANA time zone identifier.                                             | `"America/New_York"`, `"Europe/London"`                                           |
| **`PatchObject`**    | A JSON Patch object (RFC 6902) for partial updates.                       | `{ "op": "replace", "path": "/title", "value": "New Title" }`                     |
| **`Relation`**       | Describes a relationship to another JSCalendar object (e.g., `"parent"`). | `{ "@type": "Relation", "relation": "parent", "id": "event123" }`                 |
| **`Link`**           | A URI with optional properties (e.g., `href`, `rel`, `displayText`).      | `{ "href": "https://example.com/docs", "rel": "describedby" }`                    |

UTCDateTime and LocalDateTime follow ISO 8601 formatting.

TimeZoneId must reference valid IANA time zone database entries.

PatchObject enables partial updates using JSON Patch syntax (see RFC 6902).

Relation and Link are objects with structured properties, not primitive types.

### Zod File For The Types

```TypeScript
/* calendarTypes.ts */

import { z } from "zod";

// JSCalendar (RFC 8984) Data Types with Zod validation

// Represents a signed integer (Int)
export const Int = z.number().int(); // Just an integer (can be negative)

// Represents a non-negative integer (UnsignedInt)
export const UnsignedInt = z.number().int().nonnegative({
  message: "UnsignedInt must be a non-negative integer."
});

// Represents a UTC-based date and time (ISO 8601 format)
export const UTCDateTime = z.string().refine(val => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(val), {
  message: "Invalid UTCDateTime format, must be in ISO 8601 with 'Z'."
});

// Represents a local date and time (without time zone)
export const LocalDateTime = z.string().refine(val => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(val), {
  message: "Invalid LocalDateTime format, must be in ISO 8601 without 'Z'."
});

// Represents a duration (ISO 8601 format)
export const Duration = z.string().refine(val => /^P(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.test(val), {
  message: "Invalid Duration format, must be ISO 8601."
});

// Represents a signed duration (ISO 8601 format)
export const SignedDuration = z.string().refine(val => /^[-+]?P(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.test(val), {
  message: "Invalid SignedDuration format, must be ISO 8601."
});

// Represents a time zone identifier (e.g., America/New_York)
export const TimeZoneId = z.string().min(1, {
  message: "TimeZoneId must be a valid string."
});

// Represents a relation (e.g., an event's relationship to attendees or other objects)
export const Relation = z.object({
  id: z.string(),         // Relation ID (string)
  type: z.enum(["attendee", "organizer", "relatedTo"]), // Relation type
  value: z.string() // The related object (e.g., URI or identifier)
});

// Represents a link (e.g., an external URL for an event)
export const Link = z.object({
  url: z.string().url(), // A valid URL
  rel: z.string().optional() // Optional relation type (e.g., "alternate", "self")
});

// Represents a patch object (used for modifying data)
export const PatchObject = z.object({
  op: z.enum(["add", "remove", "replace"]), // Operation type
  path: z.string(),                        // Path to the object to modify
  value: z.any().optional()                // New value for "replace" and "add" operations
});

// Represents a boolean value (true or false)
export const Boolean = z.boolean();

// Represents a URI (Uniform Resource Identifier)
export const Uri = z.string().url({
  message: "Invalid URI format."
});

// Represents an array of items (e.g., multiple dates or attendees)
export const Array = <T>(schema: z.ZodType<T, any, any>) => schema.array();

```

#### JSCalendar Event Type Using calendarTypes.ts

```TypeScript
/* jsCalendarEventSchema.ts */

import { z } from "zod";
import {
  UTCDateTime,
  LocalDateTime,
  TimeZoneId,
  Relation,
  Link,
  PatchObject,
  UnsignedInt,
  Duration,
  Boolean,
  Array,
  Uri,
} from './calendarTypes';

// Define the Event schema using Zod types
export const EventSchema = z.object({
  id: z.string(),                     // Unique event ID (e.g., event123)
  summary: z.string(),                // Event summary (e.g., "Team Meeting")
  description: z.string().optional(), // Optional description (e.g., "Discuss the upcoming project milestones.")
  location: z.string().optional(),   // Optional location (e.g., "Room 101")
  startDate: UTCDateTime,             // Event start time (UTC format: "2023-10-01T09:00:00Z")
  endDate: UTCDateTime.optional(),    // Event end time (UTC format, optional if all-day event)
  duration: Duration.optional(),      // Duration (e.g., "PT1H" for 1 hour), optional if endDate is provided
  timeZone: TimeZoneId.optional(),    // Optional time zone (e.g., "America/New_York")
  attendees: Array(Uri).optional(),   // Optional list of attendees (e.g., ["mailto:jane.doe@example.com"])
  priority: UnsignedInt.optional(),   // Optional priority (e.g., 1 for high priority)
  status: z.string().optional(),      // Event status (e.g., "CONFIRMED", "CANCELLED")
  created: UTCDateTime.optional(),    // Event creation timestamp (e.g., "2023-09-01T08:00:00Z")
  lastModified: UTCDateTime.optional(), // Last modification timestamp
  transparency: z.string().optional(),// Event transparency (e.g., "OPAQUE", "TRANSPARENT")
  relations: Array(Relation).optional(), // Optional relations (e.g., attendees or related events)
  links: Array(Link).optional(),      // Optional links related to the event (e.g., external URLs)
  patch: PatchObject.optional(),      // Optional patch object for updating event
});
```

```TypeScript
/* exampleEvent.ts */

import { EventSchema } from './calendarEventSchema';

// Example Event data to validate
const exampleEvent = {
  id: "event123",
  summary: "Team Meeting",
  description: "Discuss project milestones and timelines.",
  location: "Room 101",
  startDate: "2023-10-01T09:00:00Z",
  endDate: "2023-10-01T10:00:00Z",
  attendees: ["mailto:jane.doe@example.com", "mailto:john.smith@example.com"],
  priority: 1,
  status: "CONFIRMED",
  created: "2023-09-01T08:00:00Z",
  lastModified: "2023-09-15T10:00:00Z",
  transparency: "OPAQUE",
  relations: [
    { id: "attendee1", type: "attendee", value: "mailto:jane.doe@example.com" }
  ],
  links: [
    { url: "http://example.com/event-details", rel: "alternate" }
  ],
  patch: {
    op: "replace",
    path: "/description",
    value: "Updated event description"
  }
};

// Validate the event object using the schema
const parsedEvent = EventSchema.safeParse(exampleEvent);

if (parsedEvent.success) {
  console.log("Event is valid:", parsedEvent.data);  // Valid event data
} else {
  console.error("Event validation failed:", parsedEvent.error.errors);  // Validation errors
}
```

### Using the calendarTypes.ts for iCalendar Events

The mapping between iCalendar and JSCalendar

| **iCalendar (RFC 5545)**  | **JSCalendar (RFC 8984)**     | **Zod Type**  |
| ------------------------- | ----------------------------- | ------------- |
| `DTSTART`, `DTEND`, `DUE` | `startDate`, `endDate`, `due` | `UTCDateTime` |
| `SUMMARY`                 | `summary`                     | `Text`        |
| `DESCRIPTION`             | `description`                 | `Text`        |
| `LOCATION`                | `location`                    | `Text`        |
| `ATTENDEE`                | `attendees`                   | `Array<Uri>`  |
| `PRIORITY`                | `priority`                    | `UnsignedInt` |
| `STATUS`                  | `status`                      | `Text`        |
| `UID`                     | `id`                          | `Id`          |
| `RRULE`                   | `recurrenceRule`              | `Text`        |
| `DTSTAMP`                 | `created`                     | `UTCDateTime` |
| `LAST-MODIFIED`           | `lastModified`                | `UTCDateTime` |
| `TRANSP`                  | `transparency`                | `Text`        |
| `CLASS`                   | `class`                       | `Text`        |

#### Example of Using the calendarTypes to Handle iCalendar Events

```TypeScript
/* iCalendarEventSchema.ts */

import { z } from "zod";
import {
  UTCDateTime,
  TimeZoneId,
  Relation,
  Link,
  PatchObject,
  UnsignedInt,
  Id,
  Duration,
  Text,
  Uri,
  Array,
} from './calendarTypes';

// Define the iCalendar Event schema using Zod types
export const iCalendarEventSchema = z.object({
  id: Id,                     // Unique event ID (e.g., UID)
  summary: Text,               // Event summary (e.g., "Team Meeting")
  description: Text.optional(), // Optional description (e.g., "Discuss the upcoming project milestones.")
  location: Text.optional(),   // Optional location (e.g., "Room 101")
  startDate: UTCDateTime,      // Event start time (UTC format: "2023-10-01T09:00:00Z")
  endDate: UTCDateTime.optional(), // Event end time (UTC format, optional if all-day event)
  duration: Duration.optional(),   // Duration (e.g., "PT1H" for 1 hour), optional if endDate is provided
  timeZone: TimeZoneId.optional(), // Optional time zone (e.g., "America/New_York")
  attendees: Array(Uri).optional(), // Optional list of attendees (e.g., ["mailto:jane.doe@example.com"])
  priority: UnsignedInt.optional(), // Optional priority (e.g., 1 for high priority)
  status: Text.optional(),        // Event status (e.g., "CONFIRMED", "CANCELLED")
  created: UTCDateTime.optional(), // Event creation timestamp (e.g., "2023-09-01T08:00:00Z")
  lastModified: UTCDateTime.optional(), // Last modification timestamp
  recurrenceRule: Text.optional(),    // Recurrence rule (e.g., "FREQ=WEEKLY;BYDAY=MO")
  relations: Array(Relation).optional(), // Optional relations (e.g., attendees or related events)
  links: Array(Link).optional(), // Optional links related to the event (e.g., external URLs)
  patch: PatchObject.optional(), // Optional patch object for updating event
});
```
