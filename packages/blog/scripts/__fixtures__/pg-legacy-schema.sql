--
-- PostgreSQL database dump
--


-- Dumped from database version 17.8 (Debian 17.8-1.pgdg12+1)
-- Dumped by pg_dump version 17.8 (Debian 17.8-1.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: loan_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.loan_status AS ENUM (
    'intake',
    'reviewing',
    'approved',
    'denied',
    'flagged'
);


--
-- Name: provider; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.provider AS ENUM (
    'github',
    'google'
);


--
-- Name: review_decision; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.review_decision AS ENUM (
    'approved',
    'denied',
    'flagged'
);


--
-- Name: reviewer; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.reviewer AS ENUM (
    'the-bank',
    'loan-market',
    'background-checks'
);


--
-- Name: role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.role AS ENUM (
    'user',
    'assistant'
);


--
-- Name: document_chunks_search_vector_update(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.document_chunks_search_vector_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW."searchVector" := to_tsvector('english', COALESCE(NEW.content, '') || ' ' || COALESCE(NEW."contextualContent", ''));
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chats (
    id character varying(36) NOT NULL,
    title character varying(200),
    "userId" character varying(36) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "containerId" character varying(100)
);


--
-- Name: document_chunks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.document_chunks (
    id character varying(36) NOT NULL,
    "documentId" character varying(36) NOT NULL,
    "chunkIndex" integer NOT NULL,
    content text NOT NULL,
    "contextualContent" text NOT NULL,
    embedding public.vector(1024),
    "searchVector" tsvector,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.documents (
    id character varying(36) NOT NULL,
    slug character varying(200) NOT NULL,
    title character varying(500) NOT NULL,
    path character varying(500) NOT NULL,
    url character varying(500) NOT NULL,
    "contentHash" character varying(64) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: loan_applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loan_applications (
    id character varying(36) NOT NULL,
    "userId" character varying(36) NOT NULL,
    status public.loan_status DEFAULT 'intake'::public.loan_status,
    "applicationData" json DEFAULT '{}'::json,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: loan_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loan_messages (
    id character varying(36) NOT NULL,
    "applicationId" character varying(36) NOT NULL,
    role public.role,
    parts json,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: loan_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loan_reviews (
    id character varying(36) NOT NULL,
    "applicationId" character varying(36) NOT NULL,
    reviewer public.reviewer,
    decision public.review_decision,
    analysis text,
    flags json DEFAULT '[]'::json,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id character varying(36) NOT NULL,
    "chatId" character varying(36) NOT NULL,
    role public.role NOT NULL,
    parts json,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: node_executions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.node_executions (
    id character varying(36) NOT NULL,
    "runId" text NOT NULL,
    "nodeId" text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "promptSent" text,
    "rawResponse" text,
    "parsedOutput" text,
    "tokensIn" integer,
    "tokensOut" integer,
    "latencyMs" integer,
    error text,
    "startedAt" text,
    "completedAt" text
);


--
-- Name: typing_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_attempts (
    id integer NOT NULL,
    "learnerId" integer NOT NULL,
    "lessonId" integer,
    "gameSlug" character varying(40),
    wpm real NOT NULL,
    "netWpm" real DEFAULT 0 NOT NULL,
    accuracy real NOT NULL,
    "durationMs" integer NOT NULL,
    "errorsByKey" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "completedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_attempts_id_seq OWNED BY public.typing_attempts.id;


--
-- Name: typing_group_invites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_group_invites (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    token character varying(64) NOT NULL,
    email character varying(255),
    "expiresAt" timestamp without time zone NOT NULL,
    "acceptedBy" character varying(36),
    "acceptedAt" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_group_invites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_group_invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_group_invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_group_invites_id_seq OWNED BY public.typing_group_invites.id;


--
-- Name: typing_group_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_group_members (
    "groupId" integer NOT NULL,
    "userId" character varying(36) NOT NULL,
    role character varying(16) DEFAULT 'guardian'::character varying NOT NULL,
    "invitedBy" character varying(36),
    "joinedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_groups (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    kind character varying(16) DEFAULT 'family'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    slug character varying(96) NOT NULL
);


--
-- Name: typing_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_groups_id_seq OWNED BY public.typing_groups.id;


--
-- Name: typing_key_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_key_stats (
    id integer NOT NULL,
    "learnerId" integer NOT NULL,
    key character varying(8) NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    errors integer DEFAULT 0 NOT NULL,
    "avgMs" real DEFAULT 0 NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_key_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_key_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_key_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_key_stats_id_seq OWNED BY public.typing_key_stats.id;


--
-- Name: typing_learners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_learners (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    "displayName" character varying(80) NOT NULL,
    "avatarUrl" text,
    "birthYear" integer,
    "currentStage" integer DEFAULT 1 NOT NULL,
    "preferredVoice" character varying(64) DEFAULT 'chirp3-en-us-Aoede'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_learners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_learners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_learners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_learners_id_seq OWNED BY public.typing_learners.id;


--
-- Name: typing_lessons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_lessons (
    id integer NOT NULL,
    slug character varying(120) NOT NULL,
    stage integer NOT NULL,
    kind character varying(32) NOT NULL,
    title character varying(160) NOT NULL,
    text text NOT NULL,
    "targetWpm" integer DEFAULT 10 NOT NULL,
    "targetAccuracy" real DEFAULT 0.95 NOT NULL,
    topic character varying(120),
    "spellingListId" integer,
    "generatedBy" character varying(16) DEFAULT 'system'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_lessons_id_seq OWNED BY public.typing_lessons.id;


--
-- Name: typing_spelling_lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_spelling_lists (
    id integer NOT NULL,
    "learnerId" integer NOT NULL,
    "weekOf" date NOT NULL,
    words text[] DEFAULT '{}'::text[] NOT NULL,
    source character varying(16) DEFAULT 'type'::character varying NOT NULL,
    "sourceImageUrl" text,
    "createdBy" character varying(36) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: typing_spelling_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_spelling_lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_spelling_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_spelling_lists_id_seq OWNED BY public.typing_spelling_lists.id;


--
-- Name: typing_spelling_progress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typing_spelling_progress (
    id integer NOT NULL,
    "spellingListId" integer NOT NULL,
    word character varying(64) NOT NULL,
    "consecutiveCorrect" integer DEFAULT 0 NOT NULL,
    mastered boolean DEFAULT false NOT NULL,
    "masteredAt" timestamp without time zone
);


--
-- Name: typing_spelling_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typing_spelling_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typing_spelling_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typing_spelling_progress_id_seq OWNED BY public.typing_spelling_progress.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying(36) NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    avatar character varying(500) NOT NULL,
    username character varying(50) NOT NULL,
    provider public.provider NOT NULL,
    "providerId" character varying(50) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: workflow_edges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_edges (
    id character varying(36) NOT NULL,
    "workflowId" text NOT NULL,
    "edgeId" text NOT NULL,
    "sourceNode" text NOT NULL,
    "targetNode" text NOT NULL,
    "sourceHandle" text,
    "targetHandle" text,
    label text,
    animated integer DEFAULT 0 NOT NULL,
    "edgeType" text DEFAULT 'smoothstep'::text NOT NULL,
    "createdAt" text
);


--
-- Name: workflow_nodes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_nodes (
    id character varying(36) NOT NULL,
    "workflowId" text NOT NULL,
    "nodeId" text NOT NULL,
    type text NOT NULL,
    label text NOT NULL,
    "positionX" real DEFAULT 0 NOT NULL,
    "positionY" real DEFAULT 0 NOT NULL,
    prompt text DEFAULT ''::text NOT NULL,
    model text DEFAULT 'claude-sonnet-4-20250514'::text NOT NULL,
    temperature real DEFAULT 0.7 NOT NULL,
    "maxTokens" integer DEFAULT 1024 NOT NULL,
    "outputSchema" text DEFAULT '{"type":"object","properties":{},"required":[]}'::text NOT NULL,
    "inputMapping" text DEFAULT '{}'::text NOT NULL,
    "createdAt" text,
    "updatedAt" text
);


--
-- Name: workflow_runs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_runs (
    id character varying(36) NOT NULL,
    "workflowId" text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "inputData" text,
    "outputData" text,
    "startedAt" text,
    "completedAt" text,
    error text,
    "createdAt" text
);


--
-- Name: workflows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflows (
    id character varying(36) NOT NULL,
    name text NOT NULL,
    description text,
    viewport text,
    "ownerId" text NOT NULL,
    "isPublished" integer DEFAULT 0 NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "createdAt" text,
    "updatedAt" text
);


--
-- Name: typing_attempts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_attempts ALTER COLUMN id SET DEFAULT nextval('public.typing_attempts_id_seq'::regclass);


--
-- Name: typing_group_invites id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_invites ALTER COLUMN id SET DEFAULT nextval('public.typing_group_invites_id_seq'::regclass);


--
-- Name: typing_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_groups ALTER COLUMN id SET DEFAULT nextval('public.typing_groups_id_seq'::regclass);


--
-- Name: typing_key_stats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_key_stats ALTER COLUMN id SET DEFAULT nextval('public.typing_key_stats_id_seq'::regclass);


--
-- Name: typing_learners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_learners ALTER COLUMN id SET DEFAULT nextval('public.typing_learners_id_seq'::regclass);


--
-- Name: typing_lessons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_lessons ALTER COLUMN id SET DEFAULT nextval('public.typing_lessons_id_seq'::regclass);


--
-- Name: typing_spelling_lists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_lists ALTER COLUMN id SET DEFAULT nextval('public.typing_spelling_lists_id_seq'::regclass);


--
-- Name: typing_spelling_progress id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_progress ALTER COLUMN id SET DEFAULT nextval('public.typing_spelling_progress_id_seq'::regclass);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: document_chunks document_chunks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_chunks
    ADD CONSTRAINT document_chunks_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: documents documents_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_slug_unique UNIQUE (slug);


--
-- Name: loan_applications loan_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_applications
    ADD CONSTRAINT loan_applications_pkey PRIMARY KEY (id);


--
-- Name: loan_messages loan_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_messages
    ADD CONSTRAINT loan_messages_pkey PRIMARY KEY (id);


--
-- Name: loan_reviews loan_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_reviews
    ADD CONSTRAINT loan_reviews_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: node_executions node_executions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.node_executions
    ADD CONSTRAINT node_executions_pkey PRIMARY KEY (id);


--
-- Name: typing_attempts typing_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_attempts
    ADD CONSTRAINT typing_attempts_pkey PRIMARY KEY (id);


--
-- Name: typing_group_invites typing_group_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_invites
    ADD CONSTRAINT typing_group_invites_pkey PRIMARY KEY (id);


--
-- Name: typing_group_members typing_group_members_groupId_userId_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_members
    ADD CONSTRAINT "typing_group_members_groupId_userId_pk" PRIMARY KEY ("groupId", "userId");


--
-- Name: typing_groups typing_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_groups
    ADD CONSTRAINT typing_groups_pkey PRIMARY KEY (id);


--
-- Name: typing_groups typing_groups_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_groups
    ADD CONSTRAINT typing_groups_slug_unique UNIQUE (slug);


--
-- Name: typing_key_stats typing_key_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_key_stats
    ADD CONSTRAINT typing_key_stats_pkey PRIMARY KEY (id);


--
-- Name: typing_learners typing_learners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_learners
    ADD CONSTRAINT typing_learners_pkey PRIMARY KEY (id);


--
-- Name: typing_lessons typing_lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_lessons
    ADD CONSTRAINT typing_lessons_pkey PRIMARY KEY (id);


--
-- Name: typing_spelling_lists typing_spelling_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_lists
    ADD CONSTRAINT typing_spelling_lists_pkey PRIMARY KEY (id);


--
-- Name: typing_spelling_progress typing_spelling_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_progress
    ADD CONSTRAINT typing_spelling_progress_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: workflow_edges workflow_edges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_edges
    ADD CONSTRAINT workflow_edges_pkey PRIMARY KEY (id);


--
-- Name: workflow_nodes workflow_nodes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_nodes
    ADD CONSTRAINT workflow_nodes_pkey PRIMARY KEY (id);


--
-- Name: workflow_runs workflow_runs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_runs
    ADD CONSTRAINT workflow_runs_pkey PRIMARY KEY (id);


--
-- Name: workflows workflows_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflows
    ADD CONSTRAINT workflows_pkey PRIMARY KEY (id);


--
-- Name: chats_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX chats_user_id_idx ON public.chats USING btree ("userId");


--
-- Name: document_chunks_chunk_index_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX document_chunks_chunk_index_idx ON public.document_chunks USING btree ("documentId", "chunkIndex");


--
-- Name: document_chunks_content_trgm_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX document_chunks_content_trgm_idx ON public.document_chunks USING gin (content public.gin_trgm_ops);


--
-- Name: document_chunks_document_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX document_chunks_document_id_idx ON public.document_chunks USING btree ("documentId");


--
-- Name: document_chunks_search_vector_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX document_chunks_search_vector_idx ON public.document_chunks USING gin ("searchVector");


--
-- Name: documents_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX documents_slug_idx ON public.documents USING btree (slug);


--
-- Name: loan_applications_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX loan_applications_user_id_idx ON public.loan_applications USING btree ("userId");


--
-- Name: loan_messages_application_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX loan_messages_application_id_idx ON public.loan_messages USING btree ("applicationId");


--
-- Name: loan_reviews_application_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX loan_reviews_application_id_idx ON public.loan_reviews USING btree ("applicationId");


--
-- Name: messages_chat_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_chat_id_idx ON public.messages USING btree ("chatId");


--
-- Name: typing_attempts_game_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_attempts_game_slug_idx ON public.typing_attempts USING btree ("gameSlug");


--
-- Name: typing_attempts_learner_id_completed_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_attempts_learner_id_completed_at_idx ON public.typing_attempts USING btree ("learnerId", "completedAt");


--
-- Name: typing_attempts_lesson_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_attempts_lesson_id_idx ON public.typing_attempts USING btree ("lessonId");


--
-- Name: typing_group_invites_group_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_group_invites_group_id_idx ON public.typing_group_invites USING btree ("groupId");


--
-- Name: typing_group_invites_token_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX typing_group_invites_token_idx ON public.typing_group_invites USING btree (token);


--
-- Name: typing_group_members_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_group_members_user_id_idx ON public.typing_group_members USING btree ("userId");


--
-- Name: typing_key_stats_learner_id_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX typing_key_stats_learner_id_key_idx ON public.typing_key_stats USING btree ("learnerId", key);


--
-- Name: typing_learners_group_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_learners_group_id_idx ON public.typing_learners USING btree ("groupId");


--
-- Name: typing_lessons_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX typing_lessons_slug_idx ON public.typing_lessons USING btree (slug);


--
-- Name: typing_lessons_spelling_list_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_lessons_spelling_list_id_idx ON public.typing_lessons USING btree ("spellingListId");


--
-- Name: typing_lessons_stage_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX typing_lessons_stage_idx ON public.typing_lessons USING btree (stage);


--
-- Name: typing_spelling_lists_learner_id_week_of_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX typing_spelling_lists_learner_id_week_of_idx ON public.typing_spelling_lists USING btree ("learnerId", "weekOf");


--
-- Name: typing_spelling_progress_list_word_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX typing_spelling_progress_list_word_idx ON public.typing_spelling_progress USING btree ("spellingListId", word);


--
-- Name: users_provider_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_provider_id_idx ON public.users USING btree (provider, "providerId");


--
-- Name: document_chunks document_chunks_search_vector_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER document_chunks_search_vector_trigger BEFORE INSERT OR UPDATE OF content, "contextualContent" ON public.document_chunks FOR EACH ROW EXECUTE FUNCTION public.document_chunks_search_vector_update();


--
-- Name: document_chunks document_chunks_documentId_documents_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_chunks
    ADD CONSTRAINT "document_chunks_documentId_documents_id_fk" FOREIGN KEY ("documentId") REFERENCES public.documents(id) ON DELETE CASCADE;


--
-- Name: loan_messages loan_messages_applicationId_loan_applications_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_messages
    ADD CONSTRAINT "loan_messages_applicationId_loan_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES public.loan_applications(id) ON DELETE CASCADE;


--
-- Name: loan_reviews loan_reviews_applicationId_loan_applications_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_reviews
    ADD CONSTRAINT "loan_reviews_applicationId_loan_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES public.loan_applications(id) ON DELETE CASCADE;


--
-- Name: messages messages_chatId_chats_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_chatId_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES public.chats(id) ON DELETE CASCADE;


--
-- Name: node_executions node_executions_runId_workflow_runs_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.node_executions
    ADD CONSTRAINT "node_executions_runId_workflow_runs_id_fk" FOREIGN KEY ("runId") REFERENCES public.workflow_runs(id) ON DELETE CASCADE;


--
-- Name: typing_attempts typing_attempts_learnerId_typing_learners_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_attempts
    ADD CONSTRAINT "typing_attempts_learnerId_typing_learners_id_fk" FOREIGN KEY ("learnerId") REFERENCES public.typing_learners(id) ON DELETE CASCADE;


--
-- Name: typing_attempts typing_attempts_lessonId_typing_lessons_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_attempts
    ADD CONSTRAINT "typing_attempts_lessonId_typing_lessons_id_fk" FOREIGN KEY ("lessonId") REFERENCES public.typing_lessons(id) ON DELETE SET NULL;


--
-- Name: typing_group_invites typing_group_invites_acceptedBy_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_invites
    ADD CONSTRAINT "typing_group_invites_acceptedBy_users_id_fk" FOREIGN KEY ("acceptedBy") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: typing_group_invites typing_group_invites_groupId_typing_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_invites
    ADD CONSTRAINT "typing_group_invites_groupId_typing_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES public.typing_groups(id) ON DELETE CASCADE;


--
-- Name: typing_group_members typing_group_members_groupId_typing_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_members
    ADD CONSTRAINT "typing_group_members_groupId_typing_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES public.typing_groups(id) ON DELETE CASCADE;


--
-- Name: typing_group_members typing_group_members_invitedBy_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_members
    ADD CONSTRAINT "typing_group_members_invitedBy_users_id_fk" FOREIGN KEY ("invitedBy") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: typing_group_members typing_group_members_userId_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_group_members
    ADD CONSTRAINT "typing_group_members_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: typing_key_stats typing_key_stats_learnerId_typing_learners_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_key_stats
    ADD CONSTRAINT "typing_key_stats_learnerId_typing_learners_id_fk" FOREIGN KEY ("learnerId") REFERENCES public.typing_learners(id) ON DELETE CASCADE;


--
-- Name: typing_learners typing_learners_groupId_typing_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_learners
    ADD CONSTRAINT "typing_learners_groupId_typing_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES public.typing_groups(id) ON DELETE CASCADE;


--
-- Name: typing_lessons typing_lessons_spellingListId_typing_spelling_lists_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_lessons
    ADD CONSTRAINT "typing_lessons_spellingListId_typing_spelling_lists_id_fk" FOREIGN KEY ("spellingListId") REFERENCES public.typing_spelling_lists(id) ON DELETE SET NULL;


--
-- Name: typing_spelling_lists typing_spelling_lists_createdBy_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_lists
    ADD CONSTRAINT "typing_spelling_lists_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES public.users(id);


--
-- Name: typing_spelling_lists typing_spelling_lists_learnerId_typing_learners_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_lists
    ADD CONSTRAINT "typing_spelling_lists_learnerId_typing_learners_id_fk" FOREIGN KEY ("learnerId") REFERENCES public.typing_learners(id) ON DELETE CASCADE;


--
-- Name: typing_spelling_progress typing_spelling_progress_spellingListId_typing_spelling_lists_i; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typing_spelling_progress
    ADD CONSTRAINT "typing_spelling_progress_spellingListId_typing_spelling_lists_i" FOREIGN KEY ("spellingListId") REFERENCES public.typing_spelling_lists(id) ON DELETE CASCADE;


--
-- Name: workflow_edges workflow_edges_workflowId_workflows_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_edges
    ADD CONSTRAINT "workflow_edges_workflowId_workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES public.workflows(id) ON DELETE CASCADE;


--
-- Name: workflow_nodes workflow_nodes_workflowId_workflows_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_nodes
    ADD CONSTRAINT "workflow_nodes_workflowId_workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES public.workflows(id) ON DELETE CASCADE;


--
-- Name: workflow_runs workflow_runs_workflowId_workflows_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_runs
    ADD CONSTRAINT "workflow_runs_workflowId_workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES public.workflows(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


