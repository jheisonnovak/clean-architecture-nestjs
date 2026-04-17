import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { TaskStatus } from "../../domain/enums/task-status.enum";

@Entity({ name: "task" })
export class TaskTypeOrmEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ default: TaskStatus.PENDING })
	status: TaskStatus;

	@CreateDateColumn({ type: "datetime" })
	createdAt: Date;

	constructor(task?: Partial<TaskTypeOrmEntity>) {
		Object.assign(this, task);
	}
}
