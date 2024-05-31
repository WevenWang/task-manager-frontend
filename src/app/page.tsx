"use client";
import { Stack } from "@mui/material";
import { TaskListContextProvider } from "./context/TaskListContext";
import Board from "./components/Board";
import SideNav from "./components/SideNav";
import useResponsive from "./hooks/useResponsive";

export default function Home() {
	const mdUp = useResponsive("up", "md");
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
			{mdUp && <SideNav />}

			<Board />
		</Stack>
	);
}
