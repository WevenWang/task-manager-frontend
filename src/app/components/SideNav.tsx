import { Stack, Typography, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";

function SideNav() {
	const { removeAllTasks } = useContext(TaskListContext);
	return (
		<Stack
			width="20%"
			margin="auto"
			sx={{
				borderRight: "1px solid lightgrey",
				p: 3,
				minWidth: "200px",
			}}
		>
			<Typography variant="h6">Task Manager</Typography>
			<Box flexGrow={1} />
			<Button
				variant="contained"
				color="primary"
				onClick={removeAllTasks}
			>
				Delete All Tasks
			</Button>
		</Stack>
	);
}

export default SideNav;
