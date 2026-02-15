import { StarredRepo } from "../types.ts";
import { repoToMarkdown } from "./repo-to-markdown.ts";
import { reposGroupByPushedToInYear } from "./repos-group-by-pushed-to-in-year.ts";

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

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function sortReposByPushedAtDescending<T extends { pushed_at: string }>(
  repos: T[],
): T[] {
  const deepCopyRepos = deepCopy(repos);
  deepCopyRepos.sort((a, b) => {
    const dateA = new Date(a.pushed_at);
    const dateB = new Date(b.pushed_at);
    return dateB.getTime() - dateA.getTime();
  });
  return deepCopyRepos;
}

export function writeMarkdownFileGroupedByYear(
  username: string,
  data: StarredRepo[],
) {
  const dataByYear = reposGroupByPushedToInYear(
    sortReposByPushedAtDescending(
      deepCopy(data),
    ),
  );
  let text = markdownGroupedByYearHeaderTitle(username);
  const years = Object.keys(dataByYear).map(Number).sort((a, b) => b - a);

  if (years.length > 1) {
    let toc = "**Table of Contents**\n\n";
    for (const year of years) {
      toc += `- [Last pushed to in ${year}](#last-pushed-to-in-${year})\n`;
    }
    toc += "\n---\n\n";
    text += toc;
  }

  for (const year of years) {
    text += starredReposToMarkdownGroupedByYear(
      year.toString(),
      dataByYear[year.toString()],
    );
  }

  Deno.writeFileSync(
    `deno-starshower_output/Starred_Repos.md`,
    new TextEncoder().encode(text),
  );
}
