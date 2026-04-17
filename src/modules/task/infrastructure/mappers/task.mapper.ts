import { Task } from "../../domain/entities/task.entity";
import { TaskTypeOrmEntity } from "../persistence/task.orm.entity";

export class TaskMapper {
	static toDomain(entity: TaskTypeOrmEntity): Task {
		return new Task(entity.id, entity.title, entity.description, entity.status, entity.createdAt);
	}

	static toOrm(task: Task): TaskTypeOrmEntity {
		const entity = new TaskTypeOrmEntity();
		entity.id = task.id;
		entity.title = task.title;
		entity.description = task.description;
		entity.status = task.status;
		entity.createdAt = task.createdAt;
		return entity;
	}
}
