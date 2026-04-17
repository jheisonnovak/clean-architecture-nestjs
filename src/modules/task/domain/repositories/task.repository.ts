import { Task } from "../entities/task.entity";

export const TASK_REPOSITORY = Symbol("TASK_REPOSITORY");

export interface TaskRepository {
	create(task: Task): Promise<Task>;
	findAll(): Promise<Task[]>;
	findById(id: string): Promise<Task | null>;
	update(task: Task): Promise<void>;
	delete(id: string): Promise<void>;
}
