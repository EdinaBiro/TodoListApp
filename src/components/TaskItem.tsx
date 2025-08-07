import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Animated,
} from "react-native";
import { Task } from "../types/Task";
import { COLORS } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

interface TaskItemProps {
  task: Task;
  onToggleFavorite: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleFavorite,
  onToggleComplete,
  onDelete,
}) => {
  const animationRef = useRef<LottieView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (task.completed) {
      animationRef.current?.play();

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(opacityAnim, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [task.completed, scaleAnim, opacityAnim]);

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

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        task.completed && styles.completedContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      {task.completed && (
        <View style={styles.animationOverlay}>
          <LottieView
            ref={animationRef}
            source={require("../../assets/animations/Done.json")}
            style={styles.successAnimation}
            loop={false}
            autoPlay={false}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.checkboxButton,
          task.completed && styles.checkboxButtonCompleted,
        ]}
        onPress={handleToggleComplete}
      >
        <Ionicons
          name={task.completed ? "checkmark" : "ellipse-outline"}
          size={24}
          color={
            task.completed ? COLORS.CARD_BACKGROUND : COLORS.TEXT_SECONDARY
          }
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            task.isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={() => onToggleFavorite(task.id)}
        >
          <Ionicons
            name={task.isFavorite ? "star" : "star-outline"}
            size={24}
            color={task.isFavorite ? COLORS.FAVORITE : COLORS.NOT_FAV}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </Animated.View>
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
  completedContainer: {
    backgroundColor: "#F8F9FA",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.SUCCESS,
  },
  animationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    pointerEvents: "none",
  },
  successAnimation: {
    width: 80,
    height: 80,
  },
  checkboxButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 20,
  },
  checkboxButtonCompleted: {
    backgroundColor: COLORS.SUCCESS,
  },
});
