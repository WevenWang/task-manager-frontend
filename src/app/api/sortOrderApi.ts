import axios from "axios";
import { SortOrder } from "../types/sortOrder";

const API_URL =
	`${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URI}/sort-orders` ||
	"http://localhost:5001/api/sort-orders";

export const getSortOrders = async (): Promise<SortOrder[]> => {
	const response = await axios.get(API_URL);
	return response.data;
};

export const createSortOrder = async (
	sortOrder: SortOrder
): Promise<SortOrder> => {
	const response = await axios.post(API_URL, sortOrder);
	return response.data;
};

export const updateSortOrder = async (
	sortOrder: SortOrder
): Promise<SortOrder> => {
	const response = await axios.patch(
		`${API_URL}/${sortOrder.status}`,
		sortOrder
	);
	return response.data;
};

export const deleteSortOrders = async (): Promise<void> => {
	await axios.delete(API_URL);
};
