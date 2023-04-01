--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.1

-- Started on 2023-04-01 14:29:51

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
-- TOC entry 4170 (class 0 OID 0)
-- Dependencies: 25
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1467 (class 1247 OID 2457000)
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
-- TOC entry 237 (class 1259 OID 2457037)
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
-- TOC entry 236 (class 1259 OID 2457035)
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
-- TOC entry 4172 (class 0 OID 0)
-- Dependencies: 236
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- TOC entry 235 (class 1259 OID 2456991)
-- Name: cities; Type: TABLE; Schema: public; Owner: zwnoarsn
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    city character varying(255) NOT NULL
);


ALTER TABLE public.cities OWNER TO zwnoarsn;

--
-- TOC entry 234 (class 1259 OID 2456989)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: zwnoarsn
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO zwnoarsn;

--
-- TOC entry 4173 (class 0 OID 0)
-- Dependencies: 234
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


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
    specialty_id integer NOT NULL,
    city_id integer NOT NULL,
    state_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
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
-- TOC entry 4174 (class 0 OID 0)
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
-- TOC entry 4175 (class 0 OID 0)
-- Dependencies: 226
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- TOC entry 231 (class 1259 OID 2456971)
-- Name: specialties; Type: TABLE; Schema: public; Owner: zwnoarsn
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.specialties OWNER TO zwnoarsn;

--
-- TOC entry 230 (class 1259 OID 2456969)
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: zwnoarsn
--

CREATE SEQUENCE public.specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specialties_id_seq OWNER TO zwnoarsn;

--
-- TOC entry 4176 (class 0 OID 0)
-- Dependencies: 230
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.specialties_id_seq OWNED BY public.specialties.id;


--
-- TOC entry 233 (class 1259 OID 2456981)
-- Name: states; Type: TABLE; Schema: public; Owner: zwnoarsn
--

CREATE TABLE public.states (
    id integer NOT NULL,
    state character varying(30) NOT NULL
);


ALTER TABLE public.states OWNER TO zwnoarsn;

--
-- TOC entry 232 (class 1259 OID 2456979)
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: zwnoarsn
--

CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.states_id_seq OWNER TO zwnoarsn;

--
-- TOC entry 4177 (class 0 OID 0)
-- Dependencies: 232
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zwnoarsn
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- TOC entry 3989 (class 2604 OID 2457040)
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- TOC entry 3988 (class 2604 OID 2456994)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- TOC entry 3984 (class 2604 OID 2456960)
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- TOC entry 3982 (class 2604 OID 2456949)
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- TOC entry 3986 (class 2604 OID 2456974)
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialties_id_seq'::regclass);


--
-- TOC entry 3987 (class 2604 OID 2456984)
-- Name: states id; Type: DEFAULT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- TOC entry 4164 (class 0 OID 2457037)
-- Dependencies: 237
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.appointments (id, patient_id, doctor_id, date, "time", status, created_at) FROM stdin;
\.


--
-- TOC entry 4162 (class 0 OID 2456991)
-- Dependencies: 235
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.cities (id, city) FROM stdin;
\.


--
-- TOC entry 4156 (class 0 OID 2456957)
-- Dependencies: 229
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.doctors (id, name, email, password, registration, specialty_id, city_id, state_id, created_at) FROM stdin;
\.


--
-- TOC entry 4154 (class 0 OID 2456946)
-- Dependencies: 227
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.patients (id, name, email, password, created_at) FROM stdin;
\.


--
-- TOC entry 4158 (class 0 OID 2456971)
-- Dependencies: 231
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.specialties (id, name) FROM stdin;
\.


--
-- TOC entry 4160 (class 0 OID 2456981)
-- Dependencies: 233
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: zwnoarsn
--

COPY public.states (id, state) FROM stdin;
1	Acre
2	Alagoas
3	Amapá
4	Amazonas
5	Bahia
6	Ceará
7	Distrito Federal
8	Espírito Santo
9	Goiás
10	Maranhão
11	Mato Grosso
12	Mato Grosso do Sul
13	Minas Gerais
14	Pará
15	Paraíba
16	Paraná
17	Pernambuco
18	Piauí
19	Rio de Janeiro
20	Rio Grande do Norte
21	Rio Grande do Sul
22	Rondônia
23	Roraima
24	Santa Catarina
25	São Paulo
26	Sergipe
27	Tocantins
\.


--
-- TOC entry 4178 (class 0 OID 0)
-- Dependencies: 236
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.appointments_id_seq', 1, false);


--
-- TOC entry 4179 (class 0 OID 0)
-- Dependencies: 234
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.cities_id_seq', 1, false);


--
-- TOC entry 4180 (class 0 OID 0)
-- Dependencies: 228
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.doctors_id_seq', 1, false);


--
-- TOC entry 4181 (class 0 OID 0)
-- Dependencies: 226
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.patients_id_seq', 1, false);


--
-- TOC entry 4182 (class 0 OID 0)
-- Dependencies: 230
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.specialties_id_seq', 1, false);


--
-- TOC entry 4183 (class 0 OID 0)
-- Dependencies: 232
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zwnoarsn
--

SELECT pg_catalog.setval('public.states_id_seq', 27, true);


--
-- TOC entry 4016 (class 2606 OID 2457044)
-- Name: appointments appointments_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pk PRIMARY KEY (id);


--
-- TOC entry 4012 (class 2606 OID 2456998)
-- Name: cities cities_city_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_city_key UNIQUE (city);


--
-- TOC entry 4014 (class 2606 OID 2456996)
-- Name: cities cities_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pk PRIMARY KEY (id);


--
-- TOC entry 3998 (class 2606 OID 2456966)
-- Name: doctors doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);


--
-- TOC entry 4000 (class 2606 OID 2456964)
-- Name: doctors doctors_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pk PRIMARY KEY (id);


--
-- TOC entry 4002 (class 2606 OID 2456968)
-- Name: doctors doctors_registration_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_registration_key UNIQUE (registration);


--
-- TOC entry 3994 (class 2606 OID 2456954)
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- TOC entry 3996 (class 2606 OID 2456952)
-- Name: patients patients_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pk PRIMARY KEY (id);


--
-- TOC entry 4004 (class 2606 OID 2456978)
-- Name: specialties specialties_name_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_name_key UNIQUE (name);


--
-- TOC entry 4006 (class 2606 OID 2456976)
-- Name: specialties specialties_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pk PRIMARY KEY (id);


--
-- TOC entry 4008 (class 2606 OID 2456986)
-- Name: states states_pk; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pk PRIMARY KEY (id);


--
-- TOC entry 4010 (class 2606 OID 2456988)
-- Name: states states_state_key; Type: CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_state_key UNIQUE (state);


--
-- TOC entry 4020 (class 2606 OID 2457060)
-- Name: appointments appointments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk0 FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 4021 (class 2606 OID 2457065)
-- Name: appointments appointments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk1 FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- TOC entry 4017 (class 2606 OID 2457045)
-- Name: doctors doctors_fk0; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_fk0 FOREIGN KEY (specialty_id) REFERENCES public.specialties(id);


--
-- TOC entry 4018 (class 2606 OID 2457050)
-- Name: doctors doctors_fk1; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_fk1 FOREIGN KEY (city_id) REFERENCES public.cities(id);


--
-- TOC entry 4019 (class 2606 OID 2457055)
-- Name: doctors doctors_fk2; Type: FK CONSTRAINT; Schema: public; Owner: zwnoarsn
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_fk2 FOREIGN KEY (state_id) REFERENCES public.states(id);


--
-- TOC entry 4171 (class 0 OID 0)
-- Dependencies: 25
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2023-04-01 14:29:52

--
-- PostgreSQL database dump complete
--

