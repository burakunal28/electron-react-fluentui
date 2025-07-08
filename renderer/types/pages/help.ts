import type { ReactElement } from "react";

export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
}

export interface HelpState {
  articles: HelpArticle[];
  selectedArticle: HelpArticle | null;
  searchQuery: string;
  selectedCategory: string | null;
}

export interface HelpSection {
  question: string;
  answer: string;
  difficulty: "Basic" | "Intermediate" | "Advanced";
  lastUpdated: string;
  tags: string[];
  relatedArticles?: {
    title: string;
    link: string;
  }[];
}

export interface HelpItem {
  id: string;
  title: string;
  icon: ReactElement;
  sections: HelpSection[];
}
