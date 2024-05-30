"use client";

import { createContext, useEffect, useState } from "react";
import { Task, TaskStatusEnum } from "../types/task";
import { createTask, getTasks } from "../api/taskApi";
import {
	createSortOrder,
	getSortOrders,
	updateSortOrder,
} from "../api/sortOrderApi";
import { SortOrder } from "../types/sortOrder";
import { AxiosError } from "axios";

type TaskListContextType = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	sortOrders: SortOrder[];
	setSortOrders: (sortOrders: SortOrder[]) => void;
	addTask: (task: Task) => void;
	removeTask: (taskId: string) => void;
	updateTask: (taskId: string, updatedTask: Task) => void;
};

const initialStates = {
	tasks: [],
	sortOrders: [],
};

const TaskListContext = createContext<TaskListContextType>({
	tasks: [],
	setTasks: () => {},
	sortOrders: [],
	setSortOrders: () => {},
	addTask: () => {},
	removeTask: () => {},
	updateTask: () => {},
});

export type TaskListContextProviderProps = {
	children: React.ReactNode;
};

function TaskListContextProvider({ children }: TaskListContextProviderProps) {
	const [tasks, setTasks] = useState<Task[]>(initialStates.tasks);
	const [sortOrders, setSortOrders] = useState<SortOrder[]>(
		initialStates.sortOrders
	);

	const loadTasks = async () => {
		try {
			const response = await getTasks();
			setTasks(response);
		} catch (error) {
			console.error(error);
		}
	};

	const updateLocalSortOrder = (
		status: TaskStatusEnum,
		taskIds: string[]
	) => {
		const updatedSortOrders = sortOrders.map((sortOrder) =>
			sortOrder.status === status ? { ...sortOrder, taskIds } : sortOrder
		);
		setSortOrders(updatedSortOrders);
	};

	const loadSortOrders = async () => {
		try {
			const response = await getSortOrders();
			if (response.length < 3) {
				const toDoSortOrder = {
					status: TaskStatusEnum.Todo,
					taskIds: [],
				};
				const inProgressSortOrder = {
					status: TaskStatusEnum.InProgress,
					taskIds: [],
				};
				const readyForReviewSortOrder = {
					status: TaskStatusEnum.ReadyForReview,
					taskIds: [],
				};
				await createSortOrder(toDoSortOrder);
				await createSortOrder(inProgressSortOrder);
				await createSortOrder(readyForReviewSortOrder);

				const sortOrders = await getSortOrders();
				setSortOrders(sortOrders);
			}
			setSortOrders(response);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		loadTasks();
		loadSortOrders();
	}, []);

	const addTask = async (task: Task) => {
		try {
			const response = await createTask(task);
			if (response) {
				task._id = response._id;
				setTasks([...tasks, task]);
				const currentTodoSortOrder = sortOrders.find(
					(sortOrder) => sortOrder.status === TaskStatusEnum.Todo
				);
				if (currentTodoSortOrder && task._id) {
					const updatedTaskIds = [
						task._id,
						...currentTodoSortOrder.taskIds,
					];

					updateLocalSortOrder(TaskStatusEnum.Todo, updatedTaskIds);
					await updateSortOrder({
						status: TaskStatusEnum.Todo,
						taskIds: updatedTaskIds,
					});
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const removeTask = (taskId: string) => {
		setTasks(tasks.filter((task) => task._id !== taskId));
	};

	const updateTask = (taskId: string, updatedTask: Task) => {
		setTasks(
			tasks.map((task) => (task._id === taskId ? updatedTask : task))
		);
	};

	return (
		<TaskListContext.Provider
			value={{
				tasks,
				addTask,
				removeTask,
				updateTask,
				sortOrders,
				setTasks,
				setSortOrders,
			}}
		>
			{children}
		</TaskListContext.Provider>
	);
}

export { TaskListContext, TaskListContextProvider };
