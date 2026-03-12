import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { ListTaskDto } from "../../models/dtos/list-task.dto";
import { ITaskRepository } from "../../models/interfaces/task-repository.interface";

@Injectable()
export class FindOneByIdTaskUseCase {
	constructor(
		@Inject("ITaskRepository")
		private readonly taskRepository: ITaskRepository
	) {}

	async execute(id: number): Promise<ListTaskDto> {
		const task = await this.taskRepository.findById(id);
		if (!task) throw new NotFoundException("Task not found");
		return new ListTaskDto(task.id, task.title, task.description, task.status);
	}
}
