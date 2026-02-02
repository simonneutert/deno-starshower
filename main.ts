// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts

import { parseArgs } from "@std/cli";
import { asyncfetchStarredRepos, createClient } from "./lib/client.ts";
import {
  writeMarkdownFileGroupedByYear,
} from "./lib/to-markdown-grouped-by-year.ts";
import { checkCliArgumentsAndRun, cliHelp } from "./lib/cli-args.ts";

function conditionalWriteJsonFile(
  data: unknown,
  cliArgs: Record<string, unknown>,
) {
  if (cliArgs["--no-json"]) {
    console.log("Skipping JSON file generation as per --no-json flag.");
    return;
  }
  Deno.writeFileSync(
    "deno-starshower_output/Starred_Repos.json",
    new TextEncoder().encode(JSON.stringify(data, null, 2)),
  );
  console.log("Starred_Repos.json has been generated.");
}

// If this module is the main module, run the script:
if (import.meta.main) {
  const cliArgs = parseArgs(Deno.args);
  checkCliArgumentsAndRun(cliArgs);

  const username = Deno.args[0];
  console.log("Loading starred repositories... please stand by.");
  const client = createClient();
  const data = await asyncfetchStarredRepos(client, username, true);

  // create output directory, if it doesn't exist
  Deno.mkdirSync("deno-starshower_output", { recursive: true });
  // write JSON file unless --no-json flag is provided
  conditionalWriteJsonFile(data, cliArgs);
  // write markdown file (grouped by year is the default behavior)
  if (Deno.args.length == 1 || cliArgs["group-by-year"]) {
    writeMarkdownFileGroupedByYear(username, data);
    console.log("Starred_Repos.md has been generated.");
  } else {
    cliHelp();
    Deno.exit(1);
  }
}
