// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts

import { asyncfetchStarredRepos, createClient } from "./lib/client.ts";
import { reposGroupByPushedToInYear } from "./lib/repos-group-by-pushed-to-in-year.ts";
import {
  markdownGroupedByYearHeaderTitle,
  starredReposToMarkdownGroupedByYear,
} from "./lib/to-markdown-grouped-by-year.ts";

// If this module is the main module, run the script:
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
  const client = createClient();
  const data = await asyncfetchStarredRepos(client, username, true);
  Deno.mkdirSync("deno-starshower_output", { recursive: true });
  Deno.writeFileSync(
    "deno-starshower_output/Starred_Repos.json",
    new TextEncoder().encode(
      JSON.stringify(data, null, 2),
    ),
  );
  console.log("Starred_Repos.json has been generated.");
  const dataByYear = reposGroupByPushedToInYear(data);
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
  console.log("Starred_Repos.md has been generated.");
}
