import { Stack, Typography, Button, Divider } from "@mui/material";
import React, { useContext, useState } from "react";
import TaskContainer from "./TaskContainer";
import { Task, TaskStatusEnum } from "../types/task";

import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import TaskCard from "./TaskCard";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskListContext } from "../context/TaskListContext";
import TasksSearchBar from "./TasksSearchBar";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useResponsive from "../hooks/useResponsive";
import DraggableSection from "./DraggableSection";

function Board() {
	const [activeTask, setActiveTask] = useState<Task | null>(null);

	const {
		tasks,
		updateLocalTask,
		sortOrders,
		setSortOrders,
		setOpenTaskDetailModal,
		persistLocalChanges,
		removeAllTasks,
	} = useContext(TaskListContext);
	const handleClickNewTask = () => {
		setOpenTaskDetailModal(true);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	async function onDragEnd(event: DragEndEvent) {
		setActiveTask(null);

		const { over } = event;
		if (!over) return;
		console.log("DRAG END", sortOrders);

		await persistLocalChanges();
	}

	async function onDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveATask = active.data.current?.type === "Task";
		const isOverATask = over.data.current?.type === "Task";

		if (!isActiveATask) return;

		// Im dropping a Task over another Task
		if (isActiveATask && isOverATask) {
			console.log("DROPPING TASK OVER TASK", { activeId, overId });
			const activeTask = tasks.find((t) => t._id === activeId);
			const overTask = tasks.find((t) => t._id === overId);
			if (activeTask && overTask) {
				// place activeTask before overTask in the same status
				const overStatus = overTask.status;
				const orderAtStatus = sortOrders.find(
					(order) => order.status === overStatus
				);

				const oldStatus = activeTask.status;

				if (orderAtStatus) {
					let activeIndex = orderAtStatus.taskIds.indexOf(
						activeId as string
					);
					const overIndex = orderAtStatus.taskIds.indexOf(
						overId as string
					);
					if (activeIndex === -1) {
						// active task is not in the same status as over task
						// move active task to the status of over task first

						updateLocalTask(activeId as string, {
							...activeTask,
							status: overStatus,
						});

						const orderAtOldStatus = sortOrders.find(
							(order) => order.status === oldStatus
						);
						if (orderAtOldStatus) {
							const updatedTaskIds =
								orderAtOldStatus.taskIds.filter(
									(id) => id !== activeId
								);
							orderAtOldStatus.taskIds = updatedTaskIds;
						}
						const orderAtNewStatus = sortOrders.find(
							(order) => order.status === overStatus
						);
						if (orderAtNewStatus) {
							orderAtNewStatus.taskIds = [
								...orderAtNewStatus.taskIds,
								activeId as string,
							];

							activeIndex = orderAtNewStatus.taskIds.indexOf(
								activeId as string
							);
						}
					}
					if (activeIndex !== -1 && overIndex !== -1) {
						const newTaskIds = arrayMove(
							orderAtStatus.taskIds,
							activeIndex,
							overIndex
						);
						orderAtStatus.taskIds = newTaskIds;
						setSortOrders([...sortOrders]);
					}
				}
			}
		}

		const isOverAColumn = over.data.current?.type === "TaskContainer";

		// Im dropping a Task over a column
		if (isActiveATask && isOverAColumn) {
			const activeIndex = tasks.findIndex((t) => t._id === activeId);
			const oldStatus = tasks[activeIndex].status;
			updateLocalTask(activeId as string, {
				...tasks[activeIndex],
				status: overId as TaskStatusEnum,
			});

			console.log("DROPPING TASK OVER COLUMN", { activeIndex });

			const orderAtPrevStatus = sortOrders.find(
				(order) => order.status === oldStatus
			);
			const orderAtNewStatus = sortOrders.find(
				(order) => order.status === overId
			);
			if (orderAtPrevStatus && orderAtNewStatus) {
				const updatedTaskIds = orderAtPrevStatus.taskIds.filter(
					(id) => id !== activeId
				);
				orderAtPrevStatus.taskIds = updatedTaskIds;
				orderAtNewStatus.taskIds = [
					...orderAtNewStatus.taskIds,
					activeId as string,
				];
				setSortOrders([...sortOrders]);
			}
		}
	}

	const mdup = useResponsive("up", "md");

	return (
		<Stack
			width={mdup ? "80%" : "100%"}
			margin="auto"
			sx={{ p: 3 }}
			spacing={4}
		>
			<TasksSearchBar />
			<Divider sx={{ mx: -3 }} />
			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h5">Tasks</Typography>
				<Stack spacing={2}>
					<Button
						variant="contained"
						color="primary"
						size={mdup ? "large" : "small"}
						onClick={handleClickNewTask}
					>
						<Typography>New Task</Typography> <AddOutlinedIcon />
					</Button>
					{!mdup && (
						<Button
							variant="outlined"
							color="error"
							onClick={removeAllTasks}
							size="small"
						>
							Delete All Tasks
						</Button>
					)}
				</Stack>
			</Stack>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				<DraggableSection />

				<DragOverlay>
					{activeTask && <TaskCard task={activeTask} />}
				</DragOverlay>
			</DndContext>
		</Stack>
	);
}

export default Board;
