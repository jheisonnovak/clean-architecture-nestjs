import { TaskStatus } from "../../domain/enums/task-status.enum";

export class ListTaskDto {
	public readonly id: string;

	public readonly title: string;

	public readonly description: string;

	public readonly status: TaskStatus;

	constructor(id: string, title: string, description: string, status: TaskStatus) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
	}
}
