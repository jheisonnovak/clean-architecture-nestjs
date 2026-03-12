import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { ITaskRepository } from "../../models/interfaces/task-repository.interface";

@Injectable()
export class DeleteTaskUseCase {
	@Inject("ITaskRepository")
	private readonly taskRepository: ITaskRepository;

	async execute(id: number): Promise<ResponseDto<undefined>> {
		try {
			await this.taskRepository.delete(id);
			return new ResponseDto("Task deleted successfully");
		} catch {
			throw new BadRequestException("Failed to delete task");
		}
	}
}
