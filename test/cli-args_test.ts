import { assertEquals } from "@std/assert";

const { allowedCliArgs } = await import("../lib/cli-args.ts");

Deno.test("allowedCliArgsTest", () => {
  const expectedAllowedCliArgs = {
    "group-by-year": Boolean,
    "no-json": Boolean,
    help: Boolean,
    "-h": Boolean,
    "-?": Boolean,
  };
  assertEquals(allowedCliArgs, expectedAllowedCliArgs);
});
