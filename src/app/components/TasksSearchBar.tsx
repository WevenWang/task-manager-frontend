import { Stack, TextField } from "@mui/material";
import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";

function TasksSearchBar() {
	const { searchString, setSearchString } = useContext(TaskListContext);
	return (
		<Stack direction="row" justifyContent="space-between">
			<TextField
				label="Filter Task"
				variant="outlined"
				fullWidth
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
			/>
		</Stack>
	);
}

export default TasksSearchBar;
