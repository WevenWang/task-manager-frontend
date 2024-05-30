import { TaskStatusEnum } from "./task";

export type SortOrder = {
	taskIds: string[];
	status: TaskStatusEnum;
};
