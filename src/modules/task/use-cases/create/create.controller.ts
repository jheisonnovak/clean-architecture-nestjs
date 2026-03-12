import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { CreateTaskDto } from "../../models/dtos/create-task.dto";
import { TaskEntity } from "../../models/entities/task.entity";
import { CreateTaskUseCase } from "./create.use-case";

@Controller("task")
export class CreateTaskController {
	constructor(private readonly createUseCase: CreateTaskUseCase) {}

	@Post("create")
	@ApiResponse({ status: 201, type: ResponseDto, description: "The record has been successfully created." })
	@ApiTags("Task")
	async execute(@Body() dto: CreateTaskDto): Promise<ResponseDto<TaskEntity>> {
		return await this.createUseCase.execute(dto);
	}
}
