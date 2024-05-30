import {
	Button,
	Dialog,
	IconButton,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Task, TaskCategoryEnum, TaskStatusEnum } from "../types/task";
import CloseIcon from "@mui/icons-material/Close";
import CategoryChip from "./CategoryChip";
import { TaskListContext } from "../context/TaskListContext";

function TaskDetailModal({
	task,
	open,
	onClose,
}: {
	task?: Task;
	open: boolean;
	onClose: () => void;
}) {
	return (
		<Dialog open={open} onClose={onClose} sx={{ p: 2 }}>
			<CreateEditTaskForm onClose={onClose} taskToEdit={task} />
		</Dialog>
	);
}

function CreateEditTaskForm({
	onClose,
	taskToEdit,
}: {
	onClose: () => void;
	taskToEdit?: Task;
}) {
	const [taskDescription, setTaskDescription] = useState(
		taskToEdit?.text || ""
	);
	const [taskCategory, setTaskCategory] = useState(
		taskToEdit?.category || TaskCategoryEnum.WebDesign
	);
	const theme = useTheme();
	const { addTask, updateAndSaveTask } = useContext(TaskListContext);
	const handleCreateTask = () => {
		addTask({
			text: taskDescription,
			category: taskCategory,
			status: TaskStatusEnum.Todo,
		});
		onClose();
	};

	const handleUpdateTask = async () => {
		if (taskToEdit) {
			updateAndSaveTask(taskToEdit._id as string, {
				...taskToEdit,
				text: taskDescription,
				category: taskCategory,
			});

			onClose();
		}
	};

	return (
		<Stack sx={{ p: 2, minWidth: 350 }} spacing={2}>
			<Stack
				direction="row"
				justifyContent="space-between"
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Typography variant="subtitle1">
					{taskToEdit ? "Edit Task" : "Create Task"}
				</Typography>
				<IconButton onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</Stack>

			<Stack
				direction="row"
				justifyContent="space-between"
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Typography
					variant="body2"
					sx={{ color: theme.palette.text.secondary }}
				>
					Category
				</Typography>
				<CategoryChip
					category={taskCategory}
					clickable
					onSelect={setTaskCategory}
				/>
			</Stack>

			<TextField
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
				variant="outlined"
				label="Description"
				fullWidth
				multiline
				rows={4}
			/>
			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={taskToEdit ? handleUpdateTask : handleCreateTask}
			>
				{taskToEdit ? "Update Task" : "Create Task"}
			</Button>
		</Stack>
	);
}

export default TaskDetailModal;
