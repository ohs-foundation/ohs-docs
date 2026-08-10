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
        <Brand foundation />
        <nav
          id="primary-navigation"
          className={menuOpen ? "ohs-main-nav is-open" : "ohs-main-nav"}
          aria-label="Primary navigation"
        >
          <Link to="/">Overview</Link>
          <Link to="/ohs-player/">OHS Player</Link>
          <Link to="/contributing/">Contributing</Link>
        </nav>
        <div className="ohs-nav-actions">
          <div className="ohs-header-search">
            <SearchBar />
          </div>
          <a className="ohs-foundation-link" href="https://ohs.foundation/">
            Foundation site <span aria-hidden="true">↗</span>
          </a>
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

function Footer() {
  return (
    <footer className="ohs-footer">
      <div className="ohs-footer-inner">
        <div>
          <Brand foundation />
          <p>Documentation for the Open Health Stack components and the OHS Player reference toolkit.</p>
        </div>
        <div className="ohs-footer-links">
          <Link to="/ohs-player/">OHS Player</Link>
          <Link to="/ohs-player/setups/">Setups</Link>
          <Link to="/contributing/">Contributing</Link>
          <a href="https://github.com/ohs-foundation">Source</a>
          <a href="https://ohs.foundation/projects">OHS components</a>
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
            {frontMatter.eyebrow && <span className="ohs-eyebrow">{frontMatter.eyebrow}</span>}
            <h1>{metadata.title}</h1>
            <p>{metadata.description}</p>
            <div className="ohs-hero-actions">
              {primary && <Link className="ohs-button" to={primary.to}>{primary.label}</Link>}
              {secondary && <a className="ohs-button ohs-button-secondary" href={secondary.href}>{secondary.label} ↗</a>}
            </div>
          </div>
        </section>
        <article className="ohs-landing-content">{children}</article>
      </main>
      <Footer />
    </div>
  );
}
