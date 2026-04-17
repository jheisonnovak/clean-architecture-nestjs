import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { TASK_REPOSITORY, TaskRepository } from "../../../domain/repositories/task.repository";
import { DeleteTaskUseCase } from "./delete.use-case";

describe("DeleteTask", () => {
	let deleteUseCase: DeleteTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		delete: jest.fn().mockResolvedValue({}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DeleteTaskUseCase, { provide: TASK_REPOSITORY, useValue: mockRepository }],
		}).compile();

		deleteUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
		taskRepository = module.get<TaskRepository>(TASK_REPOSITORY);
	});

	it("should be defined", () => {
		expect(deleteUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("execute", () => {
		it("should be delete a task", async () => {
			const result = await deleteUseCase.execute(randomUUID());

			expect(result).toBeUndefined();
			expect(taskRepository.delete).toHaveBeenCalledTimes(1);
		});

		it("should throw infrastructure error", () => {
			jest.spyOn(taskRepository, "delete").mockRejectedValueOnce(new Error());

			expect(deleteUseCase.execute(randomUUID())).rejects.toThrow(Error);
		});
	});
});
