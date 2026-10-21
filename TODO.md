# Documentation Roadmap and To-Do Tracker

This tracker catalogues outstanding documentation tasks, content enhancements, video media integrations, and issue resolutions across the Open Health Stack documentation site.

---

## 1. Video Integration and Media Walkthroughs

- [x] **Link OHS Player Demo Video in Quickstart**
  - Updated `docs/get-started.md` to point directly to the 10-minute demo: `https://youtu.be/GMqFtlKE5kQ?si=z0I0JHLg6EyxIwst`.
- [x] **Add Video Walkthroughs Section in Tutorials & Codelabs**
  - Added dedicated section to `docs/tutorials-and-codelabs/overview.md` highlighting the OHS Player V1.0.0 Alpha Demo and the architectural overview video.
- [ ] **Responsive Video Player Component**
  - Create a custom React component (e.g. `@site/src/components/ohs/VideoPlayer.jsx`) with responsive 16:9 aspect ratio and privacy-enhanced YouTube embed (`youtube-nocookie.com`).
- [ ] **Migrate Legacy Video Series**
  - Review the 8-part video tutorial series from `legacy-ohs-dev/general/tutorials.md` (covering Android FHIR SDK, SDC Library, FHIR Engine, Info Gateway, and FHIR Data Pipes) and embed or link them into their respective guide pages under `docs/fhir-foundations/`.

---

## 2. Broken Links, Module Renames, and Path Fixes

- [x] **Correct Gradle Module Name for Client App**
  - Replaced stale module references `:ohs-player-reference-app` with `:reference-app` across `docs/get-started.md`, `docs/components/client-app/run.md`, and `docs/configure/screen-from-fhir-data.md`.
- [x] **Fix 404 GitHub File Links in Screen Configuration Guide**
  - Corrected GitHub blob URLs in `docs/configure/screen-from-fhir-data.md` to reference `reference-app/src/commonMain/composeResources/files/`.
- [x] **Replace Broken GitHub Discussions Link**
  - Updated `docs/resources.md` to link to the active OHS Discord (`https://discord.gg/sfgUU7AHZT`) and community channels page (`https://ohs.foundation/community#channels`).
- [x] **Direct Link for Kotlin FHIR Workflow**
  - Updated `docs/fhir-foundations/overview.md` from generic org URL to `https://github.com/ohs-foundation/kotlin-fhir-workflow`.
- [x] **Align AI Commons Link in Pathways Table**
  - Updated `docs/overview/solutions-and-pathways.md` to target `/why-ohs/#pillar-3-for-ai-commons-incubating` instead of generic `/resources/`.
- [x] **Align Step Numbering in Client App Run Guide**
  - Updated `docs/components/client-app/run.md` to indicate Step 3 of the get-started sequence.
- [x] **Context-Preserving Legacy Redirects**
  - Updated `docusaurus.config.js` to route legacy paths (`/docs/android-fhir-sdk`, `/docs/kotlin-fhir`, `/docs/fhir-gateway`, `/docs/fhir-data-pipes`) to their specific modern pillar pages.

---

## 3. Incomplete Pages and Content Depth (`guide_status: partial`)

- [ ] **Client App Overview (`docs/components/client-app/overview.md`)**
  - Add deep dive into Compose Multiplatform platform abstractions and local persistence state synchronization.
- [ ] **Client App Run Guide (`docs/components/client-app/run.md`)**
  - Document scoped synchronization boundaries once upstream access checkers finalize location and care-team filtering.
  - Document output APK paths and local run instructions for Android target.
- [ ] **Reference Analytics Guides (`docs/components/reference-analytics/`)**
  - Decouple Superset setup from manual container exec workarounds by adding a pre-baked `psycopg2-binary` Dockerfile recipe.
- [ ] **Backend Extensions (`docs/extend/backend-extensions.md`)**
  - Provide inline runnable Java/Kotlin template implementations of `AccessCheckerFactory` and custom Spring Boot gateway controllers.
- [ ] **SDC Form Customization (`docs/fhir-foundations/kotlin-fhir-data-capture/customize-and-extend.md`)**
  - Track upstream completion of `choiceColumn` rendering and cross-platform date/time formatting.
- [x] **AI Commons Transition from Incubating to Launching**
  - Updated Pillar 03 status to "Launching" across `LandingPage.jsx`, `sidebars.js`, `docs/overview/why-ohs.md`, `docs/learn/overview.md`, `docs/overview/solutions-and-pathways.md`, and diagram assets.
  - Framed mission as advancing safe, effective AI for global health use cases. Documented the **AI Evals Lifecycle Working Group** (Phase 1 Model Selection, Phase 2 Staging, Phase 3 Monitoring/CQI) with call to action for the October 26 kick-off session.
- [ ] **AI Commons Post-Kickoff Documentation Update (Scheduled for Week of October 27, 2026)**
  - Tracked in GitHub Issue #26.
  - Update guides with kick-off call outcomes, meeting recording, shared notes, and repository links.
  - Document bi-weekly collaborative schedule and Working Group Charter.

---

## 4. Open GitHub Issue Alignment

- **Issue #26**: Update AI Commons documentation and working group resources following kick-off call. *(Scheduled post-kickoff)*
- **Issue #25**: Add Video Walkthroughs section and link OHS Player Demo video. *(Completed locally)*
- **Issue #16**: Fix Get help, AI Commons and video links, and contribution/licence statements. *(Partially addressed by link fixes and video additions)*
- **Issue #13**: Fix the Run the Client App steps from first build to sign-in and sync. *(Module rename addressed)*
- **Issue #23**: Fix configuration pages and Zero-Code tutorial to match `player-reference-ig`.
- **Issue #24**: Correct what analytics pages say about local ports and Superset datasets.
- **Issue #15**: Correct library versions, platform support, and Maven coordinates.
- **Issue #14**: Update Web Portal pages to match Portal UI.
- **Issue #12**: Fix requirements and macOS steps on environment guide.
