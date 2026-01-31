import { StarredRepo } from "../types.ts";

export function markdownHeader(username: string): string {
  return `# Starred Repositories

This document lists the repositories starred by @${username}.

The data is grouped by the year the repositories were last pushed to.

---

`;
}

export function markdownYearHeader(year: string): string {
  return `## Last pushed to in ${year}\n\n`;
}

export function repoToMarkdown(starredRepo: StarredRepo): string {
  const { name, html_url, description, owner, pushed_at } = starredRepo;
  const ownerName = owner.login;
  const ownerUrl = owner.html_url;
  const stars = starredRepo.stargazers_count;
  const topics = starredRepo.topics;
  let markdown = `### [${name}](${html_url}) (${stars} 🌟)\n\n` +
    `**Owner:** [${ownerName}](${ownerUrl})\\\n` +
    `**Description:** ${description ?? "No description provided."}\\\n`;

  if (topics.length > 0) {
    const topicsLine = topics.join(", ");
    markdown += `**Topics:** ${topicsLine}` + "\\\n";
  }

  markdown += `**Stars:** ${stars}\\\n` +
    `**Last Pushed:** ${new Date(pushed_at).toLocaleDateString()}\n\n` +
    `---\n\n`;

  return markdown;
}

export function starredReposToMarkdown(
  year: string,
  starredRepos: StarredRepo[],
): string {
  let markdown = markdownYearHeader(year);
  for (const repo of starredRepos) {
    markdown += repoToMarkdown(repo);
  }
  return markdown;
}
