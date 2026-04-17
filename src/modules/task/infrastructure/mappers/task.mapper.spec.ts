import { randomUUID } from "crypto";

import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/task-status.enum";
import { TaskTypeOrmEntity } from "../persistence/task.orm.entity";
import { TaskMapper } from "./task.mapper";

describe("TaskMapper", () => {
	let id: string;
	let createdAt: Date;

	beforeEach(() => {
		id = randomUUID();
		createdAt = new Date();
	});

	it("should be defined", () => {
		expect(TaskMapper).toBeDefined();
	});

	describe("TaskMapper methods", () => {
		it("should map orm entity to domain", () => {
			const entity = new TaskTypeOrmEntity({
				id,
				title: "title",
				description: "description",
				status: TaskStatus.PENDING,
				createdAt,
			});

			const result = TaskMapper.toDomain(entity);

			expect(result).toBeInstanceOf(Task);
			expect(result).toMatchObject({
				id,
				title: "title",
				description: "description",
				status: TaskStatus.PENDING,
				createdAt,
			});
		});

		it("should map domain to orm entity", () => {
			const task = new Task(id, "title", "description", TaskStatus.DONE, createdAt);

			const result = TaskMapper.toOrm(task);

			expect(result).toBeInstanceOf(TaskTypeOrmEntity);
			expect(result).toMatchObject({
				id,
				title: "title",
				description: "description",
				status: TaskStatus.DONE,
				createdAt,
			});
		});
	});
});
