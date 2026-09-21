import { useRef, useState } from 'react';
import { animate } from '../motion';
const labels = { school:'School', tech:'Tech stack', background:'Background', goals:'Career goals', activities:'Extracurriculars', jobs:'Work experience' };
export default function About() {
 const [selected, setSelected] = useState('background');
 const pageRef = useRef(null);
 function selectNote(key) {
   setSelected(key);
   animate(pageRef.current, [{transform:'translateY(9px)',opacity:.7},{transform:'translateY(0)',opacity:1}],250);
 }
 return (<section className="desktop" id="az-desktop"><div className="menu-bar"><span>AZ &nbsp; / &nbsp; desktop</span><span>Notes</span></div><div className="desktop-header"><div><div className="label">02 / About me</div><h2>About me.</h2></div></div>
<div className="desktop-window notes-app" data-pop><div className="window-title"><span className="dots" aria-hidden="true"><b></b><b></b><b></b></span><span>Notes — About me</span><span className="notes-count">6 notes</span></div><div className="notes-layout"><div className="notes-sidebar" aria-label="About me notes"><div className="notes-folder"><span aria-hidden="true">▱</span> About me</div>
<button type="button" data-desk="background" aria-pressed={selected === "background"} onClick={() => selectNote("background")}><strong>Background</strong><small>A little about me</small></button>
<button type="button" data-desk="school" aria-pressed={selected === "school"} onClick={() => selectNote("school")}><strong>School</strong><small>RPI · Computer science</small></button>
<button type="button" data-desk="tech" aria-pressed={selected === "tech"} onClick={() => selectNote("tech")}><strong>Tech stack</strong><small>Languages, tools &amp; frameworks</small></button>
<button type="button" data-desk="goals" aria-pressed={selected === "goals"} onClick={() => selectNote("goals")}><strong>Career goals</strong><small>What I’m looking for</small></button>
<button type="button" data-desk="activities" aria-pressed={selected === "activities"} onClick={() => selectNote("activities")}><strong>Extracurriculars</strong><small>BSA · NSBE</small></button>
<button type="button" data-desk="jobs" aria-pressed={selected === "jobs"} onClick={() => selectNote("jobs")}><strong>Work experience</strong><small>Avahi · Tutoring · Teaching</small></button></div>
<div className="window-content note-page" ref={pageRef} aria-live="polite"><div className="note-location">About me / <span data-window-name>{labels[selected]}</span></div>
<div data-desk-panel="school" hidden={selected !== "school"}><h3>School</h3><p><strong>Rensselaer Polytechnic Institute</strong></p><ul><li><strong>Degree:</strong> B.S. in Computer Science</li><li><strong>Minor:</strong> Graphic Design</li><li><strong>Graduation:</strong> May 2027</li></ul></div>
<div data-desk-panel="tech" hidden={selected !== "tech"}><h3>Tech stack</h3><dl className="tech-list"><div><dt>Languages</dt><dd>Python · JavaScript · Java · C++</dd></div><div><dt>Frontend</dt><dd>React · React Native · Tailwind CSS</dd></div><div><dt>Backend &amp; data</dt><dd>Node.js · FastAPI · DynamoDB · REST APIs · Pydantic</dd></div><div><dt>AI tools</dt><dd>Claude Code · LangGraph · LangChain · AWS Bedrock</dd></div><div><dt>Cloud &amp; DevOps</dt><dd>AWS Lambda, S3, CloudWatch · Terraform · Docker · Git · GitHub Actions · CI/CD · Bash</dd></div></dl></div>
<div data-desk-panel="background" hidden={selected !== "background"}>
  <h3>Background</h3>
  <p>I’m a frontend-focused full-stack developer who enjoys building polished, reliable web applications from end to end. I’m especially interested in creating responsive interfaces and user-centered experiences, while also working with APIs, backend services, databases, and the infrastructure that supports them.</p>
  <p>My background in computer science and graphic design influences how I approach software—I care about both the technical architecture behind a product and the experience of the person using it. I enjoy understanding how systems work beyond the UI, from application logic and testing to deployment, cloud infrastructure, and production workflows.</p>
  <p>I’m currently focused on frontend and full-stack engineering, with a growing interest in cloud infrastructure, platform engineering, DevOps, and site reliability as I continue developing my systems experience.</p>
</div>
<div data-desk-panel="goals" hidden={selected !== "goals"}><h3>Career goals</h3><p>I’m looking for a <strong>full-time role</strong> as a:</p><ul><li><strong>Frontend Developer</strong></li><li><strong>Full-Stack Developer</strong></li><li><strong>Junior Site Reliability Engineer (SRE)</strong></li></ul></div>
<div data-desk-panel="activities" hidden={selected !== "activities"}><h3>Extracurriculars</h3>
<article className="note-entry"><h4>Black Student Association</h4><p className="note-role">President · RPI</p><p className="note-date">July 2025–present</p><ul><li>Lead chapter operations and communications.</li><li>Previously Public Relations Chair.</li></ul></article>
<article className="note-entry"><h4>NSBE</h4><p className="note-role">Hackathon Director · NSH @ RPI 2027</p><p className="note-date">April 2026–present</p><ul><li>Manage planning, sponsor outreach, and logistics.</li><li>100+ participants planned; $9,000 in confirmed funding.</li></ul></article>
</div>
<div data-desk-panel="jobs" hidden={selected !== "jobs"}><h3>Work experience</h3>
<article className="note-entry"><h4>Avahi</h4><p className="note-role">Software Development Intern</p><p className="note-date">May 2026–present · Remote</p><ul><li>Build <strong>AI agents and AWS workflows.</strong></li><li>Develop frontend interfaces and backend integrations.</li><li>Debug Lambda failures with CloudWatch.</li></ul></article>
<article className="note-entry"><h4>America Reads and Counts</h4><p className="note-role">Tutor · Work Study</p><p className="note-date">September 2023–December 2025 · Troy, NY</p><ul><li>Provided individualized <strong>K–12 academic support.</strong></li></ul></article>
<article className="note-entry"><h4>Rensselaer Pipelines Initiatives</h4><p className="note-role">Teaching Assistant</p><p className="note-date">May–August 2025 · Troy, NY</p><ul><li>Taught <strong>Java fundamentals.</strong></li><li>Helped students debug engineering projects.</li></ul></article>
</div>
</div></div></div></section>
);
}
