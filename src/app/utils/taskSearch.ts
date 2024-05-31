import { Task } from "../types/task";

// implement task search based on text, category, and status
function filterTasksOnSearchString(
	tasks: Task[],
	searchString: string
): Task[] {
	return tasks.filter((task) => {
		const textMatch = task.text
			.toLowerCase()
			.includes(searchString.toLowerCase());
		const categoryMatch = task.category
			.toLowerCase()
			.includes(searchString.toLowerCase());

		return textMatch || categoryMatch;
	});
}

export { filterTasksOnSearchString };
