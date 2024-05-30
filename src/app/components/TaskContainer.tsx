import { Card, SxProps, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TaskStatusEnum } from "../types/task";
import { TaskListContext } from "../context/TaskListContext";
import { SortOrder } from "../types/sortOrder";

function TaskContainer({
	status,
	sx,
}: {
	status: TaskStatusEnum;
	sx?: SxProps;
}) {
	const { tasks, sortOrders } = useContext(TaskListContext);
	// sort task based on the taskIds array in the sortOrder object
	const sortOrder =
		sortOrders.find((order) => order.status === status) ??
		({
			status: status,
			taskIds: [],
		} as SortOrder);
	const sortedTasks = sortOrder?.taskIds.map((id) =>
		tasks.find((task) => task._id === id)
	);

	return (
		<Card sx={{ width: "30%", p: 2, height: "100%", ...sx }}>
			<Typography variant="subtitle1">{status}</Typography>
			{sortedTasks.map((task) => (
				<>
					{task && (
						<Card key={task._id} sx={{ p: 1, m: 1 }}>
							<Typography>{task.text}</Typography>
						</Card>
					)}
				</>
			))}
		</Card>
	);
}

export default TaskContainer;
