import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import MDXContent from "@theme/MDXContent";
import GuideShell from "@site/src/components/ohs/GuideShell";
import LandingPage from "@site/src/components/ohs/LandingPage";

/**
 * The guide is a Docusaurus doc route, while its visual shell is deliberately
 * owned by OHS components. This preserves Docusaurus routing/search indexing
 * without coupling the implementation to the default theme markup.
 *
 * MDXContent supplies the MDXProvider that the default theme would normally
 * mount via DocItem/Content. Without it, standard Markdown authoring degrades
 * silently: fenced code blocks lose Prism highlighting and `:::note` renders
 * as an invalid <admonition> element with a passing build.
 */
export default function DocItemLayout({ children }) {
  const { frontMatter } = useDoc();
  const body = <MDXContent>{children}</MDXContent>;
  if (frontMatter.page_type === "landing") return <LandingPage>{body}</LandingPage>;
  return <GuideShell>{body}</GuideShell>;
}
