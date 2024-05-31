import {
	Avatar,
	Box,
	Card,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Task } from "../types/task";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CategoryChip from "./CategoryChip";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TaskListContext } from "../context/TaskListContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function TaskCard({ task }: { task: Task }) {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task._id as string,
		data: {
			type: "Task",
			task,
		},
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	const opacity = isDragging ? 0.5 : 1;
	const boxShadow = isDragging ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "";
	const cursor = isDragging ? "grabbing" : "grab";

	const {
		markTaskAsDone,
		setOpenTaskDetailModal,
		setTaskToEdit,
		removeTask,
	} = useContext(TaskListContext);

	const handleEditTask = () => {
		setTaskToEdit(task);
		setOpenTaskDetailModal(true);
	};
	return (
		<Card
			ref={setNodeRef}
			sx={{
				p: 2,
				my: 1,
				boxShadow,
				cursor,
				opacity,
				...style,
			}}
			{...attributes}
			{...listeners}
		>
			<Stack spacing={1}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
				>
					{task.markAsDone ? (
						<IconButton size="small" color="success">
							<CheckCircleIcon />
						</IconButton>
					) : (
						<IconButton
							size="small"
							onClick={() => markTaskAsDone(task._id as string)}
						>
							<CheckCircleOutlineIcon />
						</IconButton>
					)}
					<Stack flexGrow={1} sx={{ ml: 1 }}>
						<Typography
							sx={{
								mt: 0.5,
								textDecorationLine: task.markAsDone
									? "line-through"
									: "none",

								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "3",
								WebkitBoxOrient: "vertical",
							}}
						>
							{task.text}
						</Typography>
					</Stack>
					<Stack direction="column">
						<IconButton
							size="small"
							onClick={() => removeTask(task._id as string)}
						>
							<DeleteOutlineIcon />
						</IconButton>

						<IconButton
							size="small"
							onClick={() => handleEditTask()}
						>
							<EditOutlinedIcon />
						</IconButton>
					</Stack>
				</Stack>
				<Stack
					direction="row"
					sx={{ px: 0.5 }}
					alignItems={"center"}
					spacing={1}
				>
					<Avatar
						alt="Spatial Labs Logo"
						src="Spatial Labs Logo.jpeg"
						sx={{ width: 30, height: 30 }}
					/>
					<Typography variant="body2">
						{dateParser(task.createdAt ?? "")}
					</Typography>
					<Box flexGrow={1} />
					<CategoryChip category={task.category} />
				</Stack>
			</Stack>
		</Card>
	);
}

function dateParser(date: string) {
	const d = new Date(date);
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

export default TaskCard;
