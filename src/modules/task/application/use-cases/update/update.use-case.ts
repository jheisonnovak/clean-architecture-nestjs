import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { ResponseDto } from "../../../../../shared/dtos/response.dto";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskTypeOrmEntity } from "../../../infrastructure/persistence/task.orm.entity";
import { UpdateTaskDto } from "../../dtos/update-task.dto";

@Injectable()
export class UpdateTaskUseCase {
	@Inject("ITaskRepository")
	private readonly taskRepository: TaskRepository;

	async execute(id: string, dto: UpdateTaskDto): Promise<ResponseDto<TaskTypeOrmEntity>> {
		const task = await this.taskRepository.findById(id);
		if (!task) throw new NotFoundException("Task not found");
		task.ensureUpdatable();
		Object.assign(task, dto);
		try {
			await this.taskRepository.update(task);
			return new ResponseDto<TaskTypeOrmEntity>("Task updated successfully");
		} catch {
			throw new BadRequestException("Failed to update task");
		}
	}
}
