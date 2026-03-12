import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { DeleteTaskUseCase } from "./delete.use-case";

@Controller("task")
export class DeleteTaskController {
	constructor(private readonly deleteUseCase: DeleteTaskUseCase) {}

	@Delete("delete/:id")
	@ApiResponse({ type: ResponseDto, description: "delete a task" })
	@ApiTags("Task")
	async execute(@Param("id", ParseIntPipe) id: number): Promise<ResponseDto<undefined>> {
		return await this.deleteUseCase.execute(id);
	}
}
