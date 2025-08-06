import { View, StyleSheet, Text, FlatList } from "react-native";
import { Task } from "../types";
import LottieView from "lottie-react-native";
import { COLORS } from "../utils";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleFavorite: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleFavorite,
  onDelete,
}) => {
  if (tasks.length == 0) {
    return (
      <View style={styles.emptyContainer}>
        <LottieView
          source={require("../../assets/animations/Checklist.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.emptyText}>No Tasks Yet</Text>
        <Text style={styles.emptyDescription}>
          Tap the + button to add your first task
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyDescription: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 22,
  },
  listContainer: {
    paddingVertical: 8,
  },
});
