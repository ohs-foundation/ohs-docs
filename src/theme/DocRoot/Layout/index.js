import React from "react";
import BackToTopButton from "@theme/BackToTopButton";

/** The OHS shells own responsive navigation; Docusaurus still owns the route and MDX document. */
export default function DocRootLayout({ children }) {
  return (
    <div className="ohs-doc-root">
      <BackToTopButton />
      {children}
    </div>
  );
}
