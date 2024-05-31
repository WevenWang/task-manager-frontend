"use client";
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
import useResponsive from "./hooks/useResponsive";

export default function Home() {
	const mdUp = useResponsive("up", "md");
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
				{mdUp && <SideNav />}

				<Board />
			</Stack>
		</TaskListContextProvider>
	);
}
