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
			{task ? <EditTaskForm /> : <CreateTaskForm onClose={onClose} />}
		</Dialog>
	);
}

function CreateTaskForm({ onClose }: { onClose: () => void }) {
	const [taskDescription, setTaskDescription] = useState("");
	const [taskCategory, setTaskCategory] = useState(
		TaskCategoryEnum.WebDesign
	);
	const theme = useTheme();
	const { addTask } = useContext(TaskListContext);
	const handleCreateTask = () => {
		addTask({
			text: taskDescription,
			category: taskCategory,
			status: TaskStatusEnum.Todo,
		});
		onClose();
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
				<Typography variant="subtitle1">Create New Task</Typography>
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
				<CategoryChip category={taskCategory} clickable />
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
				onClick={handleCreateTask}
			>
				Create Task
			</Button>
		</Stack>
	);
}

function EditTaskForm() {
	return <div></div>;
}

export default TaskDetailModal;
