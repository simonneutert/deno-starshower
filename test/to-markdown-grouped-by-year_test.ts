import { assertEquals } from "@std/assert";
import {
  markdownGroupedByYearHeader,
  markdownGroupedByYearHeaderTitle,
  sortReposByPushedAtDescending,
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

Deno.test(function sortReposByPushedAtDescendingTest() {
  const repos = [
    { id: 1, name: "repo1", pushed_at: "2023-01-15T10:00:00Z" },
    { id: 2, name: "repo2", pushed_at: "2025-06-20T14:30:00Z" },
    { id: 3, name: "repo3", pushed_at: "2024-03-10T08:15:00Z" },
    { id: 4, name: "repo4", pushed_at: "2022-12-01T16:45:00Z" },
  ];

  const sorted = sortReposByPushedAtDescending(repos);

  // Verify correct descending order (newest first)
  assertEquals(sorted[0].id, 2); // 2025-06-20
  assertEquals(sorted[1].id, 3); // 2024-03-10
  assertEquals(sorted[2].id, 1); // 2023-01-15
  assertEquals(sorted[3].id, 4); // 2022-12-01

  // Verify original array is not mutated (deep copy)
  assertEquals(repos[0].id, 1);
  assertEquals(repos[1].id, 2);
  assertEquals(repos[2].id, 3);
  assertEquals(repos[3].id, 4);
});
