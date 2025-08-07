export interface Task {
  id: string;
  title: string;
  isFavorite: boolean;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}
