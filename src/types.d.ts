export interface Reference {
  text: string;
}

export interface NewsResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NewsItem[];
}

export interface NewsItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
  thumbnail?: string;
}

export interface ParsedContent {
  text: string;
}

export type LoadingStage =
  | "initializing"
  | "references"
  | "generating"
  | "finalizing";
