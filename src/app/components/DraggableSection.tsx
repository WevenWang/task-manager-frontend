import { Grid, Stack } from "@mui/material";
import React from "react";
import { TaskStatusEnum } from "../types/task";
import TaskContainer from "./TaskContainer";
import useResponsive from "../hooks/useResponsive";

function DraggableSection() {
	const mdup = useResponsive("up", "md");
	return (
		<Grid container spacing={1} sx={{ height: "100%" }}>
			<Grid item xs={12} md={6} lg={4}>
				<TaskContainer
					status={TaskStatusEnum.Todo}
					sx={{ backgroundColor: "#EAEAEA" }}
				/>
			</Grid>
			<Grid item xs={12} md={6} lg={4}>
				<TaskContainer
					status={TaskStatusEnum.InProgress}
					sx={{ backgroundColor: "#FFF6EB" }}
				/>
			</Grid>

			<Grid item xs={12} md={6} lg={4}>
				<TaskContainer
					status={TaskStatusEnum.ReadyForReview}
					sx={{ backgroundColor: "#EAF6FF" }}
				/>
			</Grid>
		</Grid>
	);
}

export default DraggableSection;
