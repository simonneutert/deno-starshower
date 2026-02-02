import { assertEquals } from "@std/assert";
import {
  markdownGroupedByYearHeader,
  markdownGroupedByYearHeaderTitle,
} from "../lib/to-markdown-grouped-by-year.ts";
import {
  expectedMarkdownGroupedByYearHeaderTitleTestuser,
} from "./expected-markdown-templates.ts";

Deno.test(function markdownGroupedByYearHeaderTitleTest() {
  const username = "testuser";
  assertEquals(
    markdownGroupedByYearHeaderTitle(username),
    expectedMarkdownGroupedByYearHeaderTitleTestuser,
  );
});

Deno.test(function markdownGroupedByYearHeaderTest() {
  const year = "2023";
  assertEquals(
    markdownGroupedByYearHeader(year),
    "## Last pushed to in 2023\n\n",
  );
});
