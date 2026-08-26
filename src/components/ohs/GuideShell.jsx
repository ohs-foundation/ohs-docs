import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useDoc, useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import DocSidebarItems from "@theme/DocSidebarItems";
import SearchBar from "@theme/SearchBar";
import Brand from "./Brand";
import { repositoryFor } from "@site/src/data/playerRepositories";

/**
 * Tracks the heading currently under the guide topbar. The theme's own
 * useTOCHighlight is unusable here because it reads `.navbar` height, and the
 * OHS layout deliberately renders no Docusaurus navbar.
 */
function useActiveHeading(headingIds) {
  const key = headingIds.join("|");
  const [activeId, setActiveId] = useState(headingIds[0]);
  useEffect(() => {
    const ids = key ? key.split("|") : [];
    if (!ids.length) return undefined;
    function update() {
      // Anchor jumps land a heading at scroll-padding-top, so the highlight
      // line has to sit just below it for clicks and scrolling to agree.
      const scrollPadding = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      );
      const topbar = document.querySelector(".ohs-guide-topbar");
      const offset =
        (Number.isFinite(scrollPadding)
          ? scrollPadding
          : (topbar?.clientHeight ?? 66) + 30) + 12;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top - offset <= 0)
          current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActiveId(atBottom ? ids[ids.length - 1] : current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key]);
  return activeId;
}

function PageToc({ entries, activeId, mobile = false }) {
  const className = mobile ? "ohs-mobile-toc-nav" : "ohs-guide-toc-links";
  return (
    <nav className={className}>
      {entries.map((entry) => (
        <a
          key={entry.id}
          className={entry.id === activeId ? "active" : undefined}
          aria-current={entry.id === activeId ? "location" : undefined}
          href={`#${entry.id}`}
        >
          {entry.value}
        </a>
      ))}
    </nav>
  );
}

/**
 * Top-level section switcher. The site has one docs area per sidebar (the
 * Player journey, the FHIR Foundations pillar), and this is the persistent
 * way to move between them from any page. Add an entry here when a new
 * section lands. Rendered in the topbar on desktop and inside the sidebar
 * panel on mobile, selected purely by CSS.
 */
function SectionNav({ className }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/ohs-docs/" || pathname === "/ohs-docs";
  const inWhyOhs = pathname.includes("/why-ohs/") || pathname.includes("/overview/");
  const inFoundation = pathname.includes("/fhir-foundations/");
  const inTutorials = pathname.includes("/resources/tutorials-and-codelabs/");
  const inResources = pathname.includes("/resources/") && !inTutorials;
  const inPlayer = !isHome && !inWhyOhs && !inFoundation && !inResources && !inTutorials;
  return (
    <nav className={className} aria-label="Documentation sections">
      <Link
        to="/"
        className={isHome ? "active" : undefined}
        aria-current={isHome ? "true" : undefined}
      >
        OHS Docs Home
      </Link>
      <Link
        to="/why-ohs/"
        className={inWhyOhs ? "active" : undefined}
        aria-current={inWhyOhs ? "true" : undefined}
      >
        Why OHS
      </Link>
      <Link
        to="/fhir-foundations/"
        className={inFoundation ? "active" : undefined}
        aria-current={inFoundation ? "true" : undefined}
      >
        FHIR Foundations
      </Link>
      <Link
        to="/concepts/what-ohs-player-is/"
        className={inPlayer ? "active" : undefined}
        aria-current={inPlayer ? "true" : undefined}
      >
        OHS Player
      </Link>
      <Link
        to="/resources/tutorials-and-codelabs/"
        className={inTutorials ? "active" : undefined}
        aria-current={inTutorials ? "true" : undefined}
      >
        Tutorials & Codelabs
      </Link>
      <Link
        to="/resources/"
        className={inResources ? "active" : undefined}
        aria-current={inResources ? "true" : undefined}
      >
        Resources
      </Link>
    </nav>
  );
}

function GuideSidebar({ open, onClose }) {
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();
  const inWhyOhs = pathname.includes("/why-ohs/") || pathname.includes("/overview/");
  const inFoundation = pathname.includes("/fhir-foundations/");
  const inTutorials = pathname.includes("/resources/tutorials-and-codelabs/");
  const inResources = pathname.includes("/resources/") && !inTutorials;

  const sectionTitle = inWhyOhs
    ? "STRATEGY & EVALUATION"
    : inFoundation
    ? "FHIR FOUNDATIONS PILLAR"
    : inTutorials
    ? "DEVELOPER TUTORIALS"
    : inResources
    ? "RESOURCES & COMMUNITY"
    : "OHS PLAYER REFERENCE";

  return (
    <>
      <button
        className="ohs-guide-backdrop"
        hidden={!open}
        type="button"
        aria-label="Close documentation navigation"
        onClick={onClose}
      />
      <aside
        tabIndex="0"
        className={`ohs-guide-sidebar ${open ? "is-open" : ""}`}
        id="docs-sidebar"
        aria-label="Documentation navigation"
      >
        <div className="ohs-sidebar-mobile-head">
          <Brand />
          <button type="button" aria-label="Close navigation" onClick={onClose}>
            ×
          </button>
        </div>
        <SectionNav className="ohs-sidebar-sections" />
        <div className="ohs-sidebar-section-header">
          <span className="ohs-sidebar-section-label">{sectionTitle}</span>
        </div>
        <nav
          aria-label="Documentation sections"
          className="ohs-sidebar-navigation"
        >
          {sidebar && (
            <ul className="menu__list">
              <DocSidebarItems
                items={sidebar.items}
                activePath={pathname}
                level={1}
              />
            </ul>
          )}
        </nav>
        <div className="ohs-sidebar-help">
          <strong>Need the source material?</strong>
          <p>Each guide links to its owning repository.</p>
          <a href="https://github.com/orgs/ohs-foundation/discussions">
            Get help ↗
          </a>
        </div>
      </aside>
    </>
  );
}

function GuideHeader({ menuRef, onOpen, sidebarOpen }) {
  return (
    <header className="ohs-guide-topbar">
      <div className="ohs-guide-topbar-inner">
        <button
          ref={menuRef}
          className="ohs-sidebar-toggle"
          type="button"
          aria-label="Open documentation navigation"
          aria-expanded={sidebarOpen}
          aria-controls="docs-sidebar"
          onClick={onOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <Brand />
        <div className="ohs-header-divider" />
        <SectionNav className="ohs-section-nav" />
        <div className="ohs-header-actions">
          <div className="ohs-header-search">
            <SearchBar />
          </div>
          <a href="https://github.com/ohs-foundation">GitHub ↗</a>
        </div>
      </div>
    </header>
  );
}

/** Guide shell only. Titles, sections, requirements, and outcomes come from MDX. */
export default function GuideShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuButton = useRef(null);
  const { metadata, frontMatter, toc } = useDoc();
  const tocEntries = toc.filter((entry) => entry.level === 2);
  const activeHeading = useActiveHeading(tocEntries.map((entry) => entry.id));
  useEffect(() => {
    document.documentElement.setAttribute("data-docs-ready", "true");
    function onKeydown(event) {
      if (event.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
        window.setTimeout(() => menuButton.current?.focus(), 0);
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [sidebarOpen]);
  function closeSidebar() {
    setSidebarOpen(false);
    window.setTimeout(() => menuButton.current?.focus(), 0);
  }
  const focus = frontMatter.guide_focus ?? "OHS Player";
  const repository = repositoryFor(frontMatter.repository);
  return (
    <div className="ohs-guide-page" id="top">
      <GuideHeader
        menuRef={menuButton}
        onOpen={() => setSidebarOpen(true)}
        sidebarOpen={sidebarOpen}
      />
      <div className="ohs-guide-layout">
        <GuideSidebar open={sidebarOpen} onClose={closeSidebar} />
        <main className="ohs-guide-article">
          <div className="ohs-breadcrumbs">
            <Link to="/">Docs</Link>
            <span>/</span>
            <b>{metadata.title}</b>
          </div>
          <details className="ohs-mobile-toc">
            <summary>
              On this page <span>⌄</span>
            </summary>
            <PageToc mobile entries={tocEntries} activeId={activeHeading} />
          </details>
          <header className="ohs-guide-heading">
            <div className="ohs-heading-tags">
              <span className="ohs-page-type">
                {frontMatter.guide_type ?? "GUIDE"}
              </span>
              {frontMatter.release_tag && (
                <span className="ohs-release-badge ohs-release-alpha">
                  {frontMatter.release_tag}
                </span>
              )}
            </div>
            <h1>{metadata.title}</h1>
            <p>{metadata.description}</p>
            <div className="ohs-page-meta">
              <span>
                <b>FOCUS</b> {focus}
              </span>
              {frontMatter.release_tag && (
                <span>
                  <b>STATUS</b> {frontMatter.release_tag}
                </span>
              )}
            </div>
          </header>
          {children}
        </main>
        <aside className="ohs-guide-toc" aria-label="On this page">
          <h2>On this page</h2>
          <PageToc entries={tocEntries} activeId={activeHeading} />
          <div className="ohs-toc-divider" />
          <span>SOURCE</span>
          <a
            className="ohs-source-link"
            href={
              repository?.url ??
              frontMatter.source_url ??
              "https://github.com/ohs-foundation/ohs-player"
            }
          >
            {frontMatter.source_label ?? `${repository?.label ?? "Repository"} ↗`}
          </a>
        </aside>
      </div>
    </div>
  );
}
