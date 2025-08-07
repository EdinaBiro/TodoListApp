import { View, StyleSheet, Text, FlatList, SectionList } from "react-native";
import { Task } from "../types";
import LottieView from "lottie-react-native";
import { COLORS } from "../utils";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleFavorite: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  showCompleted?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleFavorite,
  onToggleComplete,
  onDelete,
  showCompleted = true,
}) => {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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

  const sections = [];

  if (activeTasks.length > 0) {
    sections.push({
      title: "Active Tasks",
      data: activeTasks,
      key: "active",
    });
  }

  if (completedTasks.length > 0 && showCompleted) {
    sections.push({
      title: `Completed Tasks (${completedTasks.length})`,
      data: completedTasks,
      key: "completed",
    });
  }

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.sectionHeader}>
      <Text
        style={[
          styles.sectionTitle,
          section.key === "completed" && styles.completedSectionTitle,
        ]}
      >
        {section.title}
      </Text>
    </View>
  );

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleFavorite={onToggleFavorite}
      onToggleComplete={onToggleComplete}
      onDelete={onDelete}
    />
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderTaskItem}
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
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
  sectionHeader: {
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  completedSectionTitle: {
    color: COLORS.TEXT_SECONDARY,
  },
});
