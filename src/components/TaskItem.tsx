import { Alert, StyleSheet, View, Text } from "react-native";
import { Task } from "../types/Task";
import { COLORS } from "../utils";

interface TaskItemProps {
  task: Task;
  onToggleFavorite: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleFavorite,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you eant to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(task.id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteButton: {
    padding: 8,
    marginRight: 8,
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.WARNING,
    borderRadius: 20,
  },
  favoriteIcon: {
    fontSize: 20,
    color: COLORS.TEXT_SECONDARY,
  },
  favoriteIconActive: {
    color: COLORS.CARD_BACKGROUND,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
});
