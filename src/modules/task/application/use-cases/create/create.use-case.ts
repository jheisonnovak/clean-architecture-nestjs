import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

import { ResponseDto } from "../../../../../shared/dtos/response.dto";
import { Task } from "../../../domain/entities/task.entity";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskTypeOrmEntity } from "../../../infrastructure/persistence/task.orm.entity";
import { CreateTaskDto } from "../../dtos/create-task.dto";

@Injectable()
export class CreateTaskUseCase {
	constructor(
		@Inject("ITaskRepository")
		private readonly taskRepository: TaskRepository
	) {}

	async execute(dto: CreateTaskDto): Promise<ResponseDto<TaskTypeOrmEntity>> {
		const task = new Task(randomUUID(), dto.title, dto.description, TaskStatus.DOING, new Date());
		try {
			const createdTask = await this.taskRepository.create(task);
			return new ResponseDto<TaskTypeOrmEntity>("Task created successfully", createdTask);
		} catch {
			throw new BadRequestException("Failed to create task");
		}
	}
}
