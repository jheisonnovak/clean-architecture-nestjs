import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { Task } from "../../../domain/entities/task.entity";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskOutputDto } from "../../dtos/task-output.dto";
import { TaskNotFoundError } from "../../errors/task-not-found.error";
import { FindByIdTaskUseCase } from "./find-one.use-case";

describe("FindOneTask", () => {
	let findOneByIdUseCase: FindByIdTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		findById: jest.fn().mockResolvedValue(new Task(randomUUID(), "test", "test", TaskStatus.PENDING, new Date())),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FindByIdTaskUseCase, { provide: TASK_REPOSITORY, useValue: mockRepository }],
		}).compile();

		findOneByIdUseCase = module.get<FindByIdTaskUseCase>(FindByIdTaskUseCase);
		taskRepository = module.get<TaskRepository>(TASK_REPOSITORY);
	});

	it("should be defined", () => {
		expect(findOneByIdUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("FindOneByIdTaskUseCase", () => {
		it("should be return a task", async () => {
			const task = await findOneByIdUseCase.execute(randomUUID());

			expect(task).toBeInstanceOf(TaskOutputDto);
			expect(taskRepository.findById).toHaveBeenCalledTimes(1);
		});

		it("should throw not found error", () => {
			jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);

			expect(findOneByIdUseCase.execute(randomUUID())).rejects.toThrow(TaskNotFoundError);
		});
	});
});
