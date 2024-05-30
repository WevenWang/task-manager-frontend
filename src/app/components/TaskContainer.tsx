import { Card, SxProps, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TaskStatusEnum } from "../types/task";
import { TaskListContext } from "../context/TaskListContext";
import { SortOrder } from "../types/sortOrder";
import TaskCard from "./TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskContainer({
	status,
	sx,
}: {
	status: TaskStatusEnum;
	sx?: SxProps;
}) {
	const { tasks, sortOrders } = useContext(TaskListContext);

	const sortOrder =
		sortOrders.find((order) => order.status === status) ??
		({
			status: status,
			taskIds: [],
		} as SortOrder);
	const sortedTasks = sortOrder?.taskIds.map((id) =>
		tasks.find((task) => task._id === id)
	);

	const {
		setNodeRef,

		// listeners,
		// transform,
		// transition,
		// isDragging,
	} = useSortable({
		id: status,
		data: {
			type: "TaskContainer",
			status,
		},
	});

	return (
		<Card
			sx={{ width: "30%", p: 2, height: "100%", ...sx }}
			ref={setNodeRef}
			// {...listeners}
		>
			<Typography variant="subtitle1">{status}</Typography>
			{sortedTasks.map((task) => (
				<SortableContext items={sortOrder.taskIds} key={task?._id}>
					{task && <TaskCard task={task} />}
				</SortableContext>
			))}
		</Card>
	);
}

export default TaskContainer;
