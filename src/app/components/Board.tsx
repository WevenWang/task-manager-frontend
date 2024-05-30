import { Stack, TextField, Typography, Button, Card } from "@mui/material";
import React, { useContext, useState } from "react";
import TaskContainer from "./TaskContainer";
import { Task, TaskStatusEnum } from "../types/task";
import TaskDetailModal from "./TaskDetailModal";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { TaskListContext } from "../context/TaskListContext";

function Board() {
	const [openTaskDetailModal, setOpenTaskDetailModal] = useState(false);
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const columns = [
		TaskStatusEnum.Todo,
		TaskStatusEnum.InProgress,
		TaskStatusEnum.ReadyForReview,
	];

	const { tasks, setTasks, sortOrders, setSortOrders } =
		useContext(TaskListContext);
	const handleClickNewTask = () => {
		setOpenTaskDetailModal(true);
	};

	const handleClose = () => {
		setOpenTaskDetailModal(false);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	function onDragStart(event: DragStartEvent) {
		// if (event.active.data.current?.type === "Column") {
		//   setActiveColumn(event.active.data.current.column);
		//   return;
		// }

		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		setActiveTask(null);

		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveAColumn = active.data.current?.type === "Column";
		if (!isActiveAColumn) return;

		console.log("DRAG END");

		// setColumns((columns) => {
		//   const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

		//   const overColumnIndex = columns.findIndex((col) => col.id === overId);

		//   return arrayMove(columns, activeColumnIndex, overColumnIndex);
		// });
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
		}

		const isOverAColumn = over.data.current?.type === "TaskContainer";

		// Im dropping a Task over a column
		if (isActiveATask && isOverAColumn) {
			const activeIndex = tasks.findIndex((t) => t._id === activeId);
			const oldStatus = tasks[activeIndex].status;
			tasks[activeIndex].status = overId as TaskStatusEnum;
			console.log("DROPPING TASK OVER COLUMN", { activeIndex });
			console.log("tasks", tasks);
			const newTasks = arrayMove(
				tasks,
				activeIndex,
				activeIndex
			) as Task[];
			setTasks(newTasks);
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

	return (
		<Stack width="80%" margin="auto" sx={{ p: 3 }} spacing={2}>
			<Stack direction="row" justifyContent="space-between">
				<TextField label="Filter Task" variant="outlined" />
			</Stack>

			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h6">Tasks</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					onClick={handleClickNewTask}
				>
					+ New Task
				</Button>
				<TaskDetailModal
					open={openTaskDetailModal}
					onClose={handleClose}
				/>
			</Stack>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				{/* <SortableContext items={columns}> */}
				<Stack
					direction="row"
					width={"100%"}
					height={"80%"}
					justifyContent={"space-around"}
				>
					<TaskContainer
						status={TaskStatusEnum.Todo}
						sx={{ backgroundColor: "#EAEAEA" }}
					/>
					<TaskContainer
						status={TaskStatusEnum.InProgress}
						sx={{ backgroundColor: "#FFF6EB" }}
					/>
					<TaskContainer
						status={TaskStatusEnum.ReadyForReview}
						sx={{ backgroundColor: "#EAF6FF" }}
					/>
				</Stack>
				{/* </SortableContext> */}
				<DragOverlay>
					{activeTask && <TaskCard task={activeTask} />}
				</DragOverlay>
			</DndContext>
		</Stack>
	);
}

export default Board;
