import { Octokit } from "@octokit/rest";
import { StarredRepo, StarredRepoArraySchema } from "../types.ts";
import z from "zod";

const octokit = new Octokit({
  auth: Deno.env.get("GITHUB_TOKEN") || Deno.env.get("GH_PAT"),
});

export async function asyncfetchStarredRepos(
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
