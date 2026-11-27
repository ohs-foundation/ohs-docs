import { execFileSync } from "node:child_process";
import { repositoryRoot } from "./shared.mjs";

try {
  const isShallow = execFileSync(
    "git",
    ["rev-parse", "--is-shallow-repository"],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  ).trim();
  if (isShallow === "true") {
    console.log(
      "Shallow git repository detected; fetching full history for last-updated timestamps...",
    );
    execFileSync("git", ["fetch", "--unshallow"], {
      cwd: repositoryRoot,
      stdio: "inherit",
    });
  }
} catch (error) {
  console.warn(`Skipping git history unshallow: ${error.message}`);
}
