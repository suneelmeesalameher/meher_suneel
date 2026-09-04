"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const data = {
  name: "Mehersuneel Meesala",
  title: "Software Engineer",
  location: "Bangalore, India",
  email: "msuneel2812@gmail.com",
  linkedin: "https://www.linkedin.com/in/meher-suneel-meesala/",
  github: "https://github.com/suneelmeesalameher",
  summary: "Software Engineer with 3+ years of experience building and scaling full-stack applications, distributed systems, and microservices across banking, energy, and enterprise platforms. Strong expertise in Java, Spring Boot, Node.js, TypeScript, Angular, PostgreSQL, and AWS, with a focus on API development, system reliability, and performance. Proven track record of reducing latency, improving scalability, strengthening application security, and delivering production features for systems supporting thousands of users.",
  experience: [
    {
      role: "Software Engineer",
      company: "M&T Bank",
      location: "Remote, USA",
      period: "Mar 2025 — Aug 2026",
      bullets: [
        "Managed customer, loan applicant, and property data across PostgreSQL systems supporting 200K+ users and 1M+ properties, maintaining reliable data access and supporting backend application workflows used by product and engineering teams",
        "Built and maintained REST APIs using Spring Boot for property listing and offer submission workflows",
        "Integrated backend services with Angular applications to deliver new features and business-requested functionality in production",
        "Collaborated with product teams to design new frontend and backend features, enhancing user experience and website appearance",
        "Resolved day-to-day cyber assurance and security remediation tickets by investigating application vulnerabilities and applying fixes",
      ],
      tags: ["Spring Boot", "Angular", "PostgreSQL", "REST APIs", "Security"],
    },
    {
      role: "Software Engineer",
      company: "Tata Consultancy Services · Client: Baker Hughes",
      location: "Hyderabad, TG",
      period: "Oct 2021 — Jan 2023",
      bullets: [
        "Built and scaled high-availability distributed microservices for a self-service (low-code) analytics platform serving 50,000 global enterprise users",
        "Led a 4-member cross-functional team migrating a legacy monolith to microservices, achieving sub-100ms response times",
        "Built and documented a custom Node.js library integrating Keycloak for tenant-aware token generation, standardizing role-based authorization across 5+ microservices",
        "Developed RESTful services in Node.js and TypeScript, applying OOP and SOLID principles to reduce API latency by 40%",
        "Optimized SQL queries to enhance backend data fetching efficiency, resulting in a 20% performance improvement",
        "Improved API reliability with 90%+ test coverage using JUnit and Mockito/Jest",
      ],
      tags: ["Node.js", "TypeScript", "Microservices", "Keycloak", "SQL", "JUnit/Jest"],
    },
    {
      role: "Associate Software Engineer",
      company: "Tata Consultancy Services · Client: General Electric",
      location: "Hyderabad, TG",
      period: "Nov 2020 — Oct 2021",
      bullets: [
        "Engineered a backend service for real-time wind turbine analytics handling concurrent Mosquitto MQTT ingestion from distributed field devices, cutting ingestion latency by 30% and storage costs by 20%",
        "Served as primary on-call engineer across the SDLC, resolving P0/P1 incidents and building Grafana dashboards, sustaining 99.9% uptime on the Promise-to-Pay platform",
        "Optimized Jenkins CI/CD pipelines and implemented security policies and data flow monitoring across Apigee middleware",
      ],
      tags: ["MQTT", "Grafana", "Jenkins", "Apigee", "CI/CD"],
    },
  ],
skills: [
  {
    group: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "Go", "C", "C++"]
  },
  {
    group: "Backend & Systems",
    items: ["Node.js", "Spring Boot", "REST APIs", "Microservices"]
  },
  {
    group: "Cloud & Infrastructure",
    items: ["AWS (S3, Lambda, ECS)", "Azure", "Docker", "Kubernetes", "Terraform", "Kafka", "MQTT"]
  },
  {
    group: "Databases",
    items: ["MySQL", "Postgres", "MongoDB", "Cassandra"]
  },
  {
    group: "Frontend",
    items: ["React", "Angular", "HTML", "CSS"]
  },
  {
    group: "DevOps & CI/CD",
    items: ["Jenkins", "Git/GitHub", "Grafana", "Splunk", "Datadog", "Jupyter Notebook", "Confluence"]
  }
],
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #080808; color: #f0ede6; font-family: 'DM Mono', monospace; cursor: none; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #080808; }
  ::-webkit-scrollbar-thumb { background: #1f1f1f; }

  .cursor {
    position: fixed; width: 8px; height: 8px; background: #c8f060; border-radius: 50%;
    pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
    transition: width 0.15s, height 0.15s;
  }
  .cursor-ring {
    position: fixed; width: 28px; height: 28px; border: 1px solid rgba(200,240,96,0.35);
    border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%);
    transition: left 0.1s ease-out, top 0.1s ease-out, width 0.2s, height 0.2s, border-color 0.2s;
  }
  .cursor-ring.hovered { width: 46px; height: 46px; border-color: rgba(200,240,96,0.65); }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 48px; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    transition: background 0.4s, border-bottom 0.4s;
  }
  .nav.scrolled { background: rgba(8,8,8,0.88); backdrop-filter: blur(16px); border-bottom: 1px solid #1f1f1f; }
  .nav-links { display: flex; gap: 32px; }
  .nav-link { font-family: 'DM Mono', monospace; font-size: 11px; color: #7a7a78; text-decoration: none; letter-spacing: 0.1em; text-transform: uppercase; cursor: none; transition: color 0.2s; position: relative; padding-bottom: 4px; }
  .nav-link:hover { color: #c8f060; }
  .nav-link.active { color: #c8f060; }
  .nav-link.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 1px; background: #c8f060; border-radius: 1px; }

  .section { padding: 100px 48px; max-width: 900px; margin: 0 auto; }
  .section-label { display: flex; align-items: center; gap: 16px; margin-bottom: 48px; }
  .section-label-text { font-family: 'DM Mono', monospace; font-size: 11px; color: #c8f060; letter-spacing: 0.15em; white-space: nowrap; }
  .section-label-line { flex: 1; height: 1px; background: #1f1f1f; }

  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0 48px; max-width: 900px; margin: 0 auto; position: relative; }
  .hero-glow {
    position: absolute; top: 30%; left: -5%; width: 550px; height: 380px; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at center, rgba(200,240,96,0.06) 0%, transparent 65%);
    filter: blur(48px);
  }
  .hero-eyebrow { font-family: 'DM Mono', monospace; font-size: 11px; color: #c8f060; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 24px; opacity: 0; animation: fadeUp 0.6s 0.2s forwards; position: relative; z-index: 1; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(52px, 8vw, 88px); font-weight: 400; line-height: 1.0; margin-bottom: 8px; opacity: 0; animation: fadeUp 0.6s 0.35s forwards; position: relative; z-index: 1; }
  .hero-title-italic { font-style: italic; color: #7a7a78; display: block; }
  .hero-summary { font-family: 'DM Mono', monospace; font-size: 14px; color: #7a7a78; line-height: 1.9; max-width: 520px; margin-top: 32px; margin-bottom: 40px; opacity: 0; animation: fadeUp 0.6s 0.5s forwards; position: relative; z-index: 1; }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.6s 0.65s forwards; position: relative; z-index: 1; }
  .hero-meta { position: absolute; bottom: 48px; left: 48px; display: flex; gap: 28px; z-index: 1; }
  .hero-meta-item { font-family: 'DM Mono', monospace; font-size: 13px; color: #7a7a78; letter-spacing: 0.04em; display: flex; align-items: center; gap: 8px; }
  .hero-meta-item span { color: #f0ede6; }
  .hero-line { position: absolute; right: 0; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, #1f1f1f 30%, #1f1f1f 70%, transparent); }

  .noise {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
  }

  .btn-primary { background: #c8f060; color: #080808; border: none; padding: 11px 28px; border-radius: 2px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; cursor: none; letter-spacing: 0.04em; transition: opacity 0.2s, transform 0.2s; }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-secondary { background: transparent; color: #f0ede6; border: 1px solid #1f1f1f; padding: 11px 28px; border-radius: 2px; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 13px; cursor: none; transition: border-color 0.2s, transform 0.2s; }
  .btn-secondary:hover { border-color: #2e2e2e; transform: translateY(-1px); }

  .exp-card { padding: 28px; background: #0f0f0f; border: 1px solid #1f1f1f; border-radius: 4px; transition: border-color 0.25s, transform 0.25s; }
  .exp-card:hover { border-color: #c8f060; transform: translateY(-2px); }
  .exp-period { font-family: 'DM Mono', monospace; font-size: 11px; color: #c8f060; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
  .exp-role { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: #f0ede6; }
  .exp-company { font-family: 'Syne', sans-serif; font-size: 14px; color: #7a7a78; margin-top: 3px; }
  .exp-divider { height: 1px; background: #1f1f1f; margin: 20px 0; }
  .exp-bullets { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 24px; }
  .exp-bullet { font-family: 'DM Mono', monospace; font-size: 12.5px; color: #7a7a78; line-height: 1.75; padding-left: 16px; position: relative; margin-bottom: 8px; }
  .exp-bullet::before { content: '—'; position: absolute; left: 0; color: #c8f060; }
  .exp-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
  .exp-tag { display: inline-block; padding: 4px 10px; background: #161616; border: 1px solid #1f1f1f; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 11px; color: #7a7a78; transition: border-color 0.2s, color 0.2s; cursor: default; }
  .exp-tag:hover { border-color: #c8f060; color: #c8f060; }

  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: #1f1f1f; border: 1px solid #1f1f1f; border-radius: 4px; overflow: hidden; }
  .skill-group { background: #080808; padding: 24px; transition: background 0.2s; }
  .skill-group:hover { background: #0f0f0f; }
  .skill-group:hover .skill-group-label { color: #f0ede6; }
  .skill-group-label { font-family: 'DM Mono', monospace; font-size: 10px; color: #c8f060; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 14px; transition: color 0.2s; }
  .skill-items { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-item { font-family: 'DM Mono', monospace; font-size: 12px; color: #7a7a78; padding: 3px 8px; border: 1px solid #1f1f1f; border-radius: 2px; transition: color 0.2s, border-color 0.2s; }
  .skill-group:hover .skill-item { color: #9a9a98; border-color: #2a2a2a; }

  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .contact-blurb { font-family: 'DM Mono', monospace; font-size: 14px; color: #7a7a78; line-height: 1.9; }
  .contact-link { display: flex; align-items: center; gap: 12px; text-decoration: none; padding: 10px 12px; margin: 0 -12px; border-radius: 4px; transition: background 0.2s; }
  .contact-link:hover { background: #0f0f0f; }
  .contact-link-label { font-family: 'DM Mono', monospace; font-size: 11px; color: #3d3d3b; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
  .contact-link-value { font-family: 'Syne', sans-serif; font-size: 14px; color: #f0ede6; transition: color 0.2s; }
  .contact-link:hover .contact-link-value { color: #c8f060; }
  .form-label { font-family: 'DM Mono', monospace; font-size: 11px; color: #7a7a78; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; display: block; }
  .form-input { width: 100%; background: #0f0f0f; border: 1px solid #1f1f1f; border-radius: 2px; padding: 10px 14px; font-family: 'DM Mono', monospace; font-size: 13px; color: #f0ede6; outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: #c8f060; }
  .form-input::placeholder { color: #3d3d3b; }
  .form-group { margin-bottom: 16px; }

  .scroll-top {
    position: fixed; bottom: 32px; right: 32px; z-index: 200;
    width: 40px; height: 40px; background: #0f0f0f; border: 1px solid #1f1f1f;
    border-radius: 2px; display: flex; align-items: center; justify-content: center;
    cursor: none; color: #7a7a78; font-size: 16px; font-family: 'DM Mono', monospace;
    transition: opacity 0.3s, transform 0.3s, border-color 0.2s, color 0.2s;
  }
  .scroll-top:hover { border-color: #c8f060; color: #c8f060; }
  .scroll-top.hidden { opacity: 0; pointer-events: none; transform: translateY(10px); }

  .icon-btn { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border: 1px solid #1f1f1f; border-radius: 2px; background: #0f0f0f; text-decoration: none; transition: border-color 0.2s; }
  .icon-btn:hover { border-color: #c8f060; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s, transform 0.65s; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 640px) {
    body { cursor: auto; }
    .cursor, .cursor-ring { display: none; }
    .nav { padding: 0 24px; }
    .hero { padding: 0 24px; }
    .hero-meta { flex-wrap: wrap; gap: 14px; }
    .section { padding: 80px 24px; }
    .contact-grid { grid-template-columns: 1fr; }
    .exp-bullets { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .scroll-top { bottom: 20px; right: 20px; }
  }
`;

const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8f060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8f060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8f060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconEmail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8f060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8f060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8f060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}



function SectionLabel({ num, label }) {
  return (
    <div className="section-label">
      <span className="section-label-text">{num} / {label}</span>
      <div className="section-label-line" />
    </div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const cursorRef = useRef();
  const ringRef = useRef();
  const isHovered = useRef(false);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
    };
    const setHover = (v) => () => { isHovered.current = v; ringRef.current?.classList.toggle("hovered", v); };
    const interactables = document.querySelectorAll("a, button, .nav-link, .skill-group, .exp-card, .scroll-top");
    window.addEventListener("mousemove", move);
    interactables.forEach(el => { el.addEventListener("mouseenter", setHover(true)); el.addEventListener("mouseleave", setHover(false)); });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);
      const sections = ["contact", "skills", "experience", "about"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = () => {
    if (!formState.name || !formState.email) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  const expRef = useReveal();
  const skillsRef = useReveal();
  const contactRef = useReveal();

  const iconBox = { width: 36, height: 36, background: "#161616", border: "1px solid #1f1f1f", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };

  return (
    <>
      <style>{css}</style>
      <div className="noise" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Scroll to top */}
      <div className={`scroll-top ${showTop ? "" : "hidden"}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</div>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-links">
          {["about", "experience", "skills", "contact"].map(s => (
            <span key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>{s}</span>
          ))}
          <Link href="/projects" className="nav-link" style={{ textDecoration: "none" }}>projects</Link>
        </div>
      </nav>

      {/* HERO */}
      <div id="about" className="hero">
        <div className="hero-glow" />
        <h1 className="hero-title">
          Mehersuneel Meesala
          <span className="hero-title-italic">Software Engineer.</span>
        </h1>
        <p className="hero-summary">{data.summary}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("contact")}>Get in Touch →</button>
          <button className="btn-secondary" onClick={() => scrollTo("experience")}>View Experience</button>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-item"><IconPin /><span>{data.location}</span></div>
          <div className="hero-meta-item"><IconBriefcase /><span>M&T Bank</span></div>
          <div className="hero-meta-item"><IconClock /><span>3+ Years Exp</span></div>
        </div>
        <div className="hero-line" />
      </div>

      {/* EXPERIENCE */}
      <div id="experience" className="section">
        <SectionLabel num="01" label="Experience" />
        <div ref={expRef} className="reveal">
          {data.experience.map((exp, i) => (
            <div key={i} className="exp-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="exp-period">{exp.period}</div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">{exp.company} · {exp.location}</div>
                </div>
                <a href={data.linkedin} target="_blank" rel="noreferrer" style={{ ...iconBox, color: "#7a7a78", fontSize: 14, textDecoration: "none" }}>↗</a>
              </div>
              <div className="exp-divider" />
              <div className="exp-bullets">
                {exp.bullets.map((b, j) => <div key={j} className="exp-bullet">{b}</div>)}
              </div>
              <div className="exp-tags">
                {exp.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div id="skills" className="section" style={{ paddingTop: 0 }}>
        <SectionLabel num="02" label="Skills" />
        <div ref={skillsRef} className="reveal">
          <div className="skills-grid">
            {data.skills.map(({ group, items }) => (
              <div key={group} className="skill-group">
                <div className="skill-group-label">{group}</div>
                <div className="skill-items">
                  {items.map(item => <span key={item} className="skill-item">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="section" style={{ paddingTop: 0 }}>
        <SectionLabel num="03" label="Contact" />
        <div ref={contactRef} className="reveal contact-grid">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 400, lineHeight: 1.2, marginBottom: 20 }}>
              Let's build<br /><span style={{ fontStyle: "italic", color: "#7a7a78" }}>something great.</span>
            </h2>
            <p className="contact-blurb">Open to senior software engineering roles and interesting backend/distributed-systems problems. Currently based in Bangalore.</p>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
              <a href={`mailto:${data.email}`} className="contact-link">
                <div style={iconBox}><IconEmail /></div>
                <div>
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">{data.email}</div>
                </div>
              </a>
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                <div style={iconBox}><IconLinkedIn /></div>
                <div>
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">linkedin.com/in/meher-suneel-meesala</div>
                </div>
              </a>
              <a href={data.github} target="_blank" rel="noreferrer" className="contact-link">
                <div style={iconBox}><IconGithub /></div>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">github.com/suneelmeesalameher</div>
                </div>
              </a>
            </div>
          </div>

          <div>
            {sent ? (
              <div style={{ padding: "32px", background: "#0f0f0f", border: "1px solid #c8f060", borderRadius: 4, textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#c8f060", marginBottom: 8 }}>Message sent ✓</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#7a7a78" }}>I'll get back to you soon.</div>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" placeholder="Your name" value={formState.name} onChange={e => setFormState(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="your@email.com" value={formState.email} onChange={e => setFormState(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={4} placeholder="What are you working on?" style={{ resize: "vertical" }} value={formState.message} onChange={e => setFormState(p => ({ ...p, message: e.target.value }))} />
                </div>
                <button className="btn-primary" style={{ width: "100%", opacity: sending ? 0.7 : 1 }} onClick={handleSubmit} disabled={sending}>
                  {sending ? "Sending…" : "Send Message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1f1f1f", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 900, margin: "0 auto" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#3d3d3b" }}>© 2026 Mehersuneel Meesala</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href={`mailto:${data.email}`} className="icon-btn"><IconEmail /></a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="icon-btn"><IconLinkedIn /></a>
          <a href={data.github} target="_blank" rel="noreferrer" className="icon-btn" style={{ color: "#7a7a78" }}><IconGithub /></a>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#3d3d3b", marginLeft: 4 }}>
            Built with <span style={{ color: "#c8f060" }}>React</span> · <span style={{ color: "#c8f060" }}>Vercel</span>
          </span>
        </div>
      </footer>
    </>
  );
}
