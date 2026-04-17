import { Inject, Injectable } from "@nestjs/common";

import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskOutputDto } from "../../dtos/task-output.dto";

@Injectable()
export class FindAllTaskUseCase {
	constructor(
		@Inject(TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository
	) {}

	async execute(): Promise<TaskOutputDto[]> {
		const tasks = await this.taskRepository.findAll();
		return tasks.map(task => TaskOutputDto.fromDomain(task));
	}
}
