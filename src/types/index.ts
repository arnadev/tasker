export interface Filters {
  open: boolean;
  priority: { low: boolean; medium: boolean; high: boolean };
  progress: { lower: number; higher: number };
  createdAt: { lower: Date; higher: Date };
  updatedAt: { lower: Date; higher: Date };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high"; // string union type
  progress: number; // 0–100
  createdAt: Date;
  updatedAt: Date;
}

export interface SortBy {
  open: boolean;
  field: 'title' | 'description' | 'priority' | 'progress' | 'createdAt' | 'updatedAt';
  direction: "asc" | "desc";
}