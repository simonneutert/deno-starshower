import { assert } from "@std/assert";
import { repoToMarkdown } from "../lib/repo-to-markdown.ts";
import { sampleRepo } from "../main_test.ts";
import { expectedMarkdownSnippet } from "./expected-markdown-templates.ts";

Deno.test(function repoToMarkdownTest() {
  assert(
    repoToMarkdown(sampleRepo).includes(expectedMarkdownSnippet),
  );
});
