import { Inject, Injectable } from "@nestjs/common";

import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskOutputDto } from "../../dtos/task-output.dto";
import { TaskNotFoundError } from "../../errors/task-not-found.error";

@Injectable()
export class FindByIdTaskUseCase {
	constructor(
		@Inject(TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string): Promise<TaskOutputDto> {
		const task = await this.taskRepository.findById(id);
		if (!task) throw new TaskNotFoundError();
		return TaskOutputDto.fromDomain(task);
	}
}
