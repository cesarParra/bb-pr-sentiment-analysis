export interface Decline {
  href: string;
}

export interface Diffstat {
  href: string;
}

export interface Commits {
  href: string;
}

export interface Self {
  href: string;
}

export interface Comments {
  href: string;
}

export interface Merge {
  href: string;
}

export interface Html {
  href: string;
}

export interface Activity {
  href: string;
}

export interface Diff {
  href: string;
}

export interface Approve {
  href: string;
}

export interface Statuses {
  href: string;
}

export interface Links {
  decline: Decline;
  diffstat: Diffstat;
  commits: Commits;
  self: Self;
  comments: Comments;
  merge: Merge;
  html: Html;
  activity: Activity;
  diff: Diff;
  approve: Approve;
  statuses: Statuses;
  avatar: Avatar;
}

export interface Avatar {
  href: string;
}

export interface Repository {
  links: Links;
  type: string;
  name: string;
  full_name: string;
  uuid: string;
}

export interface Branch {
  name: string;
}

export interface Destination {
  commit: Commit;
  repository: Repository;
  branch: Branch;
}

export interface Summary {
  raw: string;
  markup: string;
  html: string;
  type: string;
}

export interface Commit {
  hash: string;
  type: string;
  links: Links;
}

export interface Source {
  commit: Commit;
  repository: Repository;
  branch: Branch;
}

export interface Author {
  display_name: string;
  uuid: string;
  links: Links;
  nickname: string;
  type: string;
  account_id: string;
}

export interface Value {
  description: string;
  links: Links;
  title: string;
  close_source_branch: boolean;
  type: string;
  id: number;
  destination: Destination;
  created_on: Date;
  summary: Summary;
  source: Source;
  comment_count: number;
  state: string;
  task_count: number;
  reason: string;
  updated_on: Date;
  author: Author;
  merge_commit?: any;
  closed_by?: any;
}

export interface PullRequestData {
  pagelen: number;
  size: number;
  values: Value[];
  page: number;
  next: string;
}
