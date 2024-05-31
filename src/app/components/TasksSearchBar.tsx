import { Avatar, InputAdornment, Stack, TextField } from "@mui/material";
import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function TasksSearchBar() {
	const { searchString, setSearchString } = useContext(TaskListContext);
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			sx={{
				alignItems: "center",
			}}
		>
			<TextField
				label="Filter Task"
				variant="outlined"
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
				sx={{ width: "80%" }}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<SearchOutlinedIcon />
						</InputAdornment>
					),
				}}
			/>
			<Avatar sx={{ width: 40, height: 40 }} src="Spatial Labs Logo.jpeg">
				🔍
			</Avatar>
		</Stack>
	);
}

export default TasksSearchBar;
