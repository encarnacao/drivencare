--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.1

-- Started on 2023-04-02 01:02:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 25 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4128 (class 0 OID 0)
-- Dependencies: 25
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1449 (class 1247 OID 2457000)
-- Name: appointment_time; Type: TYPE; Schema: public; Owner: zwnoarsn
--

CREATE TYPE public.appointment_time AS ENUM (
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00'
);


ALTER TYPE public.appointment_time OWNER TO zwnoarsn;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 231 (class 1259 OID 2457037)
-- Name: appointments; Type: TABLE; Schema: public; Owner: zwnoarsn
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    doctor_id integer NOT NULL,
    date date NOT NULL,
    "time" public.appointment_time NOT NULL,
    status character varying(30) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.appointments OWNER TO zwnoarsn;

--
-- TOC entry 230 (class 1259 OID 2457035)
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: zwnoarsn
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointments_id_seq OWNER TO zwnoarsn;

--
-- TOC entry 4130 (class 0 OID 0)
-- Dependencies: 230
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- TOC entry 229 (class 1259 OID 2456957)
-- Name: doctors; Type: TABLE; Schema: public; Owner: zwnoarsn
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    registration character varying(6) NOT NULL,
    specialty character varying(50) NOT NULL,
    city character varying(50) NOT NULL,
    state character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT registration_check CHECK (((registration)::text ~ '^[0-9]{6}$'::text))
);


ALTER TABLE public.doctors OWNER TO zwnoarsn;

--
-- TOC entry 228 (class 1259 OID 2456955)
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: zwnoarsn
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doctors_id_seq OWNER TO zwnoarsn;

--
-- TOC entry 4131 (class 0 OID 0)
-- Dependencies: 228
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- TOC entry 227 (class 1259 OID 2456946)
-- Name: patients; Type: TABLE; Schema: public; Owner: zwnoarsn
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.patients OWNER TO zwnoarsn;

--
-- TOC entry 226 (class 1259 OID 2456944)
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: zwnoarsn
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patients_id_seq OWNER TO zwnoarsn;

--
-- TOC entry 4132 (class 0 OID 0)
-- Dependencies: 226
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- TOC entry 3968 (class 2604 OID 2457040)
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- TOC entry 3966 (class 2604 OID 2456960)
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- TOC entry 3964 (class 2604 OID 2456949)
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- TOC entry 4122 (class 0 OID 2457037)
-- Dependencies: 231
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.appointments (id, patient_id, doctor_id, date, "time", status, created_at) FROM stdin;
\.


--
-- TOC entry 4120 (class 0 OID 2456957)
-- Dependencies: 229
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.doctors (id, name, email, password, registration, specialty, city, state, created_at) FROM stdin;
\.


--
-- TOC entry 4118 (class 0 OID 2456946)
-- Dependencies: 227
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.patients (id, name, email, password, created_at) FROM stdin;
1	Caio	caio@caio.com	$2b$10$BVKD.UHgLornZRr9AQpyu.cqkxyJI4faJ6Qj5FYg8xHSsheCZIUlm	2023-04-01 20:52:57.936188
4	Teste	teste@caio.com	$2b$10$CTmGV3g60S.9BiKoYcwC.ugwdj3DOVDJSRnnue5i0X2JLVOfRL1O6	2023-04-01 21:23:37.402654
\.


--
-- TOC entry 4133 (class 0 OID 0)
-- Dependencies: 230
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.appointments_id_seq', 1, false);


--
-- TOC entry 4134 (class 0 OID 0)
-- Dependencies: 228
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.doctors_id_seq', 1, false);


--
-- TOC entry 4135 (class 0 OID 0)
-- Dependencies: 226
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.patients_id_seq', 4, true);


--
-- TOC entry 3983 (class 2606 OID 2457044)
-- Name: appointments appointments_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pk PRIMARY KEY (id);


--
-- TOC entry 3977 (class 2606 OID 2456966)
-- Name: doctors doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);


--
-- TOC entry 3979 (class 2606 OID 2456964)
-- Name: doctors doctors_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pk PRIMARY KEY (id);


--
-- TOC entry 3981 (class 2606 OID 2456968)
-- Name: doctors doctors_registration_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_registration_key UNIQUE (registration);


--
-- TOC entry 3973 (class 2606 OID 2456954)
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- TOC entry 3975 (class 2606 OID 2456952)
-- Name: patients patients_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pk PRIMARY KEY (id);


--
-- TOC entry 3984 (class 2606 OID 2457060)
-- Name: appointments appointments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk0 FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 3985 (class 2606 OID 2457065)
-- Name: appointments appointments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk1 FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- TOC entry 4129 (class 0 OID 0)
-- Dependencies: 25
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2023-04-02 01:02:24

--
-- PostgreSQL database dump complete
--

