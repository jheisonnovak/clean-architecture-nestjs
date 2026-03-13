import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { Task } from "../../../domain/entities/task.entity";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { ListTaskDto } from "../../dtos/list-task.dto";
import { FindAllTaskUseCase } from "./find-all.use-case";

describe("FindAllTask", () => {
	let findAllUseCase: FindAllTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		findAll: jest.fn().mockResolvedValue([new Task(randomUUID(), "test", "test", TaskStatus.PENDING, new Date())]),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FindAllTaskUseCase, { provide: "ITaskRepository", useValue: mockRepository }],
		}).compile();

		findAllUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
		taskRepository = module.get<TaskRepository>("ITaskRepository");
	});

	it("should be defined", () => {
		expect(findAllUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("FindAllTaskUseCase", () => {
		it("should be return a list of tasks", async () => {
			const tasks = await findAllUseCase.execute();

			expect(tasks).toBeInstanceOf(Array<ListTaskDto>);
			expect(taskRepository.findAll).toHaveBeenCalledTimes(1);
		});

		it("should be return an empty array", () => {
			jest.spyOn(taskRepository, "findAll").mockResolvedValueOnce([]);

			expect(findAllUseCase.execute()).resolves.toEqual([]);
		});
	});
});
