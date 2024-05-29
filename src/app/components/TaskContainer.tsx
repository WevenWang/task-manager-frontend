"use client";

import { Card, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TaskStatusEnum } from "../types/task";
import { TaskListContext } from "../context/TaskListContext";

function TaskContainer({ status }: { status: TaskStatusEnum }) {
	const { tasks } = useContext(TaskListContext);
	const filteredTasks = tasks.filter((task) => task.status === status);

	return (
		<Card sx={{ width: "30%", p: 2, height: "100%" }}>
			<Typography variant="h6">{status}</Typography>
			{filteredTasks.map((task) => (
				<Card key={task._id} sx={{ p: 1, m: 1 }}>
					<Typography>{task.text}</Typography>
				</Card>
			))}
		</Card>
	);
}

export default TaskContainer;
