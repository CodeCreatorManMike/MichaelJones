'use client';
import {useEffect,useRef,useState} from 'react';

const experience=[
 {company:'INDIDA CONSULTING',role:'Creative Director / IT Management / AI Engineer',period:'EXPERIENCE',summary:'Creative, technical and AI-focused work spanning product direction, systems and implementation.'},
 {company:'VIADEX',role:'Marketing Intern / Junior GTM Engineer',period:'EXPERIENCE',summary:'Built AI-first outbound systems, enrichment architecture, integrations and enablement supporting 16+ qualified enterprise meetings per month.'},
 {company:'VX-ONE',role:'Junior Technical Analyst',period:'EXPERIENCE',summary:'Delivered DEX tooling, automation, ITSM integrations and platform documentation across a large enterprise estate.'},
 {company:'RECYCL JUNCTION',role:'Digital / Technical Work',period:'EXPERIENCE',summary:'Part of three years of professional experience across technology, consulting, marketing and digital delivery.'}
];

const flagship=[
 {title:'GRAVITY',kind:'AI HARDWARE / FULL STACK',copy:'AI-powered accountability device built around an ESP32-S3, circular display and environmental sensors. FastAPI + PostgreSQL backend, pgvector memory, provider-agnostic Claude/Groq/Ollama layer, SearXNG research and a multi-agent VPS development workflow.',tags:['ESP32-S3','FASTAPI','POSTGRESQL','PGVECTOR','OLLAMA'],link:'https://github.com/CodeCreatorManMike/GRAVITY-OS',linkLabel:'REPO ↗'},
 {title:'NKANDA',kind:'MOBILE / RAG / TRAVEL',copy:'AI-powered visa and travel admin app. A RAG system grounded in official government rules reviews applications, flags missing information, recommends corrections and turns complex compliance into a guided mobile flow.',tags:['SWIFTUI','RAG','OCR','AI','PRODUCT DESIGN'],link:'https://github.com/CodeCreatorManMike/Nkanda',linkLabel:'REPO ↗'},
 {title:'ALCOVE',kind:'MOBILE / DISCOVERY',copy:'Furniture discovery product matching people with furniture based on taste, room and budget through a guided, visual discovery experience rather than a traditional catalogue.',tags:['MOBILE','RECOMMENDATION','UX','BRAND'],link:'https://github.com/CodeCreatorManMike/Alcove',linkLabel:'REPO ↗'},
 {title:'KIT-BIN',kind:'WASM / WEB PLATFORM',copy:'Free client-side file conversion platform for PDF, image, audio, video and CSV. Built with Cloudflare Pages, GitLab CI/CD, an SEO content pipeline, editorial guides and privacy-first local processing.',tags:['WASM','CLOUDFLARE','GITLAB CI/CD','SEO'],link:'https://kit-bin.com/',linkLabel:'VISIT ↗'},
 {title:'AI VOICE AGENTS',kind:'VOICE / RAG / VPS',copy:'Self-running RAG pipeline combining voice translation, speech recognition and content generation, deployed on a Hostinger VPS and integrated into an application in development.',tags:['RAG','VOICE AI','VPS','AUTOMATION']},
 {title:'PYTHON LEARNING PLATFORM',kind:'EDTECH / AI BUILD',copy:'Turned a full Python course and supporting fundamentals into a Codecademy-style learning platform with lessons, XP, levels, badges and unlockable projects—in 24 hours.',tags:['PYTHON','GPT-5','EDTECH','GAMIFICATION']}
];

const gtm=[
 ['Clay Central Database','Centralised enrichment and targeting architecture improving data accuracy and reuse.'],
 ['Account Plan Generator','Clay system that automatically generates structured account plans for ABM research.'],
 ['Lemlist Campaign Operations','Owned campaign creation, launch, QC and optimisation across multiple product lines; maintained <1% bounce and >40% opens while improving replies.'],
 ['Python API Integration','Custom Lemlist API tool surfacing LinkedIn engagement and outreach signals.'],
 ['Clay ↔ Lemlist Webhooks','Real-time enrichment and outreach synchronisation with fewer manual handoffs.'],
 ['Automated Landing Pages','n8n workflow generating campaign landing pages programmatically.'],
 ['Agentic Voice Assistant "Amy"','Prototype conversational AI assistant for outbound experimentation.'],
 ['Visitor Qualification','Detected, qualified and triggered follow-up on web visitors.'],
 ['Signal-Based Campaigns','Job-change and compliance-trigger outreach plus multi-vertical nurture portfolios.'],
 ['TAM & Buying Groups','Rebuilt TAM structures, buying-group mapping and function normalisation.'],
 ['Event Lead Pipeline','Extraction → enrichment → cadence workflow for webinar and event leads.'],
 ['Reporting & Enablement','Marketing SharePoint, analytics, newsletters, leadership reporting and tool academies covering Clay, n8n, Lemlist, Salesloft, HTML and Python.']
];

const enterprise=[
 ['ESG Vendor Data Pipeline','Flagship scraping, ingestion and normalisation system for carbon LCA and Energy Star laptop data.'],
 ['AI Nexthink Scraper & Uploader','AI-assisted sourcing and deployment of Nexthink Remote Actions plus a KB scraper prototype.'],
 ['Internal AI Adoption Demos','Claude productivity research and practical workflow demonstrations.'],
 ['DEX Remote Action Library','Security, diagnostics, browser checks, macOS Sophos, temperature monitoring, BitLocker automation and speed tests.'],
 ['Performance Workflows','Chrome/Excel memory reduction, reboot campaigns and estate health reporting.'],
 ['Azure & Intune Automation','Azure Function automation and managed Chrome favourites deployment for macOS.'],
 ['Enterprise Diagnostics','First-line support and root-cause analysis for crashes, freezes, connectivity and device issues.'],
 ['ITSM Integration','DevOps integration, ticket notifications and categorisation improvements.'],
 ['100+ Knowledge Articles','Customer and internal documentation, exporter tooling, full review and rebrand programme.'],
 ['Platform & Predictive Work','Feature wireframes, test personas, hardware imagery, SharePoint migration work and predictive-capability research.'],
 ['Adoption & Alerting','Product-adoption campaign and custom Nexthink stakeholder alerts.']
];

const clients=[
 ['HONK STUDIOS','Oxford recording-studio brand, website and booking experience.'],
 ['RECYCL JUNCTION TRADING','Production website for a recycling business.'],
 ['PAWPACKPANTRY','E-commerce-style pet product discovery and ordering experience.'],
 ['MICHAEL-JONES-OS','Personal site and independent music/creative brand hub.'],
 ['GLOBAL MOBILITY PLATFORM','Relocation workflow platform co-built with two developers.']
];

const certs=['Certified Nexthink Professional — DEX Management','Certified Nexthink Associate — IT Support','Certified Nexthink Associate','CybSafe Certification in Security Awareness (CCSA)','TryHackMe Pre Security','Python Crash Course — Eric Matthes','PowerShell for System Admins — Adam Bertram','Codecademy: HTML, CSS & PowerShell'];
const microsoft=['Introduction to Microsoft Intune','Protect Your Endpoint Environment with Microsoft Intune','Device Management using Microsoft Intune','Conditional Access Policies','Analyse and Resolve Compliance Issues','Benefits of Microsoft Intune','App Management using Microsoft Intune'];

const heroVideos=['/ascii-animation.mp4','/ascii-animation2.mp4','/ascii-animation3.mp4','/ascii-animation4.mp4','/ascii-animation5.mp4'];

const projectImages=[
 '/projects/HonkStudios_Home_Page.png','/projects/HonkStudios_Home_Page_Bottom.png','/projects/HonkStudios_ListenPage.png','/projects/HonkStudios_StudiosServices.png','/projects/HonkStudios_Visit_Us.png',
 '/projects/Kit-Bin_guides_dark.png','/projects/Kit-Bin_guides_light.png','/projects/Kit-Bin_home_dark.png','/projects/Kit-Bin_home_light.png','/projects/Kit-Bin_tool_page_dark.png','/projects/Kit-Bin_tool_page_light.png',
 '/projects/PawPackPantry_Home_Page.png','/projects/PawPackPantry_Home_Place_An_Order.png','/projects/PawPackPantry_Home_Widgets.png','/projects/PawPackPantry_Latest_News.png','/projects/PawPackPantry_Menu_Page.png','/projects/PawPackPantry_StreetSmart.png','/projects/PawPackPantry_Testimonies.png',
 '/projects/RecyclJunction_Home_Page.png','/projects/RecyclJunction_Home_Page_fourth.png','/projects/RecyclJunction_Home_Page_second.png','/projects/RecyclJunction_Home_Page_third.png',
 '/projects/THE_WALL_Intro.png','/projects/the_WALL_MAIN.png'
];

function Boot(){const[n,setN]=useState(0);useEffect(()=>{const i=setInterval(()=>setN(v=>Math.min(v+3,100)),24);return()=>clearInterval(i)},[]);return <div className={'boot '+(n===100?'done':'')}><div><b>MJ/OS</b><p>LOADING PROFESSIONAL PROFILE...</p><div className="bar"><i style={{width:n+'%'}}/></div><small>{String(n).padStart(3,'0')}% · {n<100?'READING CV DATA':'PROFILE READY'}</small></div></div>}

function VideoSwitcher(){
 const[active,setActive]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setActive(v=>(v+1)%heroVideos.length),8000);return()=>clearInterval(t)},[]);
 return <>
  {heroVideos.map((src,i)=><video key={src} className={'portrait '+(active===i?'active':'')} autoPlay muted loop playsInline poster={i===0?'/ascii-magic-2.png':undefined}><source src={src} type="video/mp4"/></video>)}
  <div className="video-dots">{heroVideos.map((src,i)=><button key={src} className={active===i?'active':''} onClick={()=>setActive(i)}>{String(i+1).padStart(2,'0')}</button>)}</div>
 </>
}

function ProjectMouseTrail(){
 const zoneRef=useRef(null);
 const[items,setItems]=useState([]);
 const lastSpawn=useRef(0);
 const lastImg=useRef(null);
 const idRef=useRef(0);
 useEffect(()=>{
  const el=zoneRef.current;
  if(!el)return;
  if(typeof window!=='undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches)return;
  const onMove=(e)=>{
   const now=performance.now();
   if(now-lastSpawn.current<100)return;
   lastSpawn.current=now;
   const rect=el.getBoundingClientRect();
   let img=projectImages[Math.floor(Math.random()*projectImages.length)];
   if(projectImages.length>1){while(img===lastImg.current){img=projectImages[Math.floor(Math.random()*projectImages.length)]}}
   lastImg.current=img;
   const id=++idRef.current;
   const rot=(Math.random()*12-6).toFixed(1);
   const item={id,x:e.clientX-rect.left,y:e.clientY-rect.top,img,rot};
   setItems(prev=>[...prev.slice(-13),item]);
   setTimeout(()=>{setItems(prev=>prev.filter(it=>it.id!==id))},950);
  };
  el.addEventListener('mousemove',onMove);
  return()=>el.removeEventListener('mousemove',onMove);
 },[]);
 return <div ref={zoneRef} className="mouse-trail-zone">
  {items.map(it=><div key={it.id} className="trail-image" style={{left:it.x,top:it.y,'--rot':it.rot+'deg'}}><img src={it.img} alt="" draggable={false}/></div>)}
 </div>
}

function SystemGrid({items}){return <div className="system-grid">{items.map(([title,copy],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>}

export default function Page(){
 const[time,setTime]=useState('');useEffect(()=>{const t=setInterval(()=>setTime(new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'})),1000);return()=>clearInterval(t)},[]);
 return <main><Boot/><div className="grain"/>
  <nav className="floating-nav" aria-label="Primary navigation"><div><a href="#experience">EXPERIENCE</a><a href="#projects">PROJECTS</a><a href="#skills">SKILLS</a><a href="#education">EDUCATION</a><a href="#contact">CONTACT</a></div></nav>
  <section id="top" className="hero"><VideoSwitcher/><div className="scanlines"/><ProjectMouseTrail/><div className="hero-copy"><p className="eyebrow">[ CREATIVE DEVELOPER · AI ENGINEER · TECHNICAL ANALYST ]</p><h1>MICHAEL<br/><em>JONES</em></h1><p className="intro">Self-taught developer building AI-integrated products end-to-end—from physical devices and mobile apps to enterprise automation and production websites.</p><div className="hero-actions"><a href="#projects">VIEW SYSTEMS ↓</a><a href="#experience">READ CV ↓</a></div></div><aside className="system"><p>EXPERIENCE <b>3+ YEARS</b></p><p>LOCATION <b>OXFORD / UK</b></p><p>STUDY <b>BSc ARTIFICIAL INTELLIGENCE</b></p><p>LOCAL TIME <b>{time}</b></p></aside><div className="hero-foot"><span>ASCII FEED / AUTO SWITCH 08 SEC</span><span>BUILD 02 · 2026</span></div></section>
  <section className="ticker"><div>AI ENGINEERING +++ FULL-STACK DEVELOPMENT +++ MOBILE PRODUCTS +++ DEX AUTOMATION +++ HARDWARE PROTOTYPING +++ GTM SYSTEMS +++ CI/CD +++ </div></section>
  <section id="experience" className="section"><div className="section-head"><span>01 / PROFESSIONAL EXPERIENCE</span><span>3+ YEARS / 4 ORGANISATIONS</span></div><div className="timeline">{experience.map((x,i)=><article key={x.company}><span className="num">0{i+1}</span><div><p>{x.period}</p><h2>{x.company}</h2></div><div><h3>{x.role}</h3><p>{x.summary}</p></div></article>)}</div></section>
  <section id="projects" className="section"><div className="section-head"><span>02 / FLAGSHIP PROJECTS</span><span>DESIGNED + BUILT</span></div><div className="project-grid">{flagship.map((p,i)=><article key={p.title}><span className="project-no">P/{String(i+1).padStart(2,'0')}</span><p>{p.kind}</p><h2>{p.title}</h2><p className="copy">{p.copy}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>{p.link&&<a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel}</a>}<div className="ascii-mark">{['▓▒░','╱╲','◢◤','[<>]','((( )))','+ XP'][i]}</div></article>)}</div></section>
  <section className="section systems"><div className="section-head"><span>03 / GTM ENGINEERING</span><span>AI-FIRST OUTBOUND SYSTEMS</span></div><p className="lead">Built and scaled demand-generation infrastructure using Clay, Lemlist, n8n and Python, supporting 16+ qualified enterprise meetings per month.</p><SystemGrid items={gtm}/></section>
  <section className="section systems"><div className="section-head"><span>04 / TECHNICAL ANALYSIS + DEX</span><span>NEXTHINK · POWERSHELL · PYTHON · AZURE</span></div><p className="lead">Enterprise-scale automation, diagnostics, ITSM integrations, AI adoption and more than 100 internal and customer-facing knowledge articles.</p><SystemGrid items={enterprise}/></section>
  <section className="section"><div className="section-head"><span>05 / CLIENT + PLATFORM BUILDS</span><span>LIVE DIGITAL PRODUCTS</span></div><SystemGrid items={clients}/></section>
  <section id="skills" className="section"><div className="section-head"><span>06 / TECHNICAL STACK</span><span>CAPABILITIES.LOG</span></div><div className="skills"><div><h3>BUILD</h3>{['Python','FastAPI','PostgreSQL / pgvector','Swift / SwiftUI','JavaScript / React','HTML / CSS','WASM','APIs / Webhooks','Web Scraping'].map(x=><span key={x}>{x}</span>)}</div><div><h3>AI + AUTOMATION</h3>{['RAG Systems','Claude / GPT / Groq','Ollama','AI Agent Orchestration','n8n','Clay','Lemlist','Voice AI','sentence-transformers'].map(x=><span key={x}>{x}</span>)}</div><div><h3>INFRA + ENTERPRISE</h3>{['GitLab CI/CD','Docker','Cloudflare Pages','VPS / Homelab','Tailscale / VPN','Nexthink DEX','PowerShell','Azure / Intune','ITSM'].map(x=><span key={x}>{x}</span>)}</div><div><h3>PRODUCT + HARDWARE</h3>{['Product Design','Figma / Wireframing','Brand Systems','ESP32-S3','Sensors / Embedded','PCB Planning','SEO Pipelines','Technical Writing'].map(x=><span key={x}>{x}</span>)}</div></div></section>
  <section className="section infra"><div className="section-head"><span>07 / INFRASTRUCTURE + LEARNING</span><span>SELF-DIRECTED</span></div><div className="terminal"><div className="terminal-top"><i/><i/><i/><span>michael@homelab:~</span></div><p><b>$</b> cat infrastructure.txt</p><p>Self-hosted GitLab CE on a home NUC using Docker Compose, with an Ollama-powered Python code-review service. Extended AI inference through a secure remote server over Tailscale/SSH, with a custom agent and Telegram gateway. Production CI/CD flows from GitLab to Cloudflare Pages.</p><p><b>$</b> cat current_learning.txt</p><p>Python roadmap, linear algebra and calculus preparation for a BSc in Artificial Intelligence. Earlier builds include a full Blackjack remake with JSON persistence, bank simulation, API/CSV/webhook tools and a Gumtree value-ranking scraper.</p><span className="caret">█</span></div></section>
  <section id="education" className="section"><div className="section-head"><span>08 / EDUCATION + ACHIEVEMENTS</span><span>CREDENTIALS</span></div><div className="education"><article><p>UNIVERSITY</p><h2>BSc ARTIFICIAL INTELLIGENCE</h2><h3>Oxford Brookes University</h3></article><article><p>SECONDARY EDUCATION</p><h2>80% / A AVERAGE</h2><h3>Crawford International — North Coast</h3><ul><li>6 distinctions and 2 Bs</li><li>Top 1% nationally in History, Business, Art and Geography</li><li>Full Academic Colours</li><li>Full Community Service Colours</li><li>Humanitarian Award</li></ul></article></div><div className="credential-grid"><div><h3>CERTIFICATIONS</h3>{certs.map(x=><p key={x}>✓ {x}</p>)}</div><div><h3>MICROSOFT LEARN · INTUNE</h3>{microsoft.map(x=><p key={x}>+ {x}</p>)}</div></div></section>
  <section id="contact" className="contact section"><p>[ 09 / OPEN CHANNEL ]</p><h2>BUILDING THE<br/><em>NEXT SYSTEM.</em></h2><div><a href="mailto:michaeljonesincorporated@gmail.com" target="_blank" rel="noopener noreferrer">EMAIL ↗</a><a href="https://www.linkedin.com/in/michael-jones-50a37b261/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="https://github.com/CodeCreatorManMike" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.instagram.com/michael._.jones06/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a><a href="https://www.tiktok.com/@michael._.jones" target="_blank" rel="noopener noreferrer">TIKTOK ↗</a><a href="https://www.youtube.com/@Michael._.jones06" target="_blank" rel="noopener noreferrer">YOUTUBE ↗</a><a href="#top">BACK TO TOP ↑</a></div></section><footer><span>MICHAEL JONES / CV SYSTEM</span><span>OXFORD · UNITED KINGDOM · 2026</span></footer>
 </main>
}
