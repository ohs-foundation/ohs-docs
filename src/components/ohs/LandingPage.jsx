import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import SearchBar from "@theme/SearchBar";
import Brand from "./Brand";

function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        window.setTimeout(() => menuButton.current?.focus(), 0);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  return (
    <header className="ohs-site-header">
      <div className="ohs-nav-shell">
        <Brand />
        <nav
          id="primary-navigation"
          className={menuOpen ? "ohs-main-nav is-open" : "ohs-main-nav"}
          aria-label="Primary navigation"
        >
          <Link to="/" aria-current="page">OHS Docs Home</Link>
          <Link to="/why-ohs/">Why OHS</Link>
          <Link to="/fhir-foundations/">FHIR Foundations</Link>
          <Link to="/concepts/what-ohs-player-is/">OHS Player</Link>
          <span className="ohs-nav-disabled">
            AI Commons<span className="ohs-nav-badge">Soon</span>
          </span>
          <Link to="/resources/">Resources</Link>
        </nav>
        <div className="ohs-nav-actions">
          <div className="ohs-header-search">
            <SearchBar />
          </div>
          <button
            ref={menuButton}
            className="ohs-menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function PathwaysSection() {
  return (
    <section className="ohs-pathways-section" aria-label="Audience Pathways">
      <div className="ohs-pathways-header">
        <span className="ohs-eyebrow">CHOOSE YOUR PATHWAY</span>
        <h2>Tailored entry points across the stack</h2>
        <p>Explore strategic briefings, architectural blueprints, or hands-on developer SDKs.</p>
      </div>
      <div className="ohs-pathways-grid">
        <Link to="/why-ohs/" className="ohs-pathway-card">
          <div className="ohs-pathway-meta">
            <span className="ohs-pathway-icon">🏛️</span>
            <span className="ohs-pathway-audience">Ministries & Funders</span>
          </div>
          <h3>Strategic Briefing</h3>
          <p>Learn how OHS reduces total cost of ownership, prevents vendor lock-in, and scales sovereign digital health.</p>
          <span className="ohs-pathway-cta">Read briefing <span>→</span></span>
        </Link>
        <Link to="/overview/solutions-and-pathways/" className="ohs-pathway-card">
          <div className="ohs-pathway-meta">
            <span className="ohs-pathway-icon">🚀</span>
            <span className="ohs-pathway-audience">Health Tech Builders</span>
          </div>
          <h3>Solutions & Pathways</h3>
          <p>Accelerate time-to-market with pre-built multiplatform SDKs, client toolkits, and unbundled sub-assemblies.</p>
          <span className="ohs-pathway-cta">Explore pathways <span>→</span></span>
        </Link>
        <Link to="/concepts/architecture/" className="ohs-pathway-card">
          <div className="ohs-pathway-meta">
            <span className="ohs-pathway-icon">📐</span>
            <span className="ohs-pathway-audience">Solution Architects</span>
          </div>
          <h3>Architecture & Security</h3>
          <p>Explore end-to-end reference topology, gateway access control, and offline-first database synchronization.</p>
          <span className="ohs-pathway-cta">View architecture <span>→</span></span>
        </Link>
        <Link to="/get-started/" className="ohs-pathway-card">
          <div className="ohs-pathway-meta">
            <span className="ohs-pathway-icon">💻</span>
            <span className="ohs-pathway-audience">Software Engineers</span>
          </div>
          <h3>Developer Quickstart</h3>
          <p>Jump directly into Kotlin Multiplatform SDKs, Gradle setup, Back-End services, and runnable sample code.</p>
          <span className="ohs-pathway-cta">Start building <span>→</span></span>
        </Link>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="ohs-pillars-section" aria-label="Open Health Stack Pillars">
      <div className="ohs-pillars-grid">
        {/* Pillar 01: FHIR Foundations */}
        <div className="ohs-pillar-card">
          <div className="ohs-pillar-header">
            <span className="ohs-pillar-tag">PILLAR 01</span>
          </div>
          <h3>
            <Link to="/fhir-foundations/">FHIR Foundations</Link>
          </h3>
          <p>
            Core FHIR libraries, client SDKs, and backend services for building
            offline-capable, spec-compliant digital health applications.
          </p>
          <Link className="ohs-pillar-cta" to="/fhir-foundations/">
            Explore FHIR Foundations <span>→</span>
          </Link>
          <div className="ohs-pillar-links">
            <span>CORE FHIR LIBRARIES</span>
            <Link to="/fhir-foundations/kotlin-fhir/">
              Kotlin FHIR (Data Model) <span>→</span>
            </Link>
            <Link to="/fhir-foundations/kotlin-fhirpath/">
              Kotlin FHIRPath <span>→</span>
            </Link>
            <span>CLIENT SDKS</span>
            <Link to="/fhir-foundations/#kotlin-multiplatform-sdks">
              Kotlin Multiplatform FHIR SDK <span>→</span>
            </Link>
            <Link to="/fhir-foundations/#android-fhir-sdk">
              Android FHIR SDK <span>→</span>
            </Link>
            <span>BACK-END SDKS</span>
            <a
              href="https://github.com/ohs-foundation/fhir-gateway"
              target="_blank"
              rel="noopener noreferrer"
            >
              Info Gateway <span>↗</span>
            </a>
            <a
              href="https://github.com/ohs-foundation/fhir-data-pipes"
              target="_blank"
              rel="noopener noreferrer"
            >
              FHIR Data Pipes <span>↗</span>
            </a>
          </div>
        </div>

        {/* Pillar 02: OHS Player */}
        <div className="ohs-pillar-card">
          <div className="ohs-pillar-header">
            <span className="ohs-pillar-tag">PILLAR 02</span>
            <span className="ohs-release-badge ohs-release-alpha">Alpha Release</span>
          </div>
          <h3>
            <Link to="/concepts/what-ohs-player-is/">OHS Player</Link>
          </h3>
          <p>
            A cross-stack reference toolkit showing how Open Health Stack
            building blocks assemble into a working offline-first frontline
            and administrative digital health platform.
          </p>
          <Link className="ohs-pillar-cta" to="/concepts/what-ohs-player-is/">
            Understand OHS Player <span>→</span>
          </Link>
          <div className="ohs-pillar-links">
            <span>REFERENCE TOOLKIT</span>
            <Link to="/get-started/">
              Run the reference environment <span>→</span>
            </Link>
            <Link to="/concepts/architecture/">
              The architecture <span>→</span>
            </Link>
            <Link to="/components/">
              The components <span>→</span>
            </Link>
            <Link to="/configure/screen-from-fhir-data/">
              Configure screens from FHIR <span>→</span>
            </Link>
            <Link to="/extend/decide/">
              Extend components <span>→</span>
            </Link>
          </div>
        </div>

        {/* Pillar 03: AI Commons */}
        <div className="ohs-pillar-card is-disabled">
          <div className="ohs-pillar-header">
            <span className="ohs-pillar-tag">PILLAR 03</span>
            <span className="ohs-coming-soon-badge">Evals & Tooling</span>
          </div>
          <h3>AI Commons</h3>
          <p>
            Tooling to interact with, query, and extract structured FHIR data models,
            combined with standardized benchmarking and clinical evaluation frameworks
            for builders and implementers.
          </p>
          <div className="ohs-pillar-links">
            <span>FOCUS AREAS</span>
            <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ohs-ink-soft)" }}>
              FHIR data model prompt engineering, clinical safety benchmarks, and validation tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const TOPICS = [
  { id: "all", label: "All Capabilities" },
  { id: "client", label: "Client Apps" },
  { id: "backend", label: "Backend & Gateway" },
  { id: "analytics", label: "Analytics" },
  { id: "security", label: "Security & Access" },
  { id: "config", label: "Configuration" },
  { id: "infra", label: "Infrastructure" },
];

const CAPABILITIES = [
  {
    category: "client",
    tag: "CLIENT CORE",
    badge: "Kotlin Multiplatform",
    title: "Kotlin FHIR Data Model",
    description: "Type-safe FHIR data classes, JSON serialization, and spec-compliant resource models across Android, iOS, desktop, and web.",
    link: "/fhir-foundations/kotlin-fhir/",
    cta: "Explore Kotlin FHIR",
  },
  {
    category: "client",
    tag: "CLIENT SDK",
    badge: "Offline SQLite",
    title: "On-Device Storage & Sync",
    description: "Kotlin FHIR Engine provides local encrypted persistence, indexed search parameters, and bidirectional server sync.",
    link: "/fhir-foundations/kotlin-fhir-engine/",
    cta: "Explore FHIR Engine",
  },
  {
    category: "client",
    tag: "CLIENT SDK",
    badge: "Compose Multiplatform",
    title: "Questionnaires & Data Capture",
    description: "Render complex structured healthcare questionnaires, SDC calculated expressions, validation, and resource extraction.",
    link: "/fhir-foundations/kotlin-fhir-data-capture/",
    cta: "Explore Data Capture",
  },
  {
    category: "client",
    tag: "REFERENCE APP",
    badge: "Android / iOS / Web",
    title: "Player Reference Client",
    description: "Frontline health worker reference application demonstrating offline workflows, patient records, and task lists.",
    link: "/components/client-app/",
    cta: "View Client App",
  },
  {
    category: "security",
    tag: "SECURITY & ACCESS",
    badge: "Keycloak / RBAC",
    title: "Gateway Security & Auth",
    description: "Implement fine-grained role-based access checkers, user context extraction, and secure token validation on the gateway.",
    link: "/extend/backend-extensions/",
    cta: "View Access Checkers",
  },
  {
    category: "backend",
    tag: "GATEWAY HOST",
    badge: "High Performance",
    title: "FHIR Gateway & Endpoints",
    description: "Deploy custom gateway endpoints, reverse-proxy routing, and access rules loaded into a high-performance host.",
    link: "/components/reference-backend/",
    cta: "Explore Reference Backend",
  },
  {
    category: "analytics",
    tag: "ANALYTICS",
    badge: "SQL-on-FHIR",
    title: "SQL-on-FHIR Analytics",
    description: "Transform complex hierarchical FHIR data into relational tabular views using declarative ViewDefinitions and streaming pipelines.",
    link: "/components/reference-analytics/",
    cta: "Explore Analytics",
  },
  {
    category: "config",
    tag: "CONFIGURATION",
    badge: "Zero-Code UI",
    title: "Declarative Screen Layouts",
    description: "Configure clinical summary screens, navigation, and workflows directly from FHIR resources without recompiling code.",
    link: "/configure/screen-from-fhir-data/",
    cta: "Configure Screens",
  },
  {
    category: "infra",
    tag: "INFRASTRUCTURE",
    badge: "Docker Compose",
    title: "Docker Reference Environment",
    description: "Turnkey local deployment scripts for spinning up HAPI FHIR, Keycloak, Gateway, and Analytics with one command.",
    link: "/get-started/",
    cta: "Run Local Environment",
  },
];

function TopicExplorerSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = activeFilter === "all"
    ? CAPABILITIES
    : CAPABILITIES.filter((c) => c.category === activeFilter);

  return (
    <section className="ohs-topic-explorer" id="capabilities" aria-label="Explore Capabilities by Topic">
      <div className="ohs-topic-explorer-header">
        <span className="ohs-eyebrow">EXPLORE BY CAPABILITY</span>
        <h2>Find the right building block</h2>
        <p>Filter by focus area to find relevant libraries, developer guides, and reference implementations.</p>
        <div className="ohs-filter-bar" role="tablist" aria-label="Capability filters">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === topic.id}
              className={`ohs-filter-btn ${activeFilter === topic.id ? "is-active" : ""}`}
              onClick={() => setActiveFilter(topic.id)}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ohs-capabilities-grid">
        {filtered.map((item) => (
          <div key={item.title} className="ohs-capability-card">
            <div className="ohs-capability-meta">
              <span className="ohs-capability-tag">{item.tag}</span>
              <span className="ohs-capability-badge">{item.badge}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link className="ohs-capability-cta" to={item.link}>
              {item.cta} <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ohs-footer">
      <div className="ohs-footer-inner">
        <div>
          <Brand />
          <p>Documentation for Open Health Stack components, libraries, and reference toolkits.</p>
        </div>
        <div className="ohs-footer-links">
          <Link to="/fhir-foundations/">FHIR Foundations</Link>
          <Link to="/concepts/what-ohs-player-is/">OHS Player</Link>
          <Link to="/get-started/">Get started with Player</Link>
          <Link to="/resources/">Resources and contributing</Link>
          <a href="https://github.com/ohs-foundation">OHS Foundation on GitHub</a>
          <a href="https://ohs.foundation/projects">OHS projects catalogue</a>
        </div>
      </div>
    </footer>
  );
}

/** Shared shell. Editorial content is supplied by docs/landing.md. */
export default function LandingPage({ children }) {
  const { metadata, frontMatter } = useDoc();
  useEffect(() => {
    document.documentElement.setAttribute("data-docs-ready", "true");
  }, []);
  const primary = frontMatter.primary_action;
  const secondary = frontMatter.secondary_action;
  return (
    <div className="ohs-landing" id="top">
      <LandingHeader />
      <main>
        <section className="ohs-landing-hero">
          <div>
            <div className="ohs-hero-eyebrow-row">
              {frontMatter.eyebrow && <span className="ohs-eyebrow">{frontMatter.eyebrow}</span>}
              <span className="ohs-beta-badge">Beta</span>
            </div>
            <h1>{metadata.title}</h1>
            <p>{metadata.description}</p>
            <div className="ohs-hero-actions">
              {primary && (
                primary.to ? (
                  <Link className="ohs-button" to={primary.to}>{primary.label}</Link>
                ) : (
                  <a className="ohs-button" href={primary.href}>{primary.label}</a>
                )
              )}
              {secondary && (
                secondary.to ? (
                  <Link className="ohs-button ohs-button-secondary" to={secondary.to}>{secondary.label}</Link>
                ) : (
                  <a className="ohs-button ohs-button-secondary" href={secondary.href}>{secondary.label} ↗</a>
                )
              )}
              <a className="ohs-button ohs-button-secondary" href="#capabilities">
                Explore Capabilities ↓
              </a>
            </div>
            <div className="ohs-hero-tags">
              <span className="ohs-hero-tag">Building blocks for global digital health</span>
              <span className="ohs-hero-tag">Apache 2.0 Licensed</span>
              <Link className="ohs-hero-tag ohs-hero-tag-link" to="/resources/">
                Contribute <span>→</span>
              </Link>
            </div>
          </div>
        </section>
        <PathwaysSection />
        <PillarsSection />
        <article className="ohs-landing-content">{children}</article>
        <TopicExplorerSection />
      </main>
      <Footer />
    </div>
  );
}
