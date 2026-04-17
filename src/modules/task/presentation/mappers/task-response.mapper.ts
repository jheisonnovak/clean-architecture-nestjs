import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { TaskOutputDto } from "../../application/dtos/task-output.dto";

export class TaskResponseMapper {
	static created(task: TaskOutputDto): ResponseDto<TaskOutputDto> {
		return new ResponseDto<TaskOutputDto>("Task created successfully", task);
	}

	static updated(task: TaskOutputDto): ResponseDto<TaskOutputDto> {
		return new ResponseDto<TaskOutputDto>("Task updated successfully", task);
	}

	static deleted(): ResponseDto<undefined> {
		return new ResponseDto<undefined>("Task deleted successfully");
	}
}
