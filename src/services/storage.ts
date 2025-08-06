import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/Task";
import { STORAGE_KEY } from "../utils";

export class StorageService {
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const taskJson = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEY.TASKS, taskJson);
    } catch (error) {
      console.error("Error saving tasks:", error);
      throw new Error("Failed to save tasks");
    }
  }

  static async loadTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(STORAGE_KEY.TASKS);
      if (tasksJson == null) {
        return [];
      }
      return JSON.parse(tasksJson) as Task[];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  }

  static async clearTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY.TASKS);
    } catch (error) {
      console.error("Error clearing tasks:", error);
      throw new Error("Failed to clear tasks");
    }
  }

  static async addTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    try {
      const existingTask = await this.loadTasks();

      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const updatedTask = [...existingTask, newTask];
      await this.saveTasks(updatedTask);

      return newTask;
    } catch (error) {
      console.error("Error loading task:", error);
      throw new Error("Failed to add task");
    }
  }

  static async updateTask(
    taskId: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ): Promise<Task | null> {
    try {
      const existingTasks = await this.loadTasks();
      const taskIndex = existingTasks.findIndex((task) => task.id == taskId);

      if (taskIndex == -1) {
        return null;
      }

      const updatedTask = { ...existingTasks[taskIndex], ...updates };
      existingTasks[taskIndex] = updatedTask;

      await this.saveTasks(existingTasks);
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  }

  static async deleteTask(taskId: string): Promise<boolean> {
    try {
      const existingTasks = await this.loadTasks();
      const filteredTasks = existingTasks.filter((task) => task.id != taskId);

      if (filteredTasks.length == existingTasks.length) {
        return false;
      }
      await this.saveTasks(filteredTasks);
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  }
}
