import { Octokit } from "@octokit/rest";
import { StarredRepo, StarredRepoArraySchema } from "../types.ts";
import z from "zod";

function useTokenFromEnv() {
  try {
    return Deno.env.get("GITHUB_STARSHOWER") ||
      Deno.env.get("GITHUB_TOKEN") ||
      Deno.env.get("GH_PAT");
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function createClient(): Octokit {
  let octokit: Octokit;
  if (useTokenFromEnv()) {
    octokit = new Octokit({
      auth: useTokenFromEnv(),
    });
  } else {
    console.log("Please make sure to have a GitHub token configured.");
    console.log("See the official documentation (README.md).");
    console.log(
      `Export the environment variable GITHUB_STARSHOWER with the needed rights to access GitHub.`,
    );
    Deno.exit(1);
  }
  return octokit;
}
export async function asyncfetchStarredRepos(
  octokit: Octokit,
  username: string,
  debug = false,
): Promise<StarredRepo[]> {
  // Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
  const starred: StarredRepo[] = [];
  await octokit.paginate(
    octokit.rest.activity.listReposStarredByUser,
    {
      username: username,
      per_page: 100,
    },
  ).then((response) => {
    if (debug) {
      console.log(
        `Fetched ${response.length} starred repositories for user ${username}.`,
      );
    }

    // validate response type using zod
    try {
      const parsed = StarredRepoArraySchema.parse(response);
      starred.push(...parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.issues);
      } else {
        console.error("Unexpected error during validation:", error);
      }
    }
  });

  return await starred;
}
