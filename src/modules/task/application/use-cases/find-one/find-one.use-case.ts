import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { TaskRepository } from "../../../domain/repositories/task.repository";
import { ListTaskDto } from "../../dtos/list-task.dto";

@Injectable()
export class FindByIdTaskUseCase {
	constructor(
		@Inject("ITaskRepository")
		private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string): Promise<ListTaskDto> {
		const task = await this.taskRepository.findById(id);
		if (!task) throw new NotFoundException("Task not found");
		return new ListTaskDto(task.id, task.title, task.description, task.status);
	}
}
