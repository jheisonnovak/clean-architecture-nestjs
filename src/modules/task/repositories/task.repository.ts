import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskEntity } from "../models/entities/task.entity";
import { ITaskRepository } from "../models/interfaces/task-repository.interface";

@Injectable()
export class TaskTypeOrmRepository implements ITaskRepository {
	constructor(
		@InjectRepository(TaskEntity)
		private readonly taskRepository: Repository<TaskEntity>
	) {}

	async create(task: TaskEntity): Promise<TaskEntity> {
		return await this.taskRepository.save(task);
	}

	async findAll(): Promise<TaskEntity[]> {
		return await this.taskRepository.find();
	}

	async findById(id: number): Promise<TaskEntity | null> {
		return await this.taskRepository.findOneBy({ id });
	}

	async update(task: TaskEntity): Promise<void> {
		await this.taskRepository.update(task.id, task);
	}

	async delete(id: number): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
