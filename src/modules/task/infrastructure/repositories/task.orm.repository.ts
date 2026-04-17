import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "../../domain/entities/task.entity";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { TaskMapper } from "../mappers/task.mapper";
import { TaskTypeOrmEntity } from "../persistence/task.orm.entity";

@Injectable()
export class TaskTypeOrmRepository implements TaskRepository {
	constructor(
		@InjectRepository(TaskTypeOrmEntity)
		private readonly taskRepository: Repository<TaskTypeOrmEntity>
	) {}

	async create(task: Task): Promise<Task> {
		const entity = TaskMapper.toOrm(task);
		return TaskMapper.toDomain(await this.taskRepository.save(entity));
	}

	async findAll(): Promise<Task[]> {
		const entities = await this.taskRepository.find();
		return entities.map(entity => TaskMapper.toDomain(entity));
	}

	async findById(id: string): Promise<Task | null> {
		const entity = await this.taskRepository.findOneBy({ id });
		return entity ? TaskMapper.toDomain(entity) : null;
	}

	async update(task: Task): Promise<void> {
		const entity = TaskMapper.toOrm(task);
		await this.taskRepository.update(task.id, entity);
	}

	async delete(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
