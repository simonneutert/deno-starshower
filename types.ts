import { z } from "zod";

/**
 * Generated TypeScript interfaces from the example GitHub repository object
 */
export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: "User" | "Organization" | string;
  user_view_type?: string;
  site_admin: boolean;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string | null;
  url: string | null;
  node_id: string;
  html_url?: string;
}

export interface Permissions {
  admin: boolean;
  maintain?: boolean;
  push?: boolean;
  triage?: boolean;
  pull?: boolean;
}

export interface StarredRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions?: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: Permissions;
}

export type StarredRepos = StarredRepo[];

export const OwnerSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string(),
  organizations_url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  received_events_url: z.string(),
  type: z.union([z.literal("User"), z.literal("Organization"), z.string()]),
  user_view_type: z.string().optional(),
  site_admin: z.boolean(),
});

export const LicenseSchema = z.object({
  key: z.string(),
  name: z.string(),
  spdx_id: z.string().nullable(),
  url: z.string().nullable(),
  node_id: z.string(),
  html_url: z.string().optional(),
});

export const PermissionsSchema = z.object({
  admin: z.boolean(),
  maintain: z.boolean().optional(),
  push: z.boolean().optional(),
  triage: z.boolean().optional(),
  pull: z.boolean().optional(),
});

export const StarredRepoSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  owner: OwnerSchema,
  html_url: z.string(),
  description: z.string().nullable(),
  fork: z.boolean(),
  url: z.string(),
  forks_url: z.string(),
  keys_url: z.string(),
  collaborators_url: z.string(),
  teams_url: z.string(),
  hooks_url: z.string(),
  issue_events_url: z.string(),
  events_url: z.string(),
  assignees_url: z.string(),
  branches_url: z.string(),
  tags_url: z.string(),
  blobs_url: z.string(),
  git_tags_url: z.string(),
  git_refs_url: z.string(),
  trees_url: z.string(),
  statuses_url: z.string(),
  languages_url: z.string(),
  stargazers_url: z.string(),
  contributors_url: z.string(),
  subscribers_url: z.string(),
  subscription_url: z.string(),
  commits_url: z.string(),
  git_commits_url: z.string(),
  comments_url: z.string(),
  issue_comment_url: z.string(),
  contents_url: z.string(),
  compare_url: z.string(),
  merges_url: z.string(),
  archive_url: z.string(),
  downloads_url: z.string(),
  issues_url: z.string(),
  pulls_url: z.string(),
  milestones_url: z.string(),
  notifications_url: z.string(),
  labels_url: z.string(),
  releases_url: z.string(),
  deployments_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  git_url: z.string(),
  ssh_url: z.string(),
  clone_url: z.string(),
  svn_url: z.string(),
  homepage: z.string().nullable(),
  size: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  language: z.string().nullable(),
  has_issues: z.boolean(),
  has_projects: z.boolean(),
  has_downloads: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(),
  has_discussions: z.boolean().optional(),
  forks_count: z.number(),
  mirror_url: z.string().nullable(),
  archived: z.boolean(),
  disabled: z.boolean(),
  open_issues_count: z.number(),
  license: LicenseSchema.nullable(),
  allow_forking: z.boolean(),
  is_template: z.boolean(),
  web_commit_signoff_required: z.boolean(),
  topics: z.array(z.string()),
  visibility: z.string(),
  forks: z.number(),
  open_issues: z.number(),
  watchers: z.number(),
  default_branch: z.string(),
  permissions: PermissionsSchema,
});

export const StarredRepoArraySchema = z.array(StarredRepoSchema);
