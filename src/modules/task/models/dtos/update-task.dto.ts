import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

import { TaskStatus } from "../enums/task-status.enum";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	@ApiPropertyOptional({ enum: TaskStatus })
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;
}
