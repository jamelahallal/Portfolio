import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, ExternalLink, FileText,Globe2,Mail, Menu, Network, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";
import { projects, type Project } from "@/data/projects";

const navItems = [
  ["01", "Approach", "#approach"],
  ["02", "Selected work", "#work"],
  ["03", "Working range", "#range"],
  ["04", "Contact", "#contact"],
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function SectionTitle({ index, kicker, title, copy }: { index: string; kicker: string; title: ReactNode; copy?: string }) {
  return (
    <div className="section-title">
      <div className="eyebrow" style={{ color: "hsl(var(--accent))" }}>{index} / {kicker}</div>
      <h2 className="display">{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function ProjectCard({ project, expanded, onToggle }: { project: Project; expanded: boolean; onToggle: () => void }) {
  return (
    <article className={`project-card project-${project.accent} ${expanded ? "expanded" : ""}`} data-testid={`card-project-${project.id}`}>
      <div className="project-topline">
        <span className="mono project-number">{project.year}</span>
        <span className="project-label">{project.label}</span>
      </div>
      <div className="project-mark" aria-hidden="true">{project.title.slice(0, 2)}</div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      <div className="tag-row">
        {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>
      {expanded && (
        <div className="project-detail reveal is-visible">
          <p>{project.detail}</p>
          <div className="outcome"><span className="mono">WHY IT MATTERS</span><strong>{project.outcome}</strong></div>
        </div>
      )}
      <div className="project-actions">
        <button className="text-button" onClick={onToggle} data-testid={`button-expand-project-${project.id}`}>
          {expanded ? "Close detail" : "Open detail"} <ChevronDown size={15} className={expanded ? "rotate" : ""} />
        </button>
        {project.liveUrl && <a className="text-button" href={project.liveUrl} target="_blank" rel="noreferrer" data-testid={`link-live-project-${project.id}`}>Visit build <ExternalLink size={14} /></a>}
      </div>
    </article>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvPickerOpen, setCvPickerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All work");
  const [expandedId, setExpandedId] = useState<string | null>("lebanongen");
  const filters = useMemo(() => ["All work", ...Array.from(new Set(projects.flatMap((project) => project.tags)))], []);
  const filteredProjects = useMemo(() => activeFilter === "All work" ? projects : projects.filter((project) => project.tags.includes(activeFilter)), [activeFilter]);
  const approachRef = useReveal();
  const workRef = useReveal();

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setCvPickerOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="site-shell noise">
      <header className="site-header">
        <div className="section-wrap header-inner">
          <button className="brand" onClick={() => scrollTo("#top")} data-testid="button-brand-home" aria-label="Back to top">
            <span className="brand-dot" /> JH<span className="brand-slash">+</span>SO
          </button>
          <nav className={`desktop-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            {navItems.map(([number, label, href]) => (
              <button key={href} onClick={() => scrollTo(href)} data-testid={`link-nav-${label.toLowerCase().replace(" ", "-")}`}><span className="mono">{number}</span>{label}</button>
            ))}
            <div className="cv-picker">
              <button className="nav-cv" onClick={() => setCvPickerOpen(!cvPickerOpen)} aria-expanded={cvPickerOpen} aria-haspopup="menu" data-testid="button-view-cvs">View CVs <FileText size={14} /></button>
              {cvPickerOpen && (
                <div className="cv-menu" role="menu">
                  <a href="/JamilaHallal-CV.pdf" target="_blank" rel="noreferrer" onClick={() => setCvPickerOpen(false)} role="menuitem" data-testid="link-view-jamila-cv">Jamila Hallal <ArrowUpRight size={14} /></a>
                  <a href="/SaraOmasha-CV.pdf" target="_blank" rel="noreferrer" onClick={() => setCvPickerOpen(false)} role="menuitem" data-testid="link-view-sara-cv">Sara Omasha <ArrowUpRight size={14} /></a>
                </div>
              )}
            </div>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} data-testid="button-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="section-wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow reveal is-visible"><span className="pulse" /> Available for thoughtful technical work</div>
            <h1 className="display reveal is-visible stagger-1">Build the thing<br /><em>people can trust.</em></h1>
            <p className="hero-lede reveal is-visible stagger-2">Jamila Hallal and Sara Imad Omasha are full-stack developers building secure, bilingual-ready platforms for real-world needs.</p>
            <div className="hero-actions reveal is-visible stagger-3">
              <button className="primary-button" onClick={() => scrollTo("#work")} data-testid="button-view-work">Explore selected work <ArrowDownRight size={17} /></button>
            </div>
          </div>
          <div className="hero-aside reveal is-visible stagger-2">
            <div className="hero-orbit">
              <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
              <div className="orbit-core"><span aria-hidden="true">+</span><small>JH + SO<br />LB</small></div>
              <div className="orbit-node node-one"><ShieldCheck size={17} /></div>
              <div className="orbit-node node-two"><Network size={17} /></div>
              <div className="orbit-node node-three"><Sparkles size={17} /></div>
            </div>
            <div className="hero-note"><span className="mono">01—</span><p>From a sensitive brief to a clear, working handover.</p></div>
          </div>
        </div>
        <div className="section-wrap hero-bottom"><span className="mono">Software · infrastructure · applied AI</span><span className="scroll-cue">Scroll to read <ArrowDownRight size={14} /></span></div>
      </section>

      <section className="signal-strip" aria-label="Professional snapshot">
        <div className="section-wrap signal-grid">
          <div><span className="mono">01</span><strong>Secure by default</strong><p>Role-aware workflows and careful data handling.</p></div>
          <div><span className="mono">02</span><strong>Built to be found</strong><p>Searchable directories, databases, and records.</p></div>
          <div><span className="mono">03</span><strong>Ready to be used</strong><p>Documentation, training, and practical support.</p></div>
        </div>
      </section>

      <section id="approach" className="section-block approach-section">
        <div className="section-wrap">
          <div ref={approachRef} className="reveal approach-layout">
            <SectionTitle index="01" kicker="The approach" title={<>Technical depth.<br /><span>Human fluency.</span></>} copy="The strongest systems are not only well engineered. They make the next action obvious for the person using them." />
            <div className="approach-content">
              <p className="large-copy">I work across the seam between a requirement and the person it serves — translating ambiguity into responsive interfaces, dependable data flows, and documentation a team can actually pick up.</p>
              <div className="principles">
                <div><span className="mono">A</span><h3>Listen for the real constraint</h3><p>Start with the people, languages, permissions, and environments that shape the work.</p></div>
                <div><span className="mono">B</span><h3>Make complexity legible</h3><p>Use clear structure, useful defaults, and calm UI patterns to help people move.</p></div>
                <div><span className="mono">C</span><h3>Leave the team stronger</h3><p>Document decisions, support handover, and train the people who own the system next.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-block work-section">
        <div className="section-wrap">
          <div ref={workRef} className="reveal">
            <div className="work-heading"><SectionTitle index="02" kicker="Selected work" title={<>Proof, not<br /><span>promises.</span></>} copy="Two platforms that show how we move from a sensitive brief to a useful, maintainable product." /><div className="cv-links"><a href="/JamilaHallal-CV.pdf" className="download-link" target="_blank" rel="noreferrer" data-testid="link-download-jamila-cv">Jamila’s CV <ArrowUpRight size={16} /></a><a href="/SaraOmasha-CV.pdf" className="download-link" target="_blank" rel="noreferrer" data-testid="link-download-sara-cv">Sara’s CV <ArrowUpRight size={16} /></a></div></div>
            <div className="filter-bar" aria-label="Filter projects">
              <Search size={16} />
              {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)} data-testid={`button-filter-${filter.toLowerCase().replaceAll(" ", "-")}`}>{filter}</button>)}
            </div>
            <div className="project-grid">
              {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} expanded={expandedId === project.id} onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)} />)}
            </div>
            {filteredProjects.length === 0 && <div className="empty-state">No projects in this lens yet. Try another filter.</div>}
          </div>
        </div>
      </section>

      <section id="range" className="capability-band">
        <div className="section-wrap capability-grid">
          <div className="eyebrow">03 / Working range</div>
          <div className="capability-list">
            <div><Globe2 size={18} /><span>Web platforms</span><p>JavaScript · React · Node.js/Express · REST APIs · MySQL · PostgreSQL</p></div>
            <div><Network size={18} /><span>Infrastructure</span><p>TCP/IP · VLANs · OSPF · DHCP · ACLs · NAT · Cisco routers & switches</p></div>
            <div><FileText size={18} /><span>Enablement</span><p>Technical documentation · training · structured handover · data stewardship</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-wrap contact-inner">
          <div className="eyebrow">04 / Start a conversation</div>
          <h2 className="display">Have a complex<br /><em>thing to make clear?</em></h2>
          <p>For the LLWB / UK Embassy Women Experts Roster proposal, or a platform that needs a careful technical team, we’d be glad to hear what you’re working through.</p>
          <div className="contact-cards">
            <a className="contact-button" href="mailto:jamela.hallal45@gmail.com" data-testid="link-email-contact-jamila"><Mail size={18} /> Jamila <span>jamela.hallal45@gmail.com</span> <ArrowUpRight size={18} /></a>
            <a className="contact-button contact-button-secondary" href="mailto:omashasara@gmail.com" data-testid="link-email-contact-sara"><Mail size={18} /> Sara <span>omashasara@gmail.com</span> <ArrowUpRight size={18} /></a>
          </div>
          <div className="contact-meta"><span>Beirut & Hasbaya, Lebanon</span><span>Jamila: +961 70 743 060 · Sara: +961 76 571 047</span></div>
        </div>
      </section>

      <footer className="site-footer"><div className="section-wrap"><span className="brand"><span className="brand-dot" /> JH<span className="brand-slash">+</span>SO</span><span className="mono">A capable technical team, from brief to handover.</span><button onClick={() => scrollTo("#top")} data-testid="button-back-to-top">Back to top <ArrowUpRight size={14} /></button></div></footer>
    </main>
  );
}

export default Home;
