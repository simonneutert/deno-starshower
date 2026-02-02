export function cliHelp() {
  console.error(
    `Please provide a GitHub username as a command-line argument.

Usage: deno run --allow-net --allow-write main.ts <github_username> [--group-by-year]

Options:
  --group-by-year   Group the starred repositories by the year they were last pushed to.
  --no-json         Do not generate the JSON output file.
  --help            Show this help message.
  -h, -?            Show this help message.

If no username is provided, the program will exit with an error.
If --group-by-year is provided, the output markdown file will group repositories by year (as default).`,
  );
}

export const allowedCliArgs = {
  "group-by-year": Boolean,
  "no-json": Boolean,
  help: Boolean,
  "-h": Boolean,
  "-?": Boolean,
};

export function checkCliArgumentsAndRun(cliArgs: Record<string, unknown>) {
  if (
    Deno.args.length < 1 ||
    cliArgs["help"] ||
    Deno.args[0].startsWith("--help") ||
    Deno.args[0].startsWith("-?") ||
    Deno.args[0].startsWith("-h")
  ) {
    cliHelp();
    Deno.exit(1);
  } else if (
    Deno.args.length &&
    (Deno.args[0].includes("@") || Deno.args[0].startsWith("--"))
  ) {
    console.error(
      "The first argument should be the GitHub username without the '@' sign.",
    );
    Deno.exit(1);
  } else if (Deno.args[0]?.length > 50) {
    console.error("Please provide only one GitHub username.");
    Deno.exit(1);
  } else if (verifyCliArguments(cliArgs) === false) {
    // output valid options
    console.error(
      `Invalid command-line arguments provided. Valid options are:\n${
        Object.keys(
          allowedCliArgs,
        ).map((e) => `\t${e}`).join(",\n")
      }`,
    );
    Deno.exit(1);
  }
}

function verifyCliArguments(cliArgs: Record<string, unknown>): boolean {
  const deepCopyOfAllowedCliArgs = { ...cliArgs };
  if ("_" in deepCopyOfAllowedCliArgs) delete deepCopyOfAllowedCliArgs["_"];
  for (const arg in deepCopyOfAllowedCliArgs) {
    if (!(arg in allowedCliArgs)) {
      return false;
    }
  }
  return true;
}
