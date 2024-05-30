"use client";

import { createContext, useEffect, useState } from "react";
import { Task, TaskStatusEnum } from "../types/task";
import { createTask, deleteTasks, getTasks, updateTask } from "../api/taskApi";
import {
	createSortOrder,
	deleteSortOrders,
	getSortOrders,
	updateSortOrder,
} from "../api/sortOrderApi";
import { SortOrder } from "../types/sortOrder";
import { AxiosError } from "axios";

type TaskListContextType = {
	tasks: Task[];
	setTaskIdChanged: (task: String | null) => void;
	setTasks: (tasks: Task[]) => void;
	sortOrders: SortOrder[];
	setSortOrders: (sortOrders: SortOrder[]) => void;
	addTask: (task: Task) => void;
	removeTask: (taskId: string) => void;
	updateLocalTask: (taskId: string, updatedTask: Task) => void;

	persistLocalChanges: () => void;
	removeAllTasks: () => void;
	markTaskAsDone: (taskId: string) => void;
};

const initialStates = {
	tasks: [],
	sortOrders: [],
};

const TaskListContext = createContext<TaskListContextType>({
	tasks: [],
	setTasks: () => {},
	setTaskIdChanged: () => {},
	sortOrders: [],
	setSortOrders: () => {},
	addTask: () => {},
	removeTask: () => {},
	updateLocalTask: () => {},

	persistLocalChanges: () => {},
	removeAllTasks: () => {},
	markTaskAsDone: () => {},
});

export type TaskListContextProviderProps = {
	children: React.ReactNode;
};

function TaskListContextProvider({ children }: TaskListContextProviderProps) {
	const [taskIdChanged, setTaskIdChanged] = useState<String | null>(null);

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
			if (response.length == 0) {
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

				const sortOrders = [
					toDoSortOrder,
					inProgressSortOrder,
					readyForReviewSortOrder,
				];
				setSortOrders(sortOrders);
			} else {
				setSortOrders(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		loadTasks();
		loadSortOrders();
	}, [sortOrders.length]);

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

	const removeAllTasks = async () => {
		try {
			await deleteTasks();
			await deleteSortOrders();
		} catch (error) {
			console.error(error);
		}

		setTasks([]);
		setSortOrders([]);
	};

	const updateLocalTask = (taskId: string, updatedTask: Task) => {
		setTasks(
			tasks.map((task) => (task._id === taskId ? updatedTask : task))
		);
	};

	const persistLocalChanges = async () => {
		const tasksToPersist = tasks.filter((task) =>
			taskIdChanged === task._id ? task : null
		);

		try {
			await Promise.all(
				sortOrders.map((sortOrder) => updateSortOrder(sortOrder))
			);

			await Promise.all(
				tasksToPersist.map((task) =>
					updateTask(task._id as string, task)
				)
			);
		} catch (error) {
			console.error(error);
		} finally {
			setTaskIdChanged(null);
		}
	};

	const markTaskAsDone = async (taskId: string) => {
		try {
			const taskToUpdate = tasks.find((task) => task._id === taskId);
			if (taskToUpdate) {
				const updatedTask = { ...taskToUpdate, markAsDone: true };
				updateLocalTask(taskId, updatedTask);
				await updateTask(taskId, updatedTask);
				// move task to bottom of current status
				const currentStatusSortOrder = sortOrders.find(
					(sortOrder) => sortOrder.status === taskToUpdate.status
				);
				if (currentStatusSortOrder) {
					const updatedTaskIds =
						currentStatusSortOrder.taskIds.filter(
							(id) => id !== taskId
						);
					updatedTaskIds.push(taskId);
					updateLocalSortOrder(taskToUpdate.status, updatedTaskIds);
					await updateSortOrder({
						status: taskToUpdate.status,
						taskIds: updatedTaskIds,
					});
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<TaskListContext.Provider
			value={{
				tasks,
				setTaskIdChanged,
				addTask,
				removeTask,
				updateLocalTask,
				sortOrders,
				setTasks,
				setSortOrders,
				persistLocalChanges,
				removeAllTasks,
				markTaskAsDone,
			}}
		>
			{children}
		</TaskListContext.Provider>
	);
}

export { TaskListContext, TaskListContextProvider };
