import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { CreateTaskDto } from "../../application/dtos/create-task.dto";
import { TaskOutputDto } from "../../application/dtos/task-output.dto";
import { UpdateTaskDto } from "../../application/dtos/update-task.dto";
import { TaskNotFoundError } from "../../application/errors/task-not-found.error";
import { CreateTaskUseCase } from "../../application/use-cases/create/create.use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete/delete.use-case";
import { FindAllTaskUseCase } from "../../application/use-cases/find-all/find-all.use-case";
import { FindByIdTaskUseCase } from "../../application/use-cases/find-one/find-one.use-case";
import { UpdateTaskUseCase } from "../../application/use-cases/update/update.use-case";
import { TaskAlreadyDoneError } from "../../domain/errors/task-already-done.error";
import { TaskResponseMapper } from "../mappers/task-response.mapper";

@Controller("task")
export class TaskController {
	constructor(
		private readonly createUseCase: CreateTaskUseCase,
		private readonly findAllUseCase: FindAllTaskUseCase,
		private readonly deleteUseCase: DeleteTaskUseCase,
		private readonly findByIdUseCase: FindByIdTaskUseCase,
		private readonly updateUseCase: UpdateTaskUseCase
	) {}

	@Post()
	@ApiResponse({ status: 201, type: ResponseDto, description: "The record has been successfully created." })
	@ApiTags("Task")
	async create(@Body() dto: CreateTaskDto): Promise<ResponseDto<TaskOutputDto>> {
		return this.executeSafely(async () => {
			const task = await this.createUseCase.execute(dto);
			return TaskResponseMapper.created(task);
		});
	}

	@Get()
	@ApiResponse({ status: 200, type: [TaskOutputDto], description: "List of all tasks" })
	@ApiTags("Task")
	async find(): Promise<TaskOutputDto[]> {
		return this.executeSafely(() => this.findAllUseCase.execute());
	}

	@Get(":id")
	@ApiResponse({ status: 200, type: TaskOutputDto, description: "List a task" })
	@ApiTags("Task")
	async findById(@Param("id", ParseUUIDPipe) id: string): Promise<TaskOutputDto> {
		return this.executeSafely(() => this.findByIdUseCase.execute(id));
	}

	@Patch(":id")
	@ApiResponse({ type: ResponseDto, description: "Update a task" })
	@ApiTags("Task")
	async execute(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateTaskDto): Promise<ResponseDto<TaskOutputDto>> {
		return this.executeSafely(async () => {
			const task = await this.updateUseCase.execute(id, dto);
			return TaskResponseMapper.updated(task);
		});
	}

	@Delete(":id")
	@ApiResponse({ type: ResponseDto, description: "Delete a task" })
	@ApiTags("Task")
	async delete(@Param("id", ParseUUIDPipe) id: string): Promise<ResponseDto<undefined>> {
		return this.executeSafely(async () => {
			await this.deleteUseCase.execute(id);
			return TaskResponseMapper.deleted();
		});
	}

	private async executeSafely<T>(action: () => Promise<T>): Promise<T> {
		try {
			return await action();
		} catch (error) {
			this.mapError(error);
		}
	}

	private mapError(error: unknown): never {
		if (error instanceof TaskNotFoundError) {
			throw new NotFoundException(error.message);
		}

		if (error instanceof TaskAlreadyDoneError) {
			throw new BadRequestException(error.message);
		}

		if (error instanceof Error) {
			throw new InternalServerErrorException(error.message);
		}

		throw new InternalServerErrorException("Unexpected error");
	}
}
