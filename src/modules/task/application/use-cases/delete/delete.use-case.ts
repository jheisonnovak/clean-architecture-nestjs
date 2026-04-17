import { Inject, Injectable } from "@nestjs/common";

import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";

@Injectable()
export class DeleteTaskUseCase {
	constructor(
		@Inject(TASK_REPOSITORY)
		private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
