import { assert, assertEquals } from "@std/assert";
import {
  markdownHeader,
  markdownYearHeader,
  repoToMarkdown,
} from "..//lib/to-markdown.ts";
import { sampleRepo } from "../main_test.ts";

Deno.test(function markdownHeaderTest() {
  const username = "testuser";
  assertEquals(
    markdownHeader(username).includes(`@${username}`),
    true,
  );
});

Deno.test(function markdownYearHeaderTest() {
  const year = "2023";
  assertEquals(
    markdownYearHeader(year),
    "## Last pushed to in 2023\n\n",
  );
});

Deno.test(function repoToMarkdownTest() {
  let expected = "";
  expected +=
    `### [vis-network](https://github.com/visjs/vis-network) (3506 🌟)\n\n`;
  expected += `**Owner:** [visjs](https://github.com/visjs)\\\n`;
  expected +=
    `**Description:** :dizzy: Display dynamic, automatically organised, customizable network views.\\\n`;
  expected += `**Topics:** diagram, hacktoberfest, network, visjs\\\n`;
  expected += `**Stars:** 3506\\\n`;
  expected += `**Last Pushed:**`;
  assert(
    repoToMarkdown(sampleRepo).includes(expected),
  );
});
