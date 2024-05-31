import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TaskListContextProvider } from "./context/TaskListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Task Manager",
	description: "Spatial Labs Task Manager",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<TaskListContextProvider>
				<body className={inter.className}>{children}</body>
			</TaskListContextProvider>
		</html>
	);
}
