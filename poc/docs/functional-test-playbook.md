# Docusaurus PoC functional-test playbook

Use this playbook to review the Markdown-first OHS Player documentation PoC. It validates navigation, authoring boundaries, placeholder labelling, and interface behaviour. It does not validate Player technical instructions.

## Scope

The reviewed documentation routes are:

- `/docusaurus/`: OHS Player landing page.
- `/docusaurus/setups/`: getting-started guidance and availability labels.
- `/docusaurus/setups/analytics/`: detailed source-backed Analytics guide.

Other setup and concept routes provide the sidebar and link coverage. `404.html` is generated static error output, not a documentation page.

The Analytics guide must state that its setup material is pending. Commands copied from an owning repository must be accurate. A route marked **Setup procedure pending** or **Setup material pending** must not present invented commands.

## Prerequisites

- Node.js `24.18.0` with bundled npm `11.16.0`.
- Dependencies and Playwright Chromium installed through the PoC bootstrap command.

Run these checks from the repository root:

```bash
npm --prefix poc run bootstrap
npm --prefix poc run validate -- --candidate=docusaurus
npm --prefix poc run build -- --candidate=docusaurus
npm --prefix poc run smoke:paths -- --candidate=docusaurus
npm --prefix poc run a11y -- --candidate=docusaurus
npm --prefix poc run capture -- --candidate=docusaurus
```

Expected results: static output in `poc/.output/docusaurus/`, Axe results in `poc/results/accessibility/axe.json`, and desktop/mobile screenshots in `poc/results/screenshots/`.

## Manual functional review

Start the Docusaurus development server with the same Node runtime:

```bash
PATH=/private/tmp/node-v24.18.0-darwin-arm64/bin:$PATH \
npm --prefix poc/docusaurus run start -- --host 127.0.0.1 --port 3001
```

Open `http://localhost:3001/docusaurus/`. Test at `1440 × 900` desktop and `390 × 844` mobile.

### Navigation and content

1. Open the landing page. Confirm its hero copy, actions, repository links, and ordinary Markdown sections render.
2. Follow **Setups** and **Concepts** from the top navigation. Each must reach its canonical trailing-slash route.
3. Open **Setups**. Confirm it presents the backend services, Web Portal administration, and Client App as one quick-start sequence, and uses reader-facing availability language.
4. Open Analytics. Confirm its first prerequisite explains the missing Reference Infrastructure procedure before any Analytics command appears.
5. Open Reference Infrastructure. Confirm it links to the owning repository, does not offer a setup command, and explicitly warns against assuming that `ohs-play-compose.yml` exists.
6. Use the guide sidebar and table of contents. Confirm each route and heading is reachable and direct reloads work.

### Markdown authoring boundary

1. Inspect `poc/docusaurus/docs/landing.md` and `poc/docusaurus/docs/setups/analytics.md`.
2. Confirm both contain Markdown and frontmatter only, with no JSX import, HTML layout, or CSS class authoring.
3. Change a sentence or heading in a local copy, then confirm it appears after the development server reloads or after a build.
4. Confirm status, focus, source link, and table of contents are rendered from frontmatter and headings by the shared template.

### Mobile and keyboard behaviour

1. At `390 × 844`, open the landing navigation with **Toggle navigation** and close it with `Escape`.
2. On a guide route, open the documentation drawer with **Open documentation navigation** and close it with `Escape`.
3. Verify focus returns to the triggering button in both cases.
4. Tab through navigation, article links, callout links, code blocks, and footer links. Every interactive element must show a visible focus indicator.
5. Confirm tables scroll within their container rather than forcing page-wide horizontal scroll.

### Network, visual review, and defects

1. Reload each reviewed route with browser developer tools open. No page asset or data request may leave the local origin.
2. Review generated screenshots. There is no approved pixel baseline; record observations rather than a pixel-diff score.
3. Record defects with route, viewport, browser, reproduction steps, expected behaviour, observed behaviour, and a screenshot or CI artifact link.

## Accessibility status

The automated check scans every required route at both viewports with Axe. It also verifies `Escape` and focus restoration for the two mobile navigation patterns. A serious or critical Axe violation, failed keyboard assertion, or outbound request fails the check.

## Known limitations

- Analytics is a detailed source-backed guide, not a complete validated environment guide.
- The Reference Infrastructure repository does not currently provide enough detail for a runnable procedure.
- There is no approved CI pixel baseline or visual-diff result.

## Related

- [[OHS Player documentation information architecture]]
- [[OHS Player setup sequencing from existing repositories]]
