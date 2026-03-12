import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ResponseDto } from "../../../../../shared/dtos/response.dto";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { DeleteTaskUseCase } from "./delete.use-case";

describe("DeleteTask", () => {
	let deleteUseCase: DeleteTaskUseCase;
	let taskRepository: TaskRepository;
	const mockRepository = {
		delete: jest.fn().mockResolvedValue({}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DeleteTaskUseCase, { provide: "ITaskRepository", useValue: mockRepository }],
		}).compile();

		deleteUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
		taskRepository = module.get<TaskRepository>("ITaskRepository");
	});

	it("should be defined", () => {
		expect(deleteUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("DeleteTaskUseCase", () => {
		it("should be delete a task", async () => {
			const result = await deleteUseCase.execute(1);

			expect(result).toBeInstanceOf(ResponseDto);
			expect(taskRepository.delete).toHaveBeenCalledTimes(1);
		});

		it("should be throw bad request exception", () => {
			jest.spyOn(taskRepository, "delete").mockRejectedValueOnce(new Error());

			expect(deleteUseCase.execute(1)).rejects.toThrow(BadRequestException);
		});
	});
});
