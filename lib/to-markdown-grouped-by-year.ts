import { StarredRepo } from "../types.ts";
import { repoToMarkdown } from "./repo-to-markdown.ts";

export function markdownGroupedByYearHeaderTitle(username: string): string {
  return `# Starred Repositories

This document lists the repositories starred by @${username}.

The data is grouped by the year the repositories were last pushed to.

---

`;
}

export function markdownGroupedByYearHeader(year: string): string {
  return `## Last pushed to in ${year}\n\n`;
}

export function starredReposToMarkdownGroupedByYear(
  year: string,
  starredRepos: StarredRepo[],
): string {
  let markdown = markdownGroupedByYearHeader(year);
  for (const repo of starredRepos) {
    markdown += repoToMarkdown(repo);
  }
  return markdown;
}
