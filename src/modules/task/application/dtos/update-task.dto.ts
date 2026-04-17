import { TaskStatus } from "../../domain/enums/task-status.enum";

export class UpdateTaskDto {
	title?: string;
	description?: string;
	status?: TaskStatus;
}
