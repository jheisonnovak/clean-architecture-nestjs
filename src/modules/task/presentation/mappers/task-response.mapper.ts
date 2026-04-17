import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { TaskOutputDto } from "../../application/dtos/task-output.dto";
import { TaskResponseDto } from "../dtos/task-response.dto";

export class TaskResponseMapper {
	static created(task: TaskOutputDto): ResponseDto<TaskResponseDto> {
		return new ResponseDto<TaskResponseDto>("Task created successfully", TaskResponseDto.fromOutput(task));
	}

	static updated(task: TaskOutputDto): ResponseDto<TaskResponseDto> {
		return new ResponseDto<TaskResponseDto>("Task updated successfully", TaskResponseDto.fromOutput(task));
	}

	static list(tasks: TaskOutputDto[]): TaskResponseDto[] {
		return tasks.map(task => TaskResponseDto.fromOutput(task));
	}

	static one(task: TaskOutputDto): TaskResponseDto {
		return TaskResponseDto.fromOutput(task);
	}

	static deleted(): ResponseDto<undefined> {
		return new ResponseDto<undefined>("Task deleted successfully");
	}
}
