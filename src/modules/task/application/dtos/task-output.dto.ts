import { ApiProperty } from "@nestjs/swagger";

import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/task-status.enum";

export class TaskOutputDto {
	@ApiProperty()
	readonly id: string;

	@ApiProperty()
	readonly title: string;

	@ApiProperty()
	readonly description: string;

	@ApiProperty({ enum: TaskStatus })
	readonly status: TaskStatus;

	@ApiProperty()
	readonly createdAt: Date;

	constructor(id: string, title: string, description: string, status: TaskStatus, createdAt: Date) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.createdAt = createdAt;
	}

	static fromDomain(task: Task): TaskOutputDto {
		return new TaskOutputDto(task.id, task.title, task.description, task.status, task.createdAt);
	}
}
