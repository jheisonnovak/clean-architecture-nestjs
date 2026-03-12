import { Inject, Injectable } from "@nestjs/common";

import { TaskRepository } from "../../../domain/repositories/task.repository";
import { ListTaskDto } from "../../dtos/list-task.dto";

@Injectable()
export class FindAllTaskUseCase {
	constructor(
		@Inject("ITaskRepository")
		private readonly taskRepository: TaskRepository
	) {}

	async execute(): Promise<ListTaskDto[]> {
		const tasks = await this.taskRepository.findAll();
		return tasks.map(task => new ListTaskDto(task.id, task.title, task.description, task.status));
	}
}
