import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ResponseDto } from "../../../../../shared/dtos/response.dto";
import { TaskStatus } from "../../../domain/enums/task-status.enum";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { TaskTypeOrmEntity } from "../../../infrastructure/persistence/task.orm.entity";
import { UpdateTaskUseCase } from "./update.use-case";

describe("UpdateTask", () => {
	let updateUseCase: UpdateTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		findById: jest.fn().mockResolvedValue(new TaskTypeOrmEntity({ id: 1, title: "test", description: "test", status: TaskStatus.PENDING })),
		update: jest.fn().mockResolvedValue({}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UpdateTaskUseCase, { provide: "ITaskRepository", useValue: mockRepository }],
		}).compile();

		updateUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
		taskRepository = module.get<TaskRepository>("ITaskRepository");
	});

	it("should be defined", () => {
		expect(updateUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("UpdateTaskUseCase", () => {
		it("should be update a task", async () => {
			const result = await updateUseCase.execute(1, { title: "test", description: "test" });

			expect(result).toBeInstanceOf(ResponseDto);
			expect(taskRepository.update).toHaveBeenCalledTimes(1);
		});

		it("should be throw not found exception", () => {
			jest.spyOn(taskRepository, "findById").mockResolvedValueOnce(null);

			expect(updateUseCase.execute(1, { title: "test", description: "test" })).rejects.toThrow(NotFoundException);
		});

		it("should be throw bad request exception", () => {
			jest.spyOn(taskRepository, "update").mockRejectedValueOnce(new Error());

			expect(updateUseCase.execute(1, { title: "test", description: "test" })).rejects.toThrow(BadRequestException);
		});
	});
});
