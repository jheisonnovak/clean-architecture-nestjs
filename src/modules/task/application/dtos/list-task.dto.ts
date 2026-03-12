import { ApiProperty } from "@nestjs/swagger";

import { TaskStatus } from "../../domain/enums/task-status.enum";

export class ListTaskDto {
	@ApiProperty()
	public readonly id: string;

	@ApiProperty()
	public readonly title: string;

	@ApiProperty()
	public readonly description: string;

	@ApiProperty({ enum: TaskStatus })
	public readonly status: TaskStatus;

	constructor(id: string, title: string, description: string, status: TaskStatus) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
	}
}
