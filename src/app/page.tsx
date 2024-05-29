import Image from "next/image";
import styles from "./page.module.css";
import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	Stack,
	styled,
	TextField,
	Typography,
} from "@mui/material";

export default function Home() {
	return (
		<Stack
			sx={{
				width: "100%",
				minHeight: "100vh",

				bgcolor: "background.default",
			}}
			direction="row"
			spacing={2}
		>
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
				<Button variant="contained" color="primary">
					Delete All Tasks
				</Button>
			</Stack>

			<Stack width="80%" margin="auto" sx={{ p: 3 }} spacing={2}>
				<Stack direction="row" justifyContent="space-between">
					<TextField label="Filter Task" variant="outlined" />
				</Stack>

				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h6">Tasks</Typography>
					<Button variant="contained" color="primary">
						Add Task
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
		</Stack>
	);
}
