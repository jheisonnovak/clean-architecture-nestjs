import { Body, Controller, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { UpdateTaskDto } from "../../models/dtos/update-task.dto";
import { TaskEntity } from "../../models/entities/task.entity";
import { UpdateTaskUseCase } from "./update.use-case";

@Controller("task")
export class UpdateTaskController {
	constructor(private readonly updateUseCase: UpdateTaskUseCase) {}

	@Patch("update/:id")
	@ApiResponse({ type: ResponseDto, description: "Update a task" })
	@ApiTags("Task")
	async execute(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateTaskDto): Promise<ResponseDto<TaskEntity>> {
		return await this.updateUseCase.execute(id, dto);
	}
}
