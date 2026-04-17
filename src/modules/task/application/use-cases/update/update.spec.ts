import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { Task } from "../../../domain/entities/task.entity";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TaskAlreadyDoneError } from "../../../domain/errors/task-already-done.error";
import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskOutputDto } from "../../dtos/task-output.dto";
import { TaskNotFoundError } from "../../errors/task-not-found.error";
import { UpdateTaskUseCase } from "./update.use-case";

describe("UpdateTask", () => {
	let updateUseCase: UpdateTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		findById: jest.fn().mockResolvedValue(new Task(randomUUID(), "test", "test", TaskStatus.PENDING, new Date())),
		update: jest.fn().mockResolvedValue({}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UpdateTaskUseCase, { provide: TASK_REPOSITORY, useValue: mockRepository }],
		}).compile();

		updateUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
		taskRepository = module.get<TaskRepository>(TASK_REPOSITORY);
	});

	it("should be defined", () => {
		expect(updateUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("UpdateTaskUseCase", () => {
		it("should be update a task", async () => {
			const result = await updateUseCase.execute(randomUUID(), { title: "test", description: "test" });

			expect(result).toBeInstanceOf(TaskOutputDto);
			expect(taskRepository.update).toHaveBeenCalledTimes(1);
		});

		it("should throw not found error", () => {
			jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);

			expect(updateUseCase.execute(randomUUID(), { title: "test", description: "test" })).rejects.toThrow(TaskNotFoundError);
		});

		it("should throw infrastructure error", () => {
			jest.spyOn(taskRepository, "update").mockRejectedValueOnce(new Error());

			expect(updateUseCase.execute(randomUUID(), { title: "test", description: "test" })).rejects.toThrow(Error);
		});

		it("should throw when task is already done", () => {
			jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(new Task(randomUUID(), "test", "test", TaskStatus.DONE, new Date()));

			expect(updateUseCase.execute(randomUUID(), { title: "test", description: "test" })).rejects.toThrow(TaskAlreadyDoneError);
		});
	});
});
