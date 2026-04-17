import { TaskStatus } from "../enums/task-status.enum";
import { TaskAlreadyDoneError } from "../errors/task-already-done.error";

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
			throw new TaskAlreadyDoneError();
		}
	}
}
