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
          <Link to="/" aria-current="page">Home</Link>
          <Link to="/why-ohs/">About</Link>
          <Link to="/learn/">Learn</Link>
          <Link to="/get-started/">Build</Link>
          <Link to="/overview/solutions-and-pathways/">Stories & Solutions</Link>
          <Link to="/resources/">Community</Link>
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
            Unbundled Kotlin Multiplatform core libraries, on-device SQLite storage,
            typed search parameters, and structured questionnaire rendering.
          </p>
          <Link className="ohs-pillar-cta" to="/fhir-foundations/">
            Explore FHIR Foundations <span>→</span>
          </Link>
        </div>

        {/* Pillar 02: OHS Player */}
        <div className="ohs-pillar-card">
          <div className="ohs-pillar-header">
            <span className="ohs-pillar-tag">PILLAR 02</span>
            <span className="ohs-release-badge ohs-release-alpha">Alpha Release</span>
          </div>
          <h3>
            <Link to="/ohs-player/">OHS Player</Link>
          </h3>
          <p>
            A full-stack reference toolkit showing how foundational components assemble
            into an offline-first frontline client, web admin portal, gateway, and analytics.
          </p>
          <Link className="ohs-pillar-cta" to="/ohs-player/">
            Understand OHS Player <span>→</span>
          </Link>
        </div>

        {/* Pillar 03: AI Commons */}
        <div className="ohs-pillar-card is-disabled">
          <div className="ohs-pillar-header">
            <span className="ohs-pillar-tag">PILLAR 03</span>
            <span className="ohs-coming-soon-badge">Incubating</span>
          </div>
          <h3>AI Commons (Incubating)</h3>
          <p>
            Structured FHIR prompt engineering tools, standardized clinical benchmarking,
            and safety evaluation frameworks for builders and health authorities.
          </p>
          <Link className="ohs-pillar-cta" to="/why-ohs/#pillar-3-for-ai-commons-incubating">
            Learn about AI Commons <span>→</span>
          </Link>
        </div>
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
          <Link to="/why-ohs/">About Open Health Stack</Link>
          <Link to="/get-started/">Learn & Get Started</Link>
          <Link to="/tutorials-and-codelabs/">Tutorials & Codelabs</Link>
          <Link to="/overview/solutions-and-pathways/">Stories & Solutions</Link>
          <Link to="/resources/">Community</Link>
          <a href="https://github.com/ohs-foundation" target="_blank" rel="noopener noreferrer">
            GitHub Repositories ↗
          </a>
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
        <PillarsSection />
        <article className="ohs-landing-content">{children}</article>
      </main>
      <Footer />
    </div>
  );
}
