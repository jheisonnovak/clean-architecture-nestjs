import { TaskEntity } from "../entities/task.entity";

export interface ITaskRepository {
	create(task: TaskEntity): Promise<TaskEntity>;
	findAll(): Promise<TaskEntity[]>;
	findById(id: number): Promise<TaskEntity | null>;
	update(task: TaskEntity): Promise<void>;
	delete(id: number): Promise<void>;
}
