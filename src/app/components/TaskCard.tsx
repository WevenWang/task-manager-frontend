import { Card, Icon, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Task } from "../types/task";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CategoryChip from "./CategoryChip";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
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
					<IconButton sx={{ p: 0 }}>
						<CheckCircleOutlineIcon />
					</IconButton>
					<Typography>{task.text}</Typography>
					<IconButton sx={{ p: 0 }}>
						<DeleteOutlineIcon />
					</IconButton>
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="body2">
						{dateParser(task.createdAt ?? "")}
					</Typography>
					<CategoryChip category={task.category} />
				</Stack>
			</Stack>
		</Card>
	);
}

function dateParser(date: string) {
	// convert to Feb 23, no year
	const d = new Date(date);
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

export default TaskCard;
