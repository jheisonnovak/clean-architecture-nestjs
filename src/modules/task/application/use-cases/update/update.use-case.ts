import { Inject, Injectable } from "@nestjs/common";

import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskOutputDto } from "../../dtos/task-output.dto";
import { UpdateTaskDto } from "../../dtos/update-task.dto";
import { TaskNotFoundError } from "../../errors/task-not-found.error";

@Injectable()
export class UpdateTaskUseCase {
	constructor(
		@Inject(TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string, dto: UpdateTaskDto): Promise<TaskOutputDto> {
		const task = await this.taskRepository.findById(id);
		if (!task) throw new TaskNotFoundError();
		task.ensureUpdatable();
		Object.assign(task, dto);
		await this.taskRepository.update(task);
		return TaskOutputDto.fromDomain(task);
	}
}
