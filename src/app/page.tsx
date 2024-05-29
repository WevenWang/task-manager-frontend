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
import { TaskListContextProvider } from "./context/TaskListContext";
import Board from "./components/Board";
import SideNav from "./components/SideNav";

export default function Home() {
	return (
		<TaskListContextProvider>
			<Stack
				sx={{
					width: "100%",
					minHeight: "100vh",

					bgcolor: "background.default",
				}}
				direction="row"
				spacing={2}
			>
				<SideNav />

				<Board />
			</Stack>
		</TaskListContextProvider>
	);
}
