import { BadRequestException } from "@nestjs/common";

import { TaskStatus } from "../enums/task-status.enum";

export class Task {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public status: TaskStatus,
		public createdAt: Date
	) {}

	ensureUpdatable(): void {
		if (this.status === TaskStatus.DONE) {
			throw new BadRequestException("Task already done");
		}
	}
}
