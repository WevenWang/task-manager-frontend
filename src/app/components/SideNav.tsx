import { Stack, Typography, Box, Button, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import ListIcon from "@mui/icons-material/List";

function SideNav() {
	const { removeAllTasks } = useContext(TaskListContext);
	return (
		<Stack
			width="15%"
			margin="auto"
			sx={{
				borderRight: "1px solid lightgrey",
				p: 3,
				minWidth: "200px",
			}}
		>
			<Stack spacing={10}>
				<Typography variant="h6">Task Manager</Typography>
				<MenuItem selected>
					<ListIcon />
					Tasks
				</MenuItem>
			</Stack>
			<Box flexGrow={1} />
			<Button variant="outlined" color="error" onClick={removeAllTasks}>
				Delete All Tasks
			</Button>
		</Stack>
	);
}

export default SideNav;
