# deno-starshower

[![Deno CI](https://github.com/simonneutert/deno-starshower/actions/workflows/deno-test.yml/badge.svg?branch=main)](https://github.com/simonneutert/deno-starshower/actions/workflows/deno-test.yml)

A small Deno utility that fetches a GitHub user's starred repositories and
produces two outputs:

- `deno-starshower_output/Starred_Repos.json` — the raw JSON array returned by
  GitHub
- `deno-starshower_output/Starred_Repos.md` — a readable Markdown report grouped
  by the year each repository was last pushed to

The project uses `@octokit/rest` to fetch data and `zod` to validate the
responses. Import mappings are defined in `deno.json`.

👉️ See the Sample Output [here](./public/Sample_Starred_Repos.md). 👈️

👉️ And the JSON [here](./public/Sample_Starred_Repos.json). 👈️

---

I run this repo in a GitHub action to auto-update my
[bridgetown](https://www.bridgetownrb.com/) based personal website, hosted on
GitHub.\
Visit my
[GitHub Action yaml](https://github.com/simonneutert/simonneutert.github.io/blob/main/.github/workflows/deno-starshower.yml)
for some inspiration.

---

![deno-starshower-logo](./public/deno-starshower.webp)

## Requirements

- Deno (recent stable release with npm compatibility)
- A GitHub token to increase API rate limits. Set `GITHUB_STARSHOWER`,
  `GITHUB_TOKEN` or `GH_PAT` in the environment. The token needs only
  `public_repo` scope.\
  `GITHUB_STARSHOWER` is the preferred way.

No clue what that token is, or how to set it up?\
[Read GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens),
or use your preferred search engine, to learn how to create yours.

## Setup

1. Install Deno: follow instructions at https://deno.com.
2. Export a GitHub token:

```bash
export GITHUB_STARSHOWER=your_token_here
```

## Usage

Run the script with a GitHub username (omit the `@` sign). The script requires
permissions to access the network, read environment variables, and write files.

### Help

```bash
deno run --allow-env --allow-net --allow-write main.ts --help
```

### Example with output

```bash
deno run --allow-env --allow-net --allow-write main.ts <github_username>
```

OR download the single file binary release from the
[releases page](https://github.com/simonneutert/deno-starshower/releases/) and
run:

```bash
chmod +x deno-starshower_<version>

./deno-starshower_<version> <github_username>
```

## Outputs

- `deno-starshower_output/Starred_Repos.json` — the validated JSON array of
  starred repositories
- `deno-starshower_output/Starred_Repos.md` — a Markdown report generated from
  the JSON and grouped by the `pushed_at` year

Both files are written to the `deno-starshower_output` directory. The script
will create the directory if it does not exist.

## How it works (high level)

- `lib/client.ts` creates an Octokit client (using `GITHUB_STARSHOWER`,
  `GITHUB_TOKEN` or `GH_PAT` if provided) and uses `octokit.paginate` to fetch
  all starred repositories for a user. The response is validated with the Zod
  schema in `types.ts`.
- `lib/to-markdown.ts` transforms validated repository objects into Markdown
  sections grouped by year.
- `main.ts` orchestrates the process: it fetches data, writes the JSON file,
  groups repositories by year, and writes the Markdown report.

## Development

- Run the unit tests:

```bash
deno test
```

- Run in watch mode:

```bash
deno task dev
```

## Files of interest

- `main.ts` — program entry and orchestration
- `lib/client.ts` — GitHub API client and pagination
- `lib/to-markdown.ts` — Markdown rendering helpers
- `types.ts` — Zod schemas and TypeScript interfaces
- `deno.json` — task and import mappings

## Configuration and troubleshooting

- Environment token: set `GITHUB_STARSHOWER`, `GITHUB_TOKEN` or `GH_PAT` to
  increase rate limits and avoid authentication errors.
- Deno npm compatibility: this project references npm packages via Deno's import
  maps in `deno.json`. Ensure your Deno version supports the used
  interoperability.
- File permissions: the script writes to `deno-starshower_output/`; ensure the
  process has permission to create and write files in the repository directory.

## Improvements

- add throttling via
  [octokit/plugin-throttling.js](https://github.com/octokit/plugin-throttling.js)

## Example

Fetch starred repositories for user `octocat`:

```bash
deno run --allow-env --allow-net --allow-write main.ts octocat
```

After the run the two output files will be available under
`deno-starshower_output/`.
