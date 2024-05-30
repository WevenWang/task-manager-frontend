import {
	Chip,
	Menu,
	MenuItem,
	Stack,
	styled,
	useTheme,
	withStyles,
} from "@mui/material";
import React from "react";
import { TaskCategoryEnum } from "../types/task";
import { blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyleChip = styled(Chip)(({ theme }) => ({
	backgroundColor: blue[100],
	color: theme.palette.primary.main,
	height: "25px",
	":hover": {
		backgroundColor: blue[200],
	},
}));
function CategoryChip({
	category,
	onSelect,
	clickable,
}: {
	category: TaskCategoryEnum;
	clickable?: boolean;
	onSelect?: (category: TaskCategoryEnum) => void;
}) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedCategory, setSelectedCategory] =
		React.useState<TaskCategoryEnum>(category);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelect = (event: React.MouseEvent<HTMLLIElement>) => {
		setSelectedCategory(
			event.currentTarget.textContent as TaskCategoryEnum
		);
		onSelect?.(event.currentTarget.textContent as TaskCategoryEnum);
		setAnchorEl(null);
	};
	return (
		<>
			<StyleChip
				label={
					<Stack direction="row" alignItems="center">
						{clickable ? selectedCategory : category}
						{clickable && <ExpandMoreIcon />}
					</Stack>
				}
				onClick={clickable ? (e) => handleClick(e) : undefined}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{(
					Object.values(TaskCategoryEnum) as Array<
						keyof typeof TaskCategoryEnum
					>
				).map((category) => (
					<MenuItem onClick={handleSelect} key={category}>
						<StyleChip label={category} />
					</MenuItem>
				))}
			</Menu>
		</>
	);
}

export default CategoryChip;
