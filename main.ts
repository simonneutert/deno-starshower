// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts

import { asyncfetchStarredRepos } from "./lib/client.ts";
import { markdownHeader, starredReposToMarkdown } from "./lib/to-markdown.ts";

export function groupReposByPushedYear<T extends { pushed_at: string }>(
  repos: T[],
): Record<string, T[]> {
  const byYear: Record<string, T[]> = {};
  for (const repo of repos) {
    const year = new Date(repo.pushed_at).getFullYear().toString();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(repo);
  }

  return byYear;
}

if (import.meta.main) {
  if (Deno.args.length < 1) {
    console.error(
      "Please provide a GitHub username as a command-line argument.",
    );
    Deno.exit(1);
  } else if (Deno.args.length && Deno.args[0].includes("@")) {
    console.error("Please provide the GitHub username without the '@' sign.");
    Deno.exit(1);
  } else if (Deno.args[0]?.length > 50) {
    console.error("Please provide only one GitHub username.");
    Deno.exit(1);
  }

  const username = Deno.args[0];
  console.log("Loading starred repositories... please stand by.");
  const data = await asyncfetchStarredRepos(username, true);
  Deno.mkdirSync("deno-starshower_output", { recursive: true });
  Deno.writeFileSync(
    "deno-starshower_output/Starred_Repos.json",
    new TextEncoder().encode(
      JSON.stringify(data, null, 2),
    ),
  );
  console.log("Starred_Repos.json has been generated.");
  const dataByYear = groupReposByPushedYear(data);
  let text = markdownHeader(username);
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
    text += starredReposToMarkdown(
      year.toString(),
      dataByYear[year.toString()],
    );
  }
  Deno.writeFileSync(
    `deno-starshower_output/Starred_Repos.md`,
    new TextEncoder().encode(text),
  );
  console.log("Starred_Repos.md has been generated.");
}
