export function reposGroupByPushedToInYear<T extends { pushed_at: string }>(
  repos: T[],
): Record<string, T[]> {
  const byYear: Record<string, T[]> = {};
  for (const repo of repos) {
    const year = new Date(repo.pushed_at).getFullYear().toString();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(repo);
  }

  return byYear;
}
