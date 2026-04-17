import { Test, TestingModule } from "@nestjs/testing";

import { Task } from "../../../domain/entities/task.entity";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { TASK_REPOSITORY } from "../../../domain/repositories/task.repository";
import { TaskOutputDto } from "../../dtos/task-output.dto";
import { CreateTaskUseCase } from "./create.use-case";

describe("CreateTask", () => {
	let createUseCase: CreateTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		create: jest.fn().mockResolvedValue(new Task("id", "test", "test", TaskStatus.PENDING, new Date())),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CreateTaskUseCase, { provide: TASK_REPOSITORY, useValue: mockRepository }],
		}).compile();

		createUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
		taskRepository = module.get<TaskRepository>(TASK_REPOSITORY);
	});

	it("should be defined", () => {
		expect(createUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("CreateTaskUseCase", () => {
		it("should be create a task", async () => {
			const result = await createUseCase.execute({ title: "test", description: "test" });

			expect(result).toBeInstanceOf(TaskOutputDto);
			expect(taskRepository.create).toHaveBeenCalledTimes(1);
			expect(taskRepository.create).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "test",
					description: "test",
					status: TaskStatus.PENDING,
				})
			);
		});

		it("should throw infrastructure error", () => {
			jest.spyOn(taskRepository, "create").mockRejectedValueOnce(new Error("Error"));

			expect(createUseCase.execute({ title: "test", description: "test" })).rejects.toThrow("Error");
		});
	});
});
