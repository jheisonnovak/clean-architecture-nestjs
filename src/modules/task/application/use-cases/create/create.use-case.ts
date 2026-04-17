import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

import { Task } from "../../../domain/entities/task.entity";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { CreateTaskDto } from "../../dtos/create-task.dto";
import { TaskOutputDto } from "../../dtos/task-output.dto";

@Injectable()
export class CreateTaskUseCase {
	constructor(
		@Inject(TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository
	) {}

	async execute(dto: CreateTaskDto): Promise<TaskOutputDto> {
		const task = new Task(randomUUID(), dto.title, dto.description, TaskStatus.PENDING, new Date());
		const createdTask = await this.taskRepository.create(task);
		return TaskOutputDto.fromDomain(createdTask);
	}
}
