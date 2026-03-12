import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { CreateTaskDto } from "../../models/dtos/create-task.dto";
import { TaskEntity } from "../../models/entities/task.entity";
import { ITaskRepository } from "../../models/interfaces/task-repository.interface";

@Injectable()
export class CreateTaskUseCase {
	constructor(
		@Inject("ITaskRepository")
		private readonly taskRepository: ITaskRepository
	) {}

	async execute(dto: CreateTaskDto): Promise<ResponseDto<TaskEntity>> {
		const task = new TaskEntity();
		Object.assign(task, dto as TaskEntity);
		try {
			const createdTask = await this.taskRepository.create(task);
			return new ResponseDto<TaskEntity>("Task created successfully", createdTask);
		} catch {
			throw new BadRequestException("Failed to create task");
		}
	}
}
