import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Task } from "../types";
import { StorageService } from "../services";
import { COLORS } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { TaskList } from "../components";

export const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const loadedTasks = await StorageService.loadTasks();

      const sortedTasks = loadedTasks.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setTasks(sortedTasks);
    } catch (error) {
      Alert.alert("Error", "Failed to load tasks");
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = async (title: string) => {
    try {
      const newTask = await StorageService.addTask({
        title,
        isFavorite: false,
      });

      setTasks((prevTasks) => {
        const updatedTasks = [newTask, ...prevTasks];
        return updatedTasks.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      });
    } catch (error) {
      Alert.alert("Error", "Failed to add task");
      console.error("Error adding task:", error);
    }
  };

  const handleToggleFavorite = async (taskId: string) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id == taskId);
      if (!taskToUpdate) return;

      const updatedTask = await StorageService.updateTask(taskId, {
        isFavorite: !taskToUpdate.isFavorite,
      });

      if (updatedTask) {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) =>
            task.id == taskId ? updatedTask : task
          );

          return updatedTasks.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const success = await StorageService.deleteTask(taskId);
      if (success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        Alert.alert("Error", "Task not found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete task");
      console.error("Error deleting task:", error);
    }
  };

  const favoriteCount = tasks.filter((task) => task.isFavorite).length;
  const totalCount = tasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.BACKGROUND} />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>
            {totalCount === 0
              ? "No tasks yet"
              : `${totalCount} task${totalCount !== 1 ? "s" : ""}${
                  favoriteCount > 0
                    ? `, ${favoriteCount} favorite${
                        favoriteCount !== 1 ? "s" : ""
                      }`
                    : ""
                }`}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <TaskList
          tasks={tasks}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteTask}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAddModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: "400",
  },
  content: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: COLORS.CARD_BACKGROUND,
    fontWeight: "400",
  },
});
