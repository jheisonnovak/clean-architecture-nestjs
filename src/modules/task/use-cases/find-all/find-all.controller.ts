import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ListTaskDto } from "../../models/dtos/list-task.dto";
import { FindAllTaskUseCase } from "./find-all.use-case";

@Controller("task")
export class FindAllTaskController {
	constructor(private readonly findAllUseCase: FindAllTaskUseCase) {}

	@Get("find-all")
	@ApiResponse({ status: 200, type: [ListTaskDto], description: "List of all tasks" })
	@ApiTags("Task")
	async execute(): Promise<ListTaskDto[]> {
		return await this.findAllUseCase.execute();
	}
}
