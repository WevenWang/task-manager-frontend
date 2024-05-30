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
	sortOrders: SortOrder[];
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
	sortOrders: [],
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

	const updateSortOrderWithTasks = async (
		status: string,
		taskIds: string[]
	) => {
		try {
			const sortOrder = { status, taskIds };

			const updatedSortOrder = await updateSortOrder(status, sortOrder);
			setSortOrders(
				sortOrders.map((sortOrder) =>
					sortOrder.status === status ? updatedSortOrder : sortOrder
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const loadSortOrders = async () => {
		try {
			const response = await getSortOrders();
			if (response.length === 0) {
				const sortOrder = { status: TaskStatusEnum.Todo, taskIds: [] };
				const createdSortOrder = await createSortOrder(sortOrder);
				setSortOrders([createdSortOrder]);
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
					await updateSortOrderWithTasks(
						TaskStatusEnum.Todo,
						updatedTaskIds
					);

					const updatedSortOrders = sortOrders.map((sortOrder) =>
						sortOrder.status === TaskStatusEnum.Todo
							? { ...sortOrder, taskIds: updatedTaskIds }
							: sortOrder
					);
					setSortOrders(updatedSortOrders);
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
			value={{ tasks, addTask, removeTask, updateTask, sortOrders }}
		>
			{children}
		</TaskListContext.Provider>
	);
}

export { TaskListContext, TaskListContextProvider };
