import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ListTaskDto } from "../../models/dtos/list-task.dto";
import { TaskEntity } from "../../models/entities/task.entity";
import { TaskStatus } from "../../models/enums/task-status.enum";
import { ITaskRepository } from "../../models/interfaces/task-repository.interface";
import { FindOneByIdTaskUseCase } from "./find-one-by-id.use-case";

describe("FindOneByIdTask", () => {
	let findOneByIdUseCase: FindOneByIdTaskUseCase;
	let taskRepository: ITaskRepository;
	const mockRepository = {
		findById: jest.fn().mockResolvedValue(new TaskEntity({ id: 1, title: "test", description: "test", status: TaskStatus.PENDING })),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FindOneByIdTaskUseCase, { provide: "ITaskRepository", useValue: mockRepository }],
		}).compile();

		findOneByIdUseCase = module.get<FindOneByIdTaskUseCase>(FindOneByIdTaskUseCase);
		taskRepository = module.get<ITaskRepository>("ITaskRepository");
	});

	it("should be defined", () => {
		expect(findOneByIdUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("FindOneByIdTaskUseCase", () => {
		it("should be return a task", async () => {
			const task = await findOneByIdUseCase.execute(1);

			expect(task).toBeInstanceOf(ListTaskDto);
			expect(taskRepository.findById).toHaveBeenCalledTimes(1);
		});

		it("should be throw not found exception", () => {
			jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);

			expect(findOneByIdUseCase.execute(1)).rejects.toThrow(NotFoundException);
		});
	});
});
