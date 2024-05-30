import { Stack, TextField, Typography, Button, Card } from "@mui/material";
import React, { useState } from "react";
import TaskContainer from "./TaskContainer";
import { TaskStatusEnum } from "../types/task";
import TaskDetailModal from "./TaskDetailModal";

function Board() {
	const [openTaskDetailModal, setOpenTaskDetailModal] = useState(false);
	const handleClickNewTask = () => {
		setOpenTaskDetailModal(true);
	};

	const handleClose = () => {
		setOpenTaskDetailModal(false);
	};
	return (
		<Stack width="80%" margin="auto" sx={{ p: 3 }} spacing={2}>
			<Stack direction="row" justifyContent="space-between">
				<TextField label="Filter Task" variant="outlined" />
			</Stack>

			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h6">Tasks</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					onClick={handleClickNewTask}
				>
					+ New Task
				</Button>
				<TaskDetailModal
					open={openTaskDetailModal}
					onClose={handleClose}
				/>
			</Stack>
			<Stack
				direction="row"
				width={"100%"}
				height={"80%"}
				justifyContent={"space-around"}
			>
				<TaskContainer
					status={TaskStatusEnum.Todo}
					sx={{ backgroundColor: "#EAEAEA" }}
				/>
				<TaskContainer
					status={TaskStatusEnum.InProgress}
					sx={{ backgroundColor: "#FFF6EB" }}
				/>
				<TaskContainer
					status={TaskStatusEnum.ReadyForReview}
					sx={{ backgroundColor: "#EAF6FF" }}
				/>
			</Stack>
		</Stack>
	);
}

export default Board;
