import { ApiProperty } from "@nestjs/swagger";

import { TaskOutputDto } from "../../application/dtos/task-output.dto";
import { TaskStatus } from "../../domain/enums/task-status.enum";

export class TaskResponseDto {
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

	static fromOutput(task: TaskOutputDto): TaskResponseDto {
		return new TaskResponseDto(task.id, task.title, task.description, task.status, task.createdAt);
	}
}
