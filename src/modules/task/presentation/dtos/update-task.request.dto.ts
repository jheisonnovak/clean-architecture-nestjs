import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

import { TaskStatus } from "../../domain/enums/task-status.enum";
import { CreateTaskRequestDto } from "./create-task.request.dto";

export class UpdateTaskRequestDto extends PartialType(CreateTaskRequestDto) {
	@ApiPropertyOptional({ enum: TaskStatus })
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;
}
