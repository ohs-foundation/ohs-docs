import React from "react";
import Link from "@docusaurus/Link";

export default function Brand({
  to = "/",
  compact = false,
  foundation = false,
}) {
  return (
    <Link
      className="ohs-brand"
      to={to}
      aria-label="Open Health Stack Documentation"
    >
      <span className="ohs-brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {!compact && (
        <span className="ohs-brand-name">
          <strong>Open Health Stack</strong>
          <small>{foundation ? "Software Foundation" : "Documentation"}</small>
        </span>
      )}
    </Link>
  );
}
