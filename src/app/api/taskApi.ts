import axios from "axios";
import { Task } from "../types/task";

const API_URL =
	`${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URI}/tasks` ||
	"http://localhost:5001/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
	const response = await axios.get(API_URL);
	return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
	const response = await axios.post(API_URL, task);
	return response.data;
};

export const updateTask = async (id: string, task: Task): Promise<Task> => {
	const response = await axios.put(`${API_URL}/${id}`, task);
	return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
	await axios.delete(`${API_URL}/${id}`);
};
