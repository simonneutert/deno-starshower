import { assertEquals } from "@std/assert";
import { asyncfetchStarredRepos, createClient } from "../lib/client.ts";

Deno.test("asyncfetchStarredReposTest", async () => {
  try {
    Deno.readFileSync("./test/Starred_Repos.json");
    console.log("Delete ./test/Starred_Repos.json to regenerate test data.");
  } catch (_error) {
    console.log("Generating test data: Starred_Repos.json");
    const client = createClient();
    const repos = await asyncfetchStarredRepos(client, "simonneutert");
    Deno.mkdirSync("deno-starshower_output", { recursive: true });
    Deno.writeFileSync(
      "./test/Starred_Repos.json",
      new TextEncoder().encode(
        JSON.stringify(repos, null, 2),
      ),
    );
    console.log("Starred_Repos.json has been generated.");
  }
  const repos = JSON.parse(
    new TextDecoder().decode(Deno.readFileSync("./test/Starred_Repos.json")),
  );
  assertEquals(Array.isArray(repos), true);
});
