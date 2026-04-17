import { randomUUID } from "crypto";

import { TaskStatus } from "../enums/task-status.enum";
import { TaskAlreadyDoneError } from "../errors/task-already-done.error";
import { Task } from "./task.entity";

describe("Task", () => {
	let pendingTask: Task;
	let doneTask: Task;

	beforeEach(() => {
		pendingTask = new Task(randomUUID(), "title", "description", TaskStatus.PENDING, new Date());
		doneTask = new Task(randomUUID(), "title", "description", TaskStatus.DONE, new Date());
	});

	it("should be defined", () => {
		expect(pendingTask).toBeDefined();
		expect(doneTask).toBeDefined();
	});

	describe("Task methods", () => {
		it("should allow update when status is not done", () => {
			expect(() => pendingTask.ensureUpdatable()).not.toThrow();
		});

		it("should throw when status is done", () => {
			expect(() => doneTask.ensureUpdatable()).toThrow(TaskAlreadyDoneError);
		});
	});
});
