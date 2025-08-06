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
}
