import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enums/task-status.enum";
import { BadRequestException } from "@nestjs/common";

@Entity({ name: "task" })
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ default: TaskStatus.PENDING })
	status: TaskStatus;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	constructor(task?: Partial<TaskEntity>) {
		Object.assign(this, task);
	}

	isUpdatable() {
		if (this.status === TaskStatus.DONE) {
			throw new BadRequestException("Task already done");
		}
	}
}
