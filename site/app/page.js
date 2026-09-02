'use client';
import {useEffect,useRef,useState} from 'react';
import AsciiDonut from './AsciiDonut';
import AsciiDiscoBall from './AsciiDiscoBall';
import AsciiInvader from './AsciiInvader';
import AsciiCRT from './AsciiCRT';
import AsciiCursor from './AsciiCursor';
import SiteFooter from './SiteFooter';

const experience=[
 {company:'INDIDA CONSULTING',role:'Creative Director / IT Management / AI Engineer',summary:'Creative, technical and AI-focused work spanning product direction, systems and implementation across a growing consultancy practice.',tags:['CREATIVE DIRECTION','AI ENGINEERING','IT MANAGEMENT'],icon:'/logos/indida-consulting.webp'},
 {company:'VIADEX',role:'Marketing Intern / Junior GTM Engineer',summary:'Built AI-first outbound systems, enrichment architecture, integrations and enablement supporting 16+ qualified enterprise meetings per month.',tags:['CLAY','LEMLIST','N8N','GTM'],icon:'/logos/viadex.webp'},
 {company:'VX-ONE',role:'Junior Technical Analyst',summary:'Delivered DEX tooling, automation, ITSM integrations and platform documentation across a large enterprise estate.',tags:['NEXTHINK DEX','POWERSHELL','AZURE','ITSM'],icon:'/logos/vx-one.webp'},
 {company:'RECYCL JUNCTION',role:'Digital / Technical Work',summary:'Digital and technical delivery work as part of three years of professional experience spanning technology, consulting, marketing and delivery.',tags:['WEB DELIVERY','DIGITAL OPS'],icon:'/logos/recycl-junction.webp'}
];

const flagship=[
 {title:'GRAVITY',kind:'AI HARDWARE / FULL STACK',copy:'AI-powered accountability device built around an ESP32-S3, circular display and environmental sensors. FastAPI + PostgreSQL backend, pgvector + sentence-transformers memory, a provider-agnostic Claude/Groq/Ollama layer, self-hosted SearXNG research and a multi-agent "Hermes" VPS development workflow using GitHub Projects as a shared task board. Full hardware plan mapped toward a custom PCB via JLCPCB.',tags:['ESP32-S3','FASTAPI','POSTGRESQL','PGVECTOR','OLLAMA'],icon:'/logos/gravity.webp',links:[{type:'repo',href:'https://github.com/CodeCreatorManMike/GRAVITY-OS',label:'VIEW REPO ↗'}]},
 {title:'NKANDA',kind:'MOBILE / RAG / TRAVEL',copy:'AI-powered visa and travel admin app that digitises paperwork end-to-end. A RAG system trained on official government documentation reviews submitted information against the source rules, recommends corrections and flags missing information before submission.',tags:['SWIFTUI','RAG','OCR','AI','PRODUCT DESIGN'],icon:'/logos/nkanda.webp',links:[{type:'repo',href:'https://github.com/CodeCreatorManMike/Nkanda',label:'VIEW REPO ↗'}]},
 {title:'ALCOVE',kind:'MOBILE / DISCOVERY',copy:'Furniture discovery product matching people with furniture based on taste, room and budget through a guided, visual discovery experience rather than a traditional catalogue search.',tags:['MOBILE','RECOMMENDATION','UX','BRAND'],icon:'/logos/alcove.webp',links:[{type:'repo',href:'https://github.com/CodeCreatorManMike/Alcove',label:'VIEW REPO ↗'}]},
 {title:'KIT-BIN',kind:'WASM / WEB PLATFORM',copy:'Free, 100% client-side (WASM) file conversion platform for PDF, image, audio, video and CSV. Hosted on Cloudflare Pages with a GitLab CI/CD pipeline, an SEO content pipeline, an editorial guides section and privacy-first local processing — monetised via Adsterra and Ko-fi.',tags:['WASM','CLOUDFLARE','GITLAB CI/CD','SEO'],icon:'/logos/kit-bin.webp',links:[{type:'site',href:'https://kit-bin.com/',label:'VISIT SITE ↗'},{type:'repo',href:'https://github.com/CodeCreatorManMike/Kit-Bin',label:'VIEW REPO ↗'}]}
];

const enterprise=[
 ['ESG Vendor Data Pipeline','Flagship project: scraped ESG data (carbon LCA, Energy Star ratings) from vendor laptop pages, then ingested and normalised it into a unified structure — powering ESG insights for customers and internal stakeholders through the company platform.','/logos/technical/esg-vendor-pipeline.webp'],
 ['AI Nexthink Scraper & Uploader','Built an AI-powered scraper/uploader using Claude to source and deploy Nexthink Remote Actions, and prototyped a Nexthink KB scraper to accelerate content sourcing and cut manual admin.','/logos/technical/ai-nexthink-scraper-uploader.webp'],
 ['Internal AI Adoption Demos','Researched Claude for team productivity use cases and built internal demos showing how AI could be woven into company workflows, supporting a wider AI-adoption push.','/logos/technical/internal-ai-adoption-demos.webp'],
 ['Nexthink DEX Remote Action Library','Built and maintained a library of custom Remote Actions across security, diagnostics and encryption — Edge/Chrome checks, Sophos AV scripting for macOS, CPU/temperature monitoring, BitLocker automation tied into Azure, and speed tests — each documented for team reuse.','/logos/technical/nexthink-dex-remote-action-library.webp'],
 ['Performance & Memory Workflows','Diagnostic scripting to identify high-RAM Chrome tabs, plus educational workflows to cut memory use in Chrome/Excel, a device reboot campaign, and connectivity/speed/RAM health reporting across the estate.','/logos/technical/performance-memory-workflows.webp'],
 ['Azure & Intune Automation','Built an Azure Function to automate a recurring operational process, and configured Chrome favourites deployment for macOS via Intune for consistent device configuration at scale.','/logos/technical/azure-intune-automation.webp'],
 ['First-Line Support & Diagnostics','Managed first-line support and root-cause analysis for crashes, freezes, connectivity and device issues across a large enterprise IT estate using Nexthink DEX data.','/logos/technical/first-line-support-diagnostics.webp'],
 ['ITSM Platform Integration','Delivered a DevOps integration between Nexthink and the ITSM platform, automated service-desk ticket notifications, and reorganised ticket categorisation to cut manual triage.','/logos/technical/itsm-platform-integration.webp'],
 ['100+ Knowledge Articles','Authored and maintained 100+ customer-facing and internal KB articles — onboarding guides, persona creation, asset processes, tooling usage and a KB exporter tool — plus a full review and rebrand after a platform name change.','/logos/technical/100-knowledge-articles.webp'],
 ['Platform & Predictive Work','Wireframing and mock-ups with developers for new features, test personas and hardware imagery, a "Links" section on the SharePoint migration, and research into predictive-analytics capability.','/logos/technical/platform-predictive-work.webp'],
 ['Adoption & Alerting','Ran a product-adoption campaign and built custom Nexthink alerts tailored to stakeholder-specific monitoring needs.','/logos/technical/adoption-alerting.webp']
];

const gtm=[
 ['Clay Central Database','Designed and administered a centralised Clay database powering company/contact enrichment and campaign targeting across the GTM function — improving data accuracy and reuse across teams.','/logos/gtm/clay-central-database.webp'],
 ['Account Plan Generator','Built a Clay-based system that auto-generates structured account plans for target accounts, streamlining ABM research and rep prep time.','/logos/gtm/account-plan-generator.webp'],
 ['Lemlist Campaign Operations','Owned the full campaign lifecycle — creation, launch, QC, optimisation — across multiple product lines, pushing reply rate from 0.39% toward a 0.8–1.0% target while holding <1% bounce and >40% opens.','/logos/gtm/lemlist-campaign-operations.webp'],
 ['Lemlist Python API Tool','Custom Python program against the Lemlist API surfacing LinkedIn engagement and outreach signals for more targeted, data-driven follow-up.','/logos/gtm/lemlist-python-api-tool.webp'],
 ['Clay ↔ Lemlist Webhooks','Engineered a webhook integration connecting enrichment and outreach platforms, keeping campaign data in sync in real time and cutting manual handoffs.','/logos/gtm/clay-lemlist-webhooks.webp'],
 ['Automated Landing Pages','n8n workflow generating campaign landing pages programmatically, cutting manual page-build time.','/logos/gtm/automated-landing-pages.webp'],
 ['Agentic Voice Assistant "Amy"','Prototyped an agentic AI voice model for GTM experimentation, exploring conversational AI in outbound engagement.','/logos/gtm/agentic-voice-assistant-amy.webp'],
 ['Visitor Qualification','Automation to detect, qualify and trigger outbound follow-up on website visitors — turning anonymous traffic into actionable pipeline signals.','/logos/gtm/visitor-qualification.webp'],
 ['Signal-Based Campaigns','Trigger-based outreach keyed to job-change and compliance-deadline signals, improving relevance and timing of outbound touches.','/logos/gtm/signal-based-campaigns.webp'],
 ['Multi-Vertical Campaign Portfolio','Launched and managed outbound campaigns across multiple product lines and verticals, plus persona-based nurture cadences and insurance/legal bottom-of-funnel sequences.','/logos/gtm/multi-vertical-campaign-portfolio.webp'],
 ['TAM & Buying-Group Mapping','Reworked Total Addressable Market data structure and built buying-group mapping with function normalisation, improving segmentation accuracy.','/logos/gtm/tam-buying-group-mapping.webp'],
 ['Third-Party Data Enrichment','Managed multiple iterations of third-party data enrichment, improving contact and firmographic data quality for outbound targeting.','/logos/gtm/third-party-data-enrichment.webp'],
 ['Event & Webinar Lead Pipeline','End-to-end workflow from webinar/event lead extraction through enrichment and cadence launch.','/logos/gtm/event-webinar-lead-pipeline.webp'],
 ['Reporting & Enablement Hub','Built and maintained the marketing SharePoint site, analytics reporting and internal newsletters, plus a LinkedIn engagement booklet for leadership visibility.','/logos/gtm/reporting-enablement-hub.webp'],
 ['GTM Tooling Academies','Designed induction sessions on Clay, n8n, Lemlist, Salesloft, HTML and Python for onboarding new GTM hires.','/logos/gtm/gtm-tooling-academies.webp']
];

const clients=[
 ['HONK STUDIOS','Oxford recording-studio brand — website build, deployment and booking experience.','/logos/honk-studios.webp'],
 ['RECYCL JUNCTION TRADING','Production website for a recycling business, built and deployed end-to-end.','/logos/recycl-junction.webp'],
 ['PAWPACKPANTRY','E-commerce-style site for discovering and shopping pet products.','/logos/pawpackpantry.webp'],
 ['KIT-BIN','Free, client-side file conversion platform — PDF, image, audio, video and CSV, live at kit-bin.com.','/logos/kit-bin.webp'],
 ['INDIDA CONSULTING','Creative direction, IT management and AI engineering for a growing consultancy practice.','/logos/indida-consulting.webp']
];

const certs=['Certified Nexthink Professional — DEX Management','Certified Nexthink Associate — IT Support','Certified Nexthink Associate','CybSafe Certification in Security Awareness (CCSA)','TryHackMe Pre Security','Python Crash Course — Eric Matthes','PowerShell for System Admins — Adam Bertram','Codecademy: HTML, CSS & PowerShell'];
const microsoft=['Introduction to Microsoft Intune','Protect Your Endpoint Environment with Microsoft Intune','Device Management using Microsoft Intune','Conditional Access Policies','Analyse and Resolve Compliance Issues','Benefits of Microsoft Intune','App Management using Microsoft Intune'];

const heroVideos=['/ascii-animation2.mp4','/ascii-animation3.mp4','/ascii-animation4.mp4','/ascii-animation5.mp4'];

const projectImages=[
 '/projects/Gravity_01-app-check.webp','/projects/Gravity_01-check-tasks.webp','/projects/Gravity_02-app-check.webp','/projects/Gravity_02-check-tasks.webp','/projects/Gravity_03-app-check.webp','/projects/Gravity_03-check-tasks.webp','/projects/Gravity_04-app-check.webp','/projects/Gravity_breakdown-cross-section.webp','/projects/Gravity_breakdown-overview.webp','/projects/Gravity_drawing-EX-04-exploded.webp','/projects/Gravity_drawing-GA-01-general-arrangement.webp','/projects/Gravity_drawing-IS-03-isometric.webp','/projects/Gravity_drawing-OR-02-orthographic.webp','/projects/Gravity_drawing-ST-06-backstand.webp',
 '/projects/HonkStudios_Home_Page.webp','/projects/HonkStudios_Home_Page_Bottom.webp','/projects/HonkStudios_ListenPage.webp','/projects/HonkStudios_StudiosServices.webp','/projects/HonkStudios_Visit_Us.webp',
 '/projects/Kit-Bin_guides_dark.webp','/projects/Kit-Bin_guides_light.webp','/projects/Kit-Bin_home_dark.webp','/projects/Kit-Bin_home_light.webp','/projects/Kit-Bin_tool_page_dark.webp','/projects/Kit-Bin_tool_page_light.webp',
 '/projects/PawPackPantry_Home_Page.webp','/projects/PawPackPantry_Home_Place_An_Order.webp','/projects/PawPackPantry_Home_Widgets.webp','/projects/PawPackPantry_Latest_News.webp','/projects/PawPackPantry_Menu_Page.webp','/projects/PawPackPantry_StreetSmart.webp','/projects/PawPackPantry_Testimonies.webp',
 '/projects/RecyclJunction_Home_Page.webp','/projects/RecyclJunction_Home_Page_fourth.webp','/projects/RecyclJunction_Home_Page_second.webp','/projects/RecyclJunction_Home_Page_third.webp',
 '/projects/THE_WALL_Intro.webp','/projects/the_WALL_MAIN.webp',
 '/projects/python_blackjack_project.webp','/projects/python_learning_platform.webp','/projects/python_learning_platform_2.webp','/projects/python_learning_platform_3.webp',
 '/projects/bruse_firmware.webp','/projects/computer_in_progress.webp','/projects/computer_in_progress_2.webp',
 '/projects/gravity_github_project.webp','/projects/gravity_hardware_ui_mockup.webp','/projects/gravity_in_progress.webp','/projects/gravity_mockup.webp',
 '/projects/personal_microsite.webp','/projects/personal_microsite_2.webp','/projects/personal_microsite_3.webp',
 '/projects/deskling_os.webp','/projects/deskling_os_2.webp','/projects/deskling_os_3.webp','/projects/readme_github.webp',
 '/projects/nkanda_app_1.webp','/projects/nkanda_app_2.webp','/projects/nkanda_app_3.webp','/projects/nkanda_app_4.webp','/projects/nkanda_app_5.webp','/projects/nkanda_app_6.webp','/projects/nkanda_app_7.webp'
];

const rotateWords=['SYSTEM.','APP.','SOLUTION.','PROJECT.','PLATFORM.','PRODUCT.'];
const teaserWords=['BUILT?','FIXED?','PLANNED?','AUTOMATED?','LAUNCHED?','DESIGNED?','SOLVED?'];

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
 const readyRef=useRef([]);
 useEffect(()=>{
  let cancelled=false;
  const shuffled=[...projectImages].sort(()=>Math.random()-0.5);
  shuffled.forEach(src=>{
   const img=new window.Image();
   img.onload=()=>{if(!cancelled)readyRef.current=[...readyRef.current,src]};
   img.src=src;
  });
  return()=>{cancelled=true};
 },[]);
 useEffect(()=>{
  const el=zoneRef.current;
  if(!el)return;
  const hero=el.closest('.hero');
  if(!hero)return;
  if(typeof window!=='undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches)return;
  const onMove=(e)=>{
   const now=performance.now();
   if(now-lastSpawn.current<100)return;
   const ready=readyRef.current;
   if(ready.length===0)return;
   lastSpawn.current=now;
   const rect=el.getBoundingClientRect();
   let img=ready[Math.floor(Math.random()*ready.length)];
   if(ready.length>1){while(img===lastImg.current){img=ready[Math.floor(Math.random()*ready.length)]}}
   lastImg.current=img;
   const id=++idRef.current;
   const rot=(Math.random()*12-6).toFixed(1);
   const item={id,x:e.clientX-rect.left,y:e.clientY-rect.top,img,rot};
   setItems(prev=>[...prev.slice(-13),item]);
   setTimeout(()=>{setItems(prev=>prev.filter(it=>it.id!==id))},950);
  };
  hero.addEventListener('mousemove',onMove);
  return()=>hero.removeEventListener('mousemove',onMove);
 },[]);
 return <div ref={zoneRef} className="mouse-trail-zone">
  {items.map(it=><div key={it.id} className="trail-image" style={{left:it.x,top:it.y,'--rot':it.rot+'deg'}}><img src={it.img} alt="" draggable={false}/></div>)}
 </div>
}

function RotatingWord({words=rotateWords}){
 const[i,setI]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setI(v=>(v+1)%words.length),2000);return()=>clearInterval(t)},[words]);
 return <em className="rotating-word" key={i}>{words[i]}</em>
}

function SystemGrid({items,className=''}){return <div className={'system-grid '+className}>{items.map(([title,copy,icon],i)=><article key={title}>{icon&&<img className="card-icon" src={icon} alt="" />}<span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>}

const CLI_COMMANDS=[
 {id:'help',label:'help',output:<>Available commands — click any below or scroll for more: <b>whoami</b>, <b>ls ~/projects</b>, <b>cat gravity.txt</b>, <b>cat nkanda.txt</b>, <b>cat alcove.txt</b>, <b>cat kit-bin.txt</b>, <b>cat infra.txt</b>, <b>cat learning.txt</b>, <b>open github</b>, <b>clear</b>.</>},
 {id:'whoami',label:'whoami',output:<>Michael Jones — self-taught developer building AI-integrated products end-to-end, from AI hardware devices to mobile apps and client websites. Currently BSc Artificial Intelligence @ Oxford Brookes University, based Oxford / UK.</>},
 {id:'ls',label:'ls ~/projects',output:<div className="cli-list">{[
   {n:'gravity',href:'https://github.com/CodeCreatorManMike/GRAVITY-OS'},
   {n:'nkanda',href:'https://github.com/CodeCreatorManMike/Nkanda'},
   {n:'alcove',href:'https://github.com/CodeCreatorManMike/Alcove'},
   {n:'kit-bin',href:'https://kit-bin.com/'},
   {n:'honk-studios',href:null},
   {n:'recycl-junction-trading',href:null},
   {n:'pawpackpantry',href:null},
   {n:'michael-jones-os',href:null},
   {n:'global-mobility-platform',href:null}
 ].map(p=>p.href?<a key={p.n} href={p.href} target="_blank" rel="noopener noreferrer">{p.n}/ ↗</a>:<span key={p.n}>{p.n}/</span>)}</div>},
 {id:'gravity',label:'cat gravity.txt',output:<>{flagship[0].copy} <a href={flagship[0].links[0].href} target="_blank" rel="noopener noreferrer">repo ↗</a></>},
 {id:'nkanda',label:'cat nkanda.txt',output:<>{flagship[1].copy} <a href={flagship[1].links[0].href} target="_blank" rel="noopener noreferrer">repo ↗</a></>},
 {id:'alcove',label:'cat alcove.txt',output:<>{flagship[2].copy} <a href={flagship[2].links[0].href} target="_blank" rel="noopener noreferrer">repo ↗</a></>},
 {id:'kitbin',label:'cat kit-bin.txt',output:<>{flagship[3].copy} <a href="https://kit-bin.com/" target="_blank" rel="noopener noreferrer">visit ↗</a> <a href="https://github.com/CodeCreatorManMike/Kit-Bin" target="_blank" rel="noopener noreferrer">repo ↗</a></>},
 {id:'infra',label:'cat infra.txt',output:<>Self-hosted GitLab CE on a home NUC using Docker Compose, with an Ollama-powered (Phi-3-mini) Python code-review service. Extended AI inference through a remote server over Tailscale/SSH running a custom agent and Telegram gateway. CI/CD flows from GitLab straight to Cloudflare Pages.</>},
 {id:'learning',label:'cat learning.txt',output:<>3-month self-directed run through Python Crash Course produced a full Blackjack remake with JSON persistence, a bank simulation app, API/CSV/webhook tools and a Gumtree value-ranking scraper. Currently on the Python roadmap on roadmap.sh, plus linear algebra and calculus ahead of a BSc in Artificial Intelligence.</>},
 {id:'github',label:'open github',output:<>Opening <a href="https://github.com/CodeCreatorManMike" target="_blank" rel="noopener noreferrer">github.com/CodeCreatorManMike ↗</a></>},
 {id:'clear',label:'clear',clear:true}
];

function Terminal(){
 const[log,setLog]=useState([{id:'boot',cmd:null,output:<>Welcome to MJ/OS — a guided walk through the projects, repos and infrastructure above. Click a command below, or start with <b>help</b>.</>}]);
 const scRef=useRef(null);
 useEffect(()=>{if(scRef.current)scRef.current.scrollTop=scRef.current.scrollHeight},[log]);
 const run=(c)=>{
  if(c.clear){setLog([]);return}
  setLog(prev=>[...prev,{id:c.id+'-'+prev.length,cmd:c.label,output:c.output}]);
 };
 return <div className="terminal cli">
  <div className="terminal-top"><i/><i/><i/><span>michael@systems:~</span></div>
  <div className="cli-log" ref={scRef}>
   {log.map(l=><div key={l.id} className="cli-entry">{l.cmd&&<p className="cli-cmd"><b>$</b> {l.cmd}</p>}<div className="cli-output">{l.output}</div></div>)}
   <span className="caret">█</span>
  </div>
  <div className="cli-commands">{CLI_COMMANDS.map(c=><button key={c.id} onClick={()=>run(c)}>{c.label}</button>)}</div>
 </div>
}

export default function Page(){
 const[time,setTime]=useState('');useEffect(()=>{const t=setInterval(()=>setTime(new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'})),1000);return()=>clearInterval(t)},[]);
 useEffect(()=>{
  const els=document.querySelectorAll('.reveal-group');
  if(!els.length)return;
  const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}})},{threshold:0.12,rootMargin:'0px 0px -10% 0px'});
  els.forEach(el=>io.observe(el));
  return()=>io.disconnect();
 },[]);
 return <main><Boot/><div className="grain"/>
  <nav className="floating-nav" aria-label="Primary navigation"><div><a href="#projects">PROJECTS</a><a href="#skills">SKILLS</a><a href="/solutions">SOLUTIONS</a><a href="#education">EDUCATION</a><a href="#contact">CONTACT</a></div></nav>
  <section id="top" className="hero"><VideoSwitcher/><div className="scanlines"/><ProjectMouseTrail/><div className="hero-copy"><p className="eyebrow">[ CREATIVE DEVELOPER · AI ENGINEER · TECHNICAL ANALYST ]</p><h1>MICHAEL<br/><em>JONES</em></h1><p className="intro">Self-taught developer building AI-integrated products end-to-end—from physical devices and mobile apps to enterprise automation and production websites.</p><div className="hero-actions"><a href="#projects">VIEW SYSTEMS ↓</a><a href="#explore">EXPLORE CLI ↓</a></div></div><aside className="system"><p>EXPERIENCE <b>3+ YEARS</b></p><p>LOCATION <b>OXFORD / UK</b></p><p>STUDY <b>BSc ARTIFICIAL INTELLIGENCE</b></p><p>LOCAL TIME <b>{time}</b></p></aside><div className="hero-foot"><span>ASCII FEED / AUTO SWITCH 08 SEC</span><span>BUILD 03 · 2026</span></div></section>
  <section className="ticker"><div>AI ENGINEERING +++ FULL-STACK DEVELOPMENT +++ MOBILE PRODUCTS +++ DEX AUTOMATION +++ HARDWARE PROTOTYPING +++ GTM SYSTEMS +++ CI/CD +++ </div></section>
  <section className="solutions-teaser reveal-group"><div className="solutions-teaser-inner"><p className="eyebrow">[ FOR CLIENTS ]</p><h2>NEED SOMETHING<br/><RotatingWord words={teaserWords}/></h2><p>Free discovery calls, 6-week website builds, AI opportunity audits and product development — see the offerings and book straight in.</p><a href="/solutions" className="solutions-cta">VIEW SOLUTIONS ↗</a></div></section>
  <section id="experience" className="section reveal-group top-glow"><div className="section-head"><span>01 / PROFESSIONAL EXPERIENCE</span><span>3+ YEARS / 4 ORGANISATIONS</span></div><div className="experience-grid">{experience.map((x,i)=><article key={x.company}>{x.icon&&<img className="card-icon" src={x.icon} alt="" />}<span className="num">0{i+1}</span><h2>{x.company}</h2><h3>{x.role}</h3><p>{x.summary}</p><div className="tags">{x.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></section>
  <section className="ascii-donut-section"><AsciiDonut/></section>
  <section className="section reveal-group"><div className="section-head"><span>02 / CLIENT + PLATFORM BUILDS</span><span>LIVE DIGITAL PRODUCTS</span></div><SystemGrid items={clients}/></section>
  <section className="ascii-fx-section"><AsciiDiscoBall/></section>
  <section id="projects" className="section reveal-group"><div className="section-head"><span>03 / FLAGSHIP PROJECTS</span><span>DESIGNED + BUILT</span></div><div className="project-grid">{flagship.map((p,i)=><article key={p.title}>{p.icon&&<img className="card-icon" src={p.icon} alt="" />}<span className="project-no">P/{String(i+1).padStart(2,'0')}</span><p>{p.kind}</p><h2>{p.title}</h2><p className="copy">{p.copy}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>{p.links&&p.links.length>0&&<div className="project-links">{p.links.map(l=><a key={l.href} className={'project-link '+l.type} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}</div>}<div className="ascii-mark">{['▓▒░','╱╲','◢◤','[<>]','((( )))','+ XP'][i]}</div></article>)}</div></section>
  <section className="section systems reveal-group"><div className="section-head"><span>04 / TECHNICAL ANALYSIS + DEX</span><span>NEXTHINK · POWERSHELL · PYTHON · AZURE</span></div><p className="lead">Enterprise-scale automation, diagnostics, ITSM integrations, AI adoption and more than 100 internal and customer-facing knowledge articles.</p><SystemGrid items={enterprise} className="tech-icons"/></section>
  <section className="ascii-fx-section"><AsciiInvader/></section>
  <section className="section systems reveal-group"><div className="section-head"><span>05 / GTM ENGINEERING</span><span>AI-FIRST OUTBOUND SYSTEMS</span></div><p className="lead">Built and scaled demand-generation infrastructure using Clay, Lemlist, n8n and Python, supporting 16+ qualified enterprise meetings per month.</p><SystemGrid items={gtm} className="gtm-icons"/></section>
  <section id="skills" className="section reveal-group"><div className="section-head"><span>06 / TECHNICAL STACK</span><span>CAPABILITIES.LOG</span></div><div className="skills"><div><h3>BUILD</h3><div className="tag-wrap">{['Python','FastAPI','PostgreSQL / pgvector','Swift / SwiftUI','JavaScript / React','HTML / CSS','WASM','APIs / Webhooks','Web Scraping'].map(x=><span key={x}>{x}</span>)}</div></div><div><h3>AI + AUTOMATION</h3><div className="tag-wrap">{['RAG Systems','Claude / GPT / Groq','Ollama','AI Agent Orchestration','n8n','Clay','Lemlist','Voice AI','sentence-transformers'].map(x=><span key={x}>{x}</span>)}</div></div><div><h3>INFRA + ENTERPRISE</h3><div className="tag-wrap">{['GitLab CI/CD','Docker','Cloudflare Pages','VPS / Homelab','Tailscale / VPN','Nexthink DEX','PowerShell','Azure / Intune','ITSM'].map(x=><span key={x}>{x}</span>)}</div></div><div><h3>PRODUCT + HARDWARE</h3><div className="tag-wrap">{['Product Design','Figma / Wireframing','Brand Systems','ESP32-S3','Sensors / Embedded','PCB Planning','SEO Pipelines','Technical Writing'].map(x=><span key={x}>{x}</span>)}</div></div></div></section>
  <section className="ascii-fx-section"><AsciiCRT/></section>
  <section id="explore" className="section infra reveal-group"><div className="section-head"><span>07 / EXPLORE THE SYSTEM</span><span>GUIDED CLI</span></div><Terminal/></section>
  <section className="ascii-fx-section"><AsciiCursor/></section>
  <section id="education" className="section reveal-group"><div className="section-head"><span>08 / EDUCATION + ACHIEVEMENTS</span><span>CREDENTIALS</span></div><div className="education"><article><p>UNIVERSITY</p><h2>BSc ARTIFICIAL INTELLIGENCE</h2><h3>Oxford Brookes University</h3></article><article><p>SECONDARY EDUCATION</p><h2>80% / A AVERAGE</h2><h3>Crawford International — North Coast</h3><ul><li>6 distinctions and 2 Bs</li><li>Top 1% nationally in History, Business, Art and Geography</li><li>Full Academic Colours</li><li>Full Community Service Colours</li><li>Humanitarian Award</li></ul></article></div><div className="credential-grid"><div><h3>CERTIFICATIONS</h3>{certs.map(x=><p key={x}>✓ {x}</p>)}</div><div><h3>MICROSOFT LEARN · INTUNE</h3>{microsoft.map(x=><p key={x}>+ {x}</p>)}</div></div></section>
  <section id="contact" className="contact section reveal-group"><p>[ 09 / OPEN CHANNEL ]</p><h2>BUILDING THE<br/>NEXT <RotatingWord/></h2><div><a href="mailto:michaeljonesincorporated@gmail.com" target="_blank" rel="noopener noreferrer">EMAIL ↗</a><a href="https://www.linkedin.com/in/michael-jones-50a37b261/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="https://github.com/CodeCreatorManMike" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.instagram.com/michael._.jones06/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a><a href="https://www.tiktok.com/@michael._.jones" target="_blank" rel="noopener noreferrer">TIKTOK ↗</a><a href="https://www.youtube.com/@Michael._.jones06" target="_blank" rel="noopener noreferrer">YOUTUBE ↗</a><a href="#top">BACK TO TOP ↑</a></div></section><SiteFooter/>
 </main>
}
