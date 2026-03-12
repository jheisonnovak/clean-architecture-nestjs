import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskTypeOrmEntity } from "../../../infrastructure/persistence/task.orm.entity";
import { ListTaskDto } from "../../dtos/list-task.dto";
import { FindByIdTaskUseCase } from "./find-one.use-case";

describe("FindOneTask", () => {
	let findOneByIdUseCase: FindByIdTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		findById: jest
			.fn()
			.mockResolvedValue(new TaskTypeOrmEntity({ id: randomUUID(), title: "test", description: "test", status: TaskStatus.PENDING })),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FindByIdTaskUseCase, { provide: "ITaskRepository", useValue: mockRepository }],
		}).compile();

		findOneByIdUseCase = module.get<FindByIdTaskUseCase>(FindByIdTaskUseCase);
		taskRepository = module.get<TaskRepository>("ITaskRepository");
	});

	it("should be defined", () => {
		expect(findOneByIdUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("FindOneByIdTaskUseCase", () => {
		it("should be return a task", async () => {
			const task = await findOneByIdUseCase.execute(randomUUID());

			expect(task).toBeInstanceOf(ListTaskDto);
			expect(taskRepository.findById).toHaveBeenCalledTimes(1);
		});

		it("should be throw not found exception", () => {
			jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);

			expect(findOneByIdUseCase.execute(randomUUID())).rejects.toThrow(NotFoundException);
		});
	});
});
