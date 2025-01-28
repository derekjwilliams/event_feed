-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.events_id_seq;

CREATE SEQUENCE public.events_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.events_id_seq OWNER TO neondb_owner;
GRANT ALL ON SEQUENCE public.events_id_seq TO neondb_owner;

-- DROP SEQUENCE public.events_id_seq1;

CREATE SEQUENCE public.events_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.events_id_seq1 OWNER TO neondb_owner;
GRANT ALL ON SEQUENCE public.events_id_seq1 TO neondb_owner;

-- DROP SEQUENCE public.tags_id_seq;

CREATE SEQUENCE public.tags_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.tags_id_seq OWNER TO neondb_owner;
GRANT ALL ON SEQUENCE public.tags_id_seq TO neondb_owner;

-- DROP SEQUENCE public.tags_id_seq1;

CREATE SEQUENCE public.tags_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.tags_id_seq1 OWNER TO neondb_owner;
GRANT ALL ON SEQUENCE public.tags_id_seq1 TO neondb_owner;
-- public.events definition

-- Drop table

-- DROP TABLE public.events;

CREATE TABLE public.events (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	"content" text NULL,
	link text NULL,
	author text NULL,
	pub_date timestamptz NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	image_url text NULL,
	"location" text NULL,
	event_end_date timestamptz NULL,
	event_start_date timestamptz NULL,
	CONSTRAINT events_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.events OWNER TO neondb_owner;
GRANT ALL ON TABLE public.events TO neondb_owner;


-- public.tags definition

-- Drop table

-- DROP TABLE public.tags;

CREATE TABLE public.tags (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT tags_name_key UNIQUE (name),
	CONSTRAINT tags_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_tags_name ON public.tags USING btree (name);

-- Permissions

ALTER TABLE public.tags OWNER TO neondb_owner;
GRANT ALL ON TABLE public.tags TO neondb_owner;


-- public.event_tags definition

-- Drop table

-- DROP TABLE public.event_tags;

CREATE TABLE public.event_tags (
	event_id int4 NOT NULL,
	tag_id int4 NOT NULL,
	CONSTRAINT event_tags_pkey PRIMARY KEY (event_id, tag_id),
	CONSTRAINT event_tags_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE,
	CONSTRAINT event_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.event_tags OWNER TO neondb_owner;
GRANT ALL ON TABLE public.event_tags TO neondb_owner;



-- DROP FUNCTION public.get_events_by_date(text);

CREATE OR REPLACE FUNCTION public.get_events_by_date(p_pub_date text)
 RETURNS SETOF events
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  RETURN QUERY
  SELECT * FROM events e
  WHERE e.pub_date > p_pub_date::TIMESTAMP WITH TIME ZONE;
END;
$function$
;

COMMENT ON FUNCTION public.get_events_by_date(text) IS '@graphqlName getEventsByDate 
@param pPubDate: String';

-- Permissions

ALTER FUNCTION public.get_events_by_date(text) OWNER TO neondb_owner;
GRANT ALL ON FUNCTION public.get_events_by_date(text) TO neondb_owner;

-- DROP FUNCTION public.get_events_by_date_and_tags(text, _text);

CREATE OR REPLACE FUNCTION public.get_events_by_date_and_tags(p_pub_date text, p_tag_names text[])
 RETURNS SETOF events
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF array_length(p_tag_names, 1) IS NULL OR array_length(p_tag_names, 1) = 0 THEN
    -- If p_tag_names is empty or NULL, return all events after p_pub_date
    RETURN QUERY
    SELECT e.*
    FROM events e
    WHERE e.pub_date > p_pub_date::TIMESTAMP WITH TIME ZONE;
  ELSE
    -- Otherwise, return events with tags matching p_tag_names
    RETURN QUERY
    SELECT DISTINCT e.*
    FROM events e
    JOIN event_tags et ON e.id = et.event_id
    JOIN tags t ON et.tag_id = t.id
    WHERE e.pub_date > p_pub_date::TIMESTAMP WITH TIME ZONE
    AND t.name = ANY(p_tag_names);
  END IF;
END;
$function$
;

-- Permissions

ALTER FUNCTION public.get_events_by_date_and_tags(text, _text) OWNER TO neondb_owner;
GRANT ALL ON FUNCTION public.get_events_by_date_and_tags(text, _text) TO public;
GRANT ALL ON FUNCTION public.get_events_by_date_and_tags(text, _text) TO neondb_owner;


-- Permissions

GRANT ALL ON SCHEMA public TO pg_database_owner;
GRANT USAGE ON SCHEMA public TO public;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, DELETE, REFERENCES, TRIGGER, SELECT, UPDATE, TRUNCATE ON TABLES TO neon_superuser WITH GRANT OPTION;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, UPDATE, USAGE ON SEQUENCES TO neon_superuser WITH GRANT OPTION;