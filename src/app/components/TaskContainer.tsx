import {
	Box,
	Card,
	CardContent,
	CardHeader,
	SxProps,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { TaskStatusEnum } from "../types/task";
import { TaskListContext } from "../context/TaskListContext";
import { SortOrder } from "../types/sortOrder";
import TaskCard from "./TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useResponsive from "../hooks/useResponsive";

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

	const { setNodeRef } = useSortable({
		id: status,
		data: {
			type: "TaskContainer",
			status,
		},
	});

	const mdUp = useResponsive("up", "md");
	const backgroundColor = (sx as any).backgroundColor ?? "background.default";
	const theme = useTheme();
	return (
		<Card
			sx={{
				width: "100%",
				p: 2,
				pt: 0,
				minWidth: 250,
				minHeight: "100%",
				height: "100%",

				overflow: "auto",
				...sx,
			}}
			ref={setNodeRef}
		>
			<CardHeader
				title={status}
				sx={{
					position: "sticky",
					top: 0,
					backgroundColor: backgroundColor,
					zIndex: 1,
				}}
			/>

			{sortedTasks.map((task) => (
				<SortableContext items={sortOrder.taskIds} key={task?._id}>
					{task && <TaskCard task={task} />}
				</SortableContext>
			))}
		</Card>
	);
}

export default TaskContainer;
