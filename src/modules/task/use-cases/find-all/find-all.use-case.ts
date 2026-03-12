import { Inject, Injectable } from "@nestjs/common";

import { ListTaskDto } from "../../models/dtos/list-task.dto";
import { ITaskRepository } from "../../models/interfaces/task-repository.interface";

@Injectable()
export class FindAllTaskUseCase {
	constructor(
		@Inject("ITaskRepository")
		private readonly taskRepository: ITaskRepository
	) {}

	async execute(): Promise<ListTaskDto[]> {
		const tasks = await this.taskRepository.findAll();
		return tasks.map(task => new ListTaskDto(task.id, task.title, task.description, task.status));
	}
}
