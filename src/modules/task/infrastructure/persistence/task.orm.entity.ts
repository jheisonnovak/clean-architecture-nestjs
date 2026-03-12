import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	constructor(task?: Partial<TaskTypeOrmEntity>) {
		Object.assign(this, task);
	}
}
