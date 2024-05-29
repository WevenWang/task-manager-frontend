import { Stack, TextField, Typography, Button, Card } from "@mui/material";
import React from "react";

function Board() {
	return (
		<Stack width="80%" margin="auto" sx={{ p: 3 }} spacing={2}>
			<Stack direction="row" justifyContent="space-between">
				<TextField label="Filter Task" variant="outlined" />
			</Stack>

			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h6">Tasks</Typography>
				<Button variant="contained" color="primary">
					+ New Task
				</Button>
			</Stack>
			<Stack
				direction="row"
				width={"100%"}
				height={"80%"}
				justifyContent={"space-around"}
			>
				<Card sx={{ width: "30%", p: 2, height: "100%" }}>
					<Typography variant="h6">Todo</Typography>
				</Card>

				<Card sx={{ width: "30%", p: 2 }}>
					<Typography variant="h6">In Progress</Typography>
				</Card>

				<Card sx={{ width: "30%", p: 2 }}>
					<Typography variant="h6">Ready for Review</Typography>
				</Card>
			</Stack>
		</Stack>
	);
}

export default Board;
