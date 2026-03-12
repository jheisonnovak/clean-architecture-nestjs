import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { CreateTaskDto } from "../../application/dtos/create-task.dto";
import { ListTaskDto } from "../../application/dtos/list-task.dto";
import { UpdateTaskDto } from "../../application/dtos/update-task.dto";
import { CreateTaskUseCase } from "../../application/use-cases/create/create.use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete/delete.use-case";
import { FindAllTaskUseCase } from "../../application/use-cases/find-all/find-all.use-case";
import { FindByIdTaskUseCase } from "../../application/use-cases/find-one/find-one.use-case";
import { UpdateTaskUseCase } from "../../application/use-cases/update/update.use-case";
import { TaskTypeOrmEntity } from "../../infrastructure/persistence/task.orm.entity";

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
	async create(@Body() dto: CreateTaskDto): Promise<ResponseDto<TaskTypeOrmEntity>> {
		return await this.createUseCase.execute(dto);
	}

	@Get()
	@ApiResponse({ status: 200, type: [ListTaskDto], description: "List of all tasks" })
	@ApiTags("Task")
	async find(): Promise<ListTaskDto[]> {
		return await this.findAllUseCase.execute();
	}

	@Get(":id")
	@ApiResponse({ status: 200, type: ListTaskDto, description: "List a task" })
	@ApiTags("Task")
	async findById(@Param("id", ParseUUIDPipe) id: string): Promise<ListTaskDto> {
		return await this.findByIdUseCase.execute(id);
	}

	@Patch(":id")
	@ApiResponse({ type: ResponseDto, description: "Update a task" })
	@ApiTags("Task")
	async execute(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateTaskDto): Promise<ResponseDto<TaskTypeOrmEntity>> {
		return await this.updateUseCase.execute(id, dto);
	}

	@Delete(":id")
	@ApiResponse({ type: ResponseDto, description: "Delete a task" })
	@ApiTags("Task")
	async delete(@Param("id", ParseUUIDPipe) id: string): Promise<ResponseDto<undefined>> {
		return await this.deleteUseCase.execute(id);
	}
}
