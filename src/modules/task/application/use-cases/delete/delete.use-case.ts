import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { ResponseDto } from "../../../../../shared/dtos/response.dto";
import { TaskRepository } from "../../../domain/repositories/task.repository";

@Injectable()
export class DeleteTaskUseCase {
	@Inject("ITaskRepository")
	private readonly taskRepository: TaskRepository;

	async execute(id: string): Promise<ResponseDto<undefined>> {
		try {
			await this.taskRepository.delete(id);
			return new ResponseDto("Task deleted successfully");
		} catch {
			throw new BadRequestException("Failed to delete task");
		}
	}
}
