export interface Self {
  href: string;
}

export interface Html {
  href: string;
}

export interface Code {
  href: string;
}

export interface Links {
  self: Self;
  html: Html;
  code: Code;
}

export interface Self2 {
  href: string;
}

export interface Html2 {
  href: string;
}

export interface Links2 {
  self: Self2;
  html: Html2;
}

export interface Pullrequest {
  type: string;
  id: number;
  links: Links2;
  title: string;
}

export interface Content {
  raw: string;
  markup: string;
  html: string;
  type: string;
}

export interface Self3 {
  href: string;
}

export interface Html3 {
  href: string;
}

export interface Avatar {
  href: string;
}

export interface Links3 {
  self: Self3;
  html: Html3;
  avatar: Avatar;
}

export interface User {
  display_name: string;
  uuid: string;
  links: Links3;
  nickname: string;
  type: string;
  account_id: string;
}

export interface Inline {
  to: number;
  from?: any;
  path: string;
}

export interface Self4 {
  href: string;
}

export interface Html4 {
  href: string;
}

export interface Links4 {
  self: Self4;
  html: Html4;
}

export interface Parent {
  id: number;
  links: Links4;
}

export interface Value {
  links: Links;
  deleted: boolean;
  pullrequest: Pullrequest;
  content: Content;
  created_on: Date;
  user: User;
  updated_on: Date;
  type: string;
  id: number;
  inline: Inline;
  parent: Parent;
}

export interface CommentData {
  pagelen: number;
  size: number;
  values: Value[];
  page: number;
  next: string;
}
