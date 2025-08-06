import React, { useState } from "react";
import { TaskItem } from "./TaskItem";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (title: string) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onClose,
  onAddTask,
}) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    if (trimmedTitle.length > 100) {
      Alert.alert("Error", "Task title must be less than 100 characters");
      return;
    }

    onAddTask(trimmedTitle);
    setTaskTitle("");
    onClose();
  };

  const handleCancel = () => {
    setTaskTitle("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView style={styles.keyboardAvoid}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>Add New Task</Text>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancelButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.label}>Task Title</Text>
              <TextInput
                style={styles.input}
                value={taskTitle}
                onChangeText={setTaskTitle}
                placeholder="Enter task title..."
                placeholderTextColor={COLORS.TEXT_SECONDARY}
                autoFocus
                multiline
                maxLength={100}
              />
              <Text style={styles.charCount}>
                {taskTitle.length}/100 characters
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleCancel}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  !taskTitle.trim() && styles.primaryButtonDisabled,
                ]}
                onPress={handleAddTask}
                disabled={!taskTitle.trim()}
              >
                <Text
                  style={[
                    styles.primaryButtonText,
                    !taskTitle.trim() && styles.primaryButtonTextDisabled,
                  ]}
                >
                  Add Task
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoid: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  cancelButton: {
    fontSize: 18,
    color: COLORS.TEXT_SECONDARY,
    padding: 4,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "right",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: COLORS.TEXT_SECONDARY,
  },
  primaryButtonText: {
    fontSize: 16,
    color: COLORS.CARD_BACKGROUND,
    fontWeight: "600",
  },
  primaryButtonTextDisabled: {
    color: COLORS.CARD_BACKGROUND,
  },
});
