export type Task = {
	_id: string;
	text: string;
	category: TaskCategoryEnum;
	status: TaskStatusEnum;
};

export enum TaskStatusEnum {
	Todo = "Todo",
	InProgress = "In Progress",
	ReadyForReview = "Ready For Review",
}

export enum TaskCategoryEnum {
	Engineering = "Engineering",
	Marketing = "Marketing",
	WebDesign = "Web Design",
	Sales = "Sales",
	Operations = "Operations",
}
