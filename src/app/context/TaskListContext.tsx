import { createContext, useEffect, useState } from "react";
import { Task } from "../types/task";
import { getTasks } from "../api/taskApi";

type TaskListContextType = {
	tasks: Task[];
	addTask: (task: Task) => void;
	removeTask: (taskId: string) => void;
	updateTask: (taskId: string, updatedTask: Task) => void;
};

const initialStates = {
	tasks: [],
};

const TaskListContext = createContext<TaskListContextType>({
	tasks: [],
	addTask: () => {},
	removeTask: () => {},
	updateTask: () => {},
});

export type TaskListContextProviderProps = {
	children: React.ReactNode;
};

function TaskListContextProvider({ children }: TaskListContextProviderProps) {
	const [tasks, setTasks] = useState<Task[]>(initialStates.tasks);
	const loadTasks = async () => {
		const response = await getTasks();

		setTasks(response);
	};

	useEffect(() => {
		loadTasks();
	}, []);

	const addTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	const removeTask = (taskId: string) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	const updateTask = (taskId: string, updatedTask: Task) => {
		setTasks(
			tasks.map((task) => (task.id === taskId ? updatedTask : task))
		);
	};

	return (
		<TaskListContext.Provider
			value={{ tasks, addTask, removeTask, updateTask }}
		>
			{children}
		</TaskListContext.Provider>
	);
}

export { TaskListContext, TaskListContextProvider };
