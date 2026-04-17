export class TaskAlreadyDoneError extends Error {
	constructor() {
		super("Task already done");
		this.name = "TaskAlreadyDoneError";
	}
}
